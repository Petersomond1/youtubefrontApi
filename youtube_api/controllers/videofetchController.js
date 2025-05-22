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
  }
  }


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
          maxResults: 5,
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
      const dbPromise = (async () => {
        console.log("Fetching videos from MySQL database");
        // Check if the category is valid
        const validCategories = [ "training", "New", "Home", "programming", "music", "sports", "news"];
        if (!validCategories.includes(category)) {
          return res.status(400).json({ error: "Invalid category" });
        }
        // Fetch videos from the database
        const query = `SELECT * FROM media_files WHERE category = ?`;
        const [rows] = await pool.query(query, [category]);

        const dbVideos = rows.map((row) => ({
          id: row.id,
          title: row.title,
          description: row.description,
          fileUrl: row.file_url,
          thumbnail: row.thumbnail_url || "default-thumbnail.jpg",
          uploadedAt: row.uploaded_at,
        }));

        return dbVideos;
      })();

      // Wait for both promises to resolve
      const [youtubeData, dbVideos] = await Promise.all([youtubePromise, dbPromise]);

      res.json({
        youtubeVideos: youtubeData.videos,
        dbVideos,
        nextPageToken: youtubeData.nextPageToken,
      });
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ error: "Failed to fetch videos", message: error.message });
    }
  },

  searchVideos: async (req, res) => {
    try {
      const { searchTerm = "", maxResults = 5 } = req.query;

      if (!searchTerm) {
        return res.status(400).json({ error: "Search term is required" });
      }

      // Search YouTube API
      const youtubePromise = (async () => {
        const cacheKey = `youtube-${searchTerm}-${maxResults}`;
        const cachedData = cache.get(cacheKey);
        if (cachedData) return cachedData;

        const url = `https://${RAPID_API_HOST}/search`;
        const params = {
          q: searchTerm,
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

      // Search MySQL database
      const dbPromise = (async () => {
        const query = `
          SELECT * FROM media_files
          WHERE 
            LOWER(file_name) LIKE ? OR
            LOWER(description) LIKE ? OR
            LOWER(title) LIKE ? OR
            LOWER(category) LIKE ? OR
            LOWER(comments) LIKE ?
          ORDER BY updated_at DESC, created_at DESC
        `;

        const searchPattern = `%${searchTerm.toLowerCase()}%`;
        const [rows] = await pool.query(query, [
          searchPattern,
          searchPattern,
          searchPattern,
          searchPattern,
          searchPattern,
        ]);

        if (rows.length === 0) {
          return [];
        }

        return rows.map((row) => ({
          id: row.id,
          title: row.title,
          description: row.description,
          fileName: row.file_name,
          category: row.category,
          fileUrl: row.file_url,
          thumbnail: row.thumbnail_url || "default-thumbnail.jpg",
          uploadedAt: row.uploaded_at,
        }));
      })();

      // Wait for both promises to resolve
      const [youtubeVideos, dbVideos] = await Promise.all([youtubePromise, dbPromise]);

      res.json({ youtubeVideos, dbVideos });
    } catch (error) {
      console.error("Error searching videos:", error);
      res.status(500).json({ error: "Failed to search videos", message: error.message });
    }
  },

  // Get detailed information about a specific video
  get1UtubeVideoAndDetails: async (req, res) => {
    try {
      const { videoId } = req.params;
      if (!videoId || typeof videoId !== "string") {
        return res.status(400).json({ error: "Invalid video ID" });
      }
      // Check if the video ID is already cached
      const cacheKey = `video-${videoId}`;
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        console.log("Cache hit for video ID:", videoId);
        return res.json(cachedData);
      }
      console.log("Cache miss for video ID:", videoId);

      // Fetch video details from YouTube API
      console.log("@get1Utube video id", videoId);
      const url = `https://${RAPID_API_HOST}/videos`;
      const params = {
        part: "snippet,contentDetails,statistics",
        id: videoId,
      };

      const response = await axios.get(url, { ...options, params });
      console.log("response from getVideoDetails", response.data);
      if (!response.data.items || response.data.items.length === 0) {
        console.error("Video not found");
        return res.status(404).json({ error: "Video not found" });
      }

      const video = response.data.items[0];

      // Transform the data
      const transformedData = {
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      channelId: video.snippet.channelId,
      channelTitle: video.snippet.channelTitle,
      publishedAt: video.snippet.publishedAt,
      thumbnail: video.snippet.thumbnails.medium.url,
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

  get1S3VideoAndDetails: async (req, res) => {
    try {
      // Fetching metadata from MySQL database
      const { id } = req.params;
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid video ID" });
      }
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

  getChannelDetails: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Channel ID is required" });
      }
  
      const url = `https://${RAPID_API_HOST}/channels`;
      const params = { part: "snippet,statistics", id };
  
      const response = await axios.get(url, { ...options, params });
      if (!response.data.items || response.data.items.length === 0) {
        return res.status(404).json({ error: "Channel not found" });
      }
  
      const channel = response.data.items[0];
      const transformedData = {
        id: channel.id,
        title: channel.snippet.title,
        description: channel.snippet.description,
        thumbnail: channel.snippet.thumbnails.medium.url,
        subscriberCount: channel.statistics.subscriberCount,
        videoCount: channel.statistics.videoCount,
      };
  
      res.json(transformedData);
    } catch (error) {
      console.error("Error fetching channel details:", error);
      res.status(500).json({ error: "Failed to fetch channel details", message: error.message });
    }
  },


};

module.exports = videoController;
