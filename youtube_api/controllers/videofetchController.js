// youtube_api\controllers\videofetchController.js
const axios = require("axios");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 });
// const { S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3");
// const { S3 } = require("../config/S3");
const { pool } = require("../config/db");


//const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_KEY = "eaf54a6583msh168339a792b7460p16e58fjsn309b077e0b30"; // Replace with your actual API key
const RAPID_API_HOST = "youtube-v31.p.rapidapi.com";

const options = {
  headers: {
    "X-RapidAPI-Key": RAPID_API_KEY,
    "X-RapidAPI-Host": RAPID_API_HOST,
  },
};

const videoController = {


  getAllVideos: async (req, res) => {
    try {
      const { category = "programming", pageToken = "" } = req.query;

      // Fetch from YouTube API
      const youtubePromise = (async () => {
        const url = `https://${RAPID_API_HOST}/search`;
        const params = {
          q: category,
          part: "snippet",
          maxResults: 50,
          type: "video",
          pageToken,
        };

        const response = await axios.get(url, { ...options, params });
        if (!response.data.items) throw new Error("No videos found in YouTube API");

        const transformedData = response.data.items.map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          channelId: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
          publishedAt: item.snippet.publishedAt,
          thumbnail: item.snippet.thumbnails.medium.url,
        }));

        return {
          videos: transformedData,
          nextPageToken: response.data.nextPageToken || null,
        };
      })();

      // Fetch from MySQL database
      const s3Promise = (async () => {
        const query = `SELECT * FROM media_files WHERE category = ?`;
        const [rows] = await pool.query(query, [category]);

        const s3Videos = rows.map((row) => ({
          id: row.id,
          title: row.title,
          description: row.description,
          fileUrl: row.file_url,
          thumbnail: row.thumbnail_url || "default-thumbnail.jpg",
          uploadedAt: row.uploaded_at,
        }));

        return s3Videos;
      })();

      // Wait for both promises to resolve
      const [youtubeData, s3Videos] = await Promise.all([youtubePromise, s3Promise]);

      res.json({
        youtubeVideos: youtubeData.videos,
        s3Videos,
        nextPageToken: youtubeData.nextPageToken,
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ error: "Failed to fetch videos", message: error.message });
    }
  },

  searchVideos: async (req, res) => {
    try {
      const { q = "programming", maxResults = 12 } = req.query;

      // Fetch from YouTube API
      const youtubePromise = (async () => {
        const cacheKey = `youtube-${q}-${maxResults}`;
        const cachedData = cache.get(cacheKey);
        if (cachedData) return cachedData;

        const url = `https://${RAPID_API_HOST}/search`;
        const params = {
          q,
          part: "snippet",
          maxResults: parseInt(maxResults),
          type: "video",
        };

        const response = await axios.get(url, { ...options, params });
        if (!response.data.items) throw new Error("No videos found in YouTube API");

        const transformedData = response.data.items.map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          channelId: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
          publishedAt: item.snippet.publishedAt,
          thumbnail: item.snippet.thumbnails.medium.url,
        }));

        cache.set(cacheKey, transformedData);
        return transformedData;
      })();

      // Fetch from AWS S3 and MySQL
      const s3Promise = (async () => {
        const params = {
          Bucket: process.env.MEDIA_S3_BUCKET_NAME,
          Prefix: `uploads/${q}`,
        };

        const s3Data = await S3.send(new ListObjectsCommand(params));
        if (!s3Data.Contents) return [];

        const fetchMetadataFromDB = async (fileName) => {
          const query = `SELECT * FROM media_files WHERE file_name = ?`;
          const [rows] = await pool.query(query, [fileName]);
          return rows[0];
        };

        const s3Videos = await Promise.all(
          s3Data.Contents.map(async (file) => {
            const metadata = await fetchMetadataFromDB(file.Key);
            return {
              id: file.Key,
              title: metadata?.title || "Untitled",
              description: metadata?.description || "No description available",
              uploadedAt: metadata?.uploaded_at || file.LastModified,
              thumbnail: metadata?.thumbnail_url || "default-thumbnail.jpg",
            };
          })
        );

        return s3Videos;
      })();

      // Wait for both promises to resolve
      const [youtubeVideos, s3Videos] = await Promise.all([youtubePromise, s3Promise]);

      res.json({ youtubeVideos, s3Videos });
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ error: "Failed to fetch videos", message: error.message });
    }
  },




  // Get detailed information about a specific video
  getVideoDetails: async (req, res) => {
    try {
      const { videoId } = req.params;
      console.log("video id", videoId);
      const url = `https://${RAPID_API_HOST}/videos`;
      const params = {
        part: "snippet,contentDetails,statistics",
        id: videoId,
      };
  
      const response = await axios.get(url, { ...options, params });
      console.log("response from getVideoDetails", response.data);
      if (!response.data.items || response.data.items.length === 0) {
        console.error("Video not found");
        return res.status(304).json({ error: "Video not found" });
      }
  
      const video = response.data.items[0];
  
      // Transform the data
      const transformedData = {
        id: video.id || item.id || videoId,
        title: video.snippet.title || item.title,
        description: video.snippet.description || item.description,
        channelId: video.snippet.channelId || item.channelId,
        channelTitle: video.snippet.channelTitle || item.channelTitle,
        publishedAt: video.snippet.publishedAt || item.publishedAt,
        thumbnail:
          video.snippet.thumbnails.standard?.url ||
          video.snippet.thumbnails.high.url || item.thumbnails,
        duration: video.contentDetails.duration,
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount,
      };
  
      res.json(transformedData);
    } catch (error) {
      console.error("Error getting video details:", error);
      res.status(500).json({
        error: "Failed to get video details",
        message: error.message,
      });
    }
  },

  getS3VideoDetails: async (req, res) => {
    try {
// Fetching metadata from MySQL database
const { id } = req.params;

      const query = `SELECT * FROM media_files WHERE id = ?`;
      const [rows] = await pool.query(query, [id]);

      if (rows.length === 0) {
        return res.status(404).json({ error: "Video not found" });
      }

      const video = rows[0];
      const transformedData = {
        id: video.id,
        title: video.title,
        description: video.description,
        fileUrl: video.file_url,
        thumbnail: video.thumbnail_url || "default-thumbnail.jpg",
        uploadedAt: video.uploaded_at,
      };

      res.json(transformedData);
    } catch (error) {
      console.error("Error fetching S3 video details:", error);
      res.status(500).json({ error: "Failed to fetch video details", message: error.message });
    }
  },
};


module.exports = videoController;
