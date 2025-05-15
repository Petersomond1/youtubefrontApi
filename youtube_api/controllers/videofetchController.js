// youtube_api\controllers\videofetchController.js
const axios = require("axios");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 });

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
  searchVideos: async (req, res) => {
    try {
      const { q = "programming", maxResults = 12 } = req.query;

      // Check if the result is in the cache
      const cacheKey = `${q}-${maxResults}`;
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        return res.json({ videos: cachedData });
      }

      const url = `https://${RAPID_API_HOST}/search`;
      const params = {
        q,
        part: "snippet,id",
        regionCode: "US",
        maxResults: parseInt(maxResults),
        order: "relevance",
        type: "video",
      };

      const response = await axios.get(url, { ...options, params });

      const transformedData = response.data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));

      // Store the result in the cache
      cache.set(cacheKey, transformedData);

      res.json({ videos: transformedData });
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error("Rate limit exceeded:", error.message);
        return res.status(429).json({
          error: "Rate limit exceeded. Please try again later.",
        });
      }

      console.error("Error searching videos:", error);
      res.status(500).json({
        error: "Failed to search videos",
        message: error.message,
      });
    }
  },

  // Get detailed information about a specific video
  getVideoDetails: async (req, res) => {
    try {
      const { videoId } = req.params;

      const url = `https://${RAPID_API_HOST}/videos`;
      const params = {
        part: "snippet,contentDetails,statistics",
        id: videoId,
      };

      const response = await axios.get(url, {
        ...options,
        params,
      });

      if (response.data.items.length === 0) {
        return res.status(404).json({ error: "Video not found" });
      }

      const video = response.data.items[0];

      // Transform the data
      const transformedData = {
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        channelTitle: video.snippet.channelTitle,
        publishedAt: video.snippet.publishedAt,
        thumbnail:
          video.snippet.thumbnails.standard?.url ||
          video.snippet.thumbnails.high.url,
        duration: video.contentDetails.duration,
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount,
        tags: video.snippet.tags || [],
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

  getAllVideos: async (req, res) => {
    try {
      const { category } = req.query;
      console.log("here is the request", category);
      // const result = await
    } catch (error) {}
  },
};

module.exports = videoController;
