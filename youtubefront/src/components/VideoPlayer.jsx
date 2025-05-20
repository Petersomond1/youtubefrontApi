import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ video }) => {
  if (!video) {
    return <p style={{ color: "white" }}>No video data available.</p>;
  }

  const { id, fileUrl, title } = video;

  return (
    <div style={{ width: "100%", position: "sticky", top: "86px" }}>
      {fileUrl ? (
        // Render ReactPlayer for S3/Database videos
        <ReactPlayer url={fileUrl} className="react-player" controls />
      ) : id ? (
        // Render ReactPlayer for YouTube videos
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${id}`}
          className="react-player"
          controls
        />
      ) : (
        <p style={{ color: "white" }}>Unable to play this video.</p>
      )}

      <p style={{ color: "#fff", fontWeight: "bold", padding: "2px" }}>
        {title || "Untitled Video"}
      </p>
    </div>
  );
};

export default VideoPlayer;