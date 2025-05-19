// youtubefront\src\components\VideoDetail.jsx
import React, { useEffect, useState } from "react";
import "../index.css";
import { useParams, Link } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import ReactPlayer from "react-player";
import { FaCheckCircle } from "react-icons/fa";
import { Videos, Loader } from ".";

function VideoDetail() {
  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        // Fetch video details from YouTube API
        const youtubeData = await fetchFromAPI(`${id}`);
        if (youtubeData && youtubeData.title) {
          setVideoDetail(youtubeData);
          const related = await fetchFromAPI(`search?q=${youtubeData.title}`);
          setRelatedVideos(related.youtubeVideos);
        } else {
          // Fallback to S3/Database API
          const s3Data = await fetchFromAPI(`s3/${id}`);
          setVideoDetail(s3Data);
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    fetchVideoDetails();
  }, [id]);

  if (!videoDetail) return <Loader />;

  const { title, channelTitle, channelId, viewCount, likeCount, fileUrl } = videoDetail;

  return (
    <div style={{ minHeight: "95vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          "@media (min-width: 768px)": { flexDirection: "row" },
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ width: "100%", position: "sticky", top: "86px" }}>
            {fileUrl ? (
              // Render ReactPlayer for S3/Database videos
              <ReactPlayer url={fileUrl} className="react-player" controls />
            ) : (
              // Render ReactPlayer for YouTube videos
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                className="react-player"
                controls
              />
            )}

            <p style={{ color: "#fff", fontWeight: "bold", padding: "2px" }}>
              {title}
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                color: "#fff",
                paddingTop: "1px",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              {channelTitle && channelId && (
                <Link to={`/channel/${channelId}`}>
                  <p style={{ fontSize: "small", color: "#fff" }}>
                    {channelTitle}
                    <FaCheckCircle
                      style={{
                        fontSize: "12px",
                        color: "gray",
                        marginLeft: "5px",
                        marginBottom: "2px",
                      }}
                    />
                  </p>
                </Link>
              )}

              <div
                style={{ display: "flex", gap: "20px", alignItems: "center" }}
              >
                {viewCount && (
                  <p style={{ opacity: 0.7 }}>
                    {parseInt(viewCount).toLocaleString()} views
                  </p>
                )}
                {likeCount && (
                  <p style={{ opacity: 0.7 }}>
                    {parseInt(likeCount).toLocaleString()} likes
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "2px",
            paddingTop: "5px",
            "@media (min-width: 768px)": { paddingTop: "1px" },
          }}
        >
          <Videos videos={relatedVideos} direction="column" />
        </div>
      </div>
    </div>
  );
}

export default VideoDetail;


// // youtubefront\src\components\VideoDetail.jsx
// import "../index.css";
// import { useParams, Link } from "react-router-dom";
// import { fetchFromAPI } from "../utils/fetchFromAPI";
// import ReactPlayer from "react-player";
// import { FaCheckCircle } from "react-icons/fa";
// import React, { useEffect, useState } from "react";
// import { Videos, Loader } from ".";

// function VideoDetail() {
//   const [videoDetail, setVideoDetail] = useState(null);
//   const [videos, setVideos] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     fetchFromAPI(`details/${id}`).then((data) => setVideoDetail(data));

//     fetchFromAPI(`search?relatedToVideoId=${id}`).then((data) =>
//       setVideos(data.videos)
//     );
//   }, [id]);

//   if (!videoDetail) return <Loader />;

//   const { title, id: videoId, channelTitle, viewCount, likeCount } = videoDetail;

//   return (
//     <div style={{ minHeight: "95vh" }}>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           "@media (min-width: 768px)": { flexDirection: "row" },
//         }}
//       >
//         <div style={{ flex: 1 }}>
//           <div style={{ width: "100%", position: "sticky", top: "86px" }}>
//             <ReactPlayer
//               url={`https://www.youtube.com/watch?v=${videoId}`}
//               className="react-player"
//               controls
//             />

//             <p style={{ color: "#fff", fontWeight: "bold", padding: "2px" }}>
//               {title}
//             </p>

//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 color: "#fff",
//                 paddingTop: "1px",
//                 paddingLeft: "2px",
//                 paddingRight: "2px",
//               }}
//             >
//               <Link to={`/channel/${channelTitle}`}>
//                 <p style={{ fontSize: "small", color: "#fff" }}>
//                   {channelTitle}
//                   <FaCheckCircle
//                     style={{
//                       fontSize: "12px",
//                       color: "gray",
//                       marginLeft: "5px",
//                       marginBottom: "2px",
//                     }}
//                   />
//                 </p>
//               </Link>

//               <div
//                 style={{ display: "flex", gap: "20px", alignItems: "center" }}
//               >
//                 <p style={{ opacity: 0.7 }}>
//                   {parseInt(viewCount).toLocaleString()} views
//                 </p>

//                 <p style={{ opacity: 0.7 }}>
//                   {parseInt(likeCount).toLocaleString()} likes
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           style={{
//             justifyContent: "center",
//             alignItems: "center",
//             paddingLeft: "2px",
//             paddingTop: "5px",
//             "@media (min-width: 768px)": { paddingTop: "1px" },
//           }}
//         >
//           <Videos videos={videos} direction="column" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VideoDetail;

// import "../index.css";
// import { useParams, Link } from "react-router-dom";
// import { fetchFromAPI } from "../utils/fetchFromAPI";
// import ReactPlayer from "react-player";
// import { FaCheckCircle } from "react-icons/fa";
// import React, { useEffect, useState } from "react";
// import { Videos, Loader } from ".";

// function VideoDetail() {
//   const [videoDetail, setVideoDetail] = useState(null);
//   const [videos, setVideos] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
//       setVideoDetail(data.items[0])
//     );

//     fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
//       (data) => setVideos(data.items)
//     );
//   }, [id]);

//   if (!videoDetail) return <Loader />;

//   const { title, id: videoId, channelTitle, viewCount, likeCount } = videoDetail;

//   return (
//     <div style={{ minHeight: "95vh" }}>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           "@media (min-width: 768px)": { flexDirection: "row" },
//         }}
//       >
//         <div style={{ flex: 1 }}>
//           <div style={{ width: "100%", position: "sticky", top: "86px" }}>
//             <ReactPlayer
//               url={`https://www.youtube.com/watch?v=${videoId}`}
//               className="react-player"
//               controls
//             />

//             <p style={{ color: "#fff", fontWeight: "bold", padding: "2px" }}>
//               {title}
//             </p>

//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 color: "#fff",
//                 paddingTop: "1px",
//                 paddingLeft: "2px",
//                 paddingRight: "2px",
//               }}
//             >
//               <Link to={`/channel/${channelTitle}`}>
//                 <p style={{ fontSize: "small", color: "#fff" }}>
//                   {channelTitle}
//                   <FaCheckCircle
//                     style={{
//                       fontSize: "12px",
//                       color: "gray",
//                       marginLeft: "5px",
//                       marginBottom: "2px",
//                     }}
//                   />
//                 </p>
//               </Link>

//               <div
//                 style={{ display: "flex", gap: "20px", alignItems: "center" }}
//               >
//                 <p style={{ opacity: 0.7 }}>
//                   {parseInt(viewCount).toLocaleString()} views
//                 </p>

//                 <p style={{ opacity: 0.7 }}>
//                   {parseInt(likeCount).toLocaleString()} likes
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           style={{
//             justifyContent: "center",
//             alignItems: "center",
//             paddingLeft: "2px",
//             paddingTop: "5px",
//             "@media (min-width: 768px)": { paddingTop: "1px" },
//           }}
//         >
//           <Videos videos={videos} direction="column" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VideoDetail;







// // youtubefront\src\components\VideoDetail.jsx
// import "../index.css";

// import { useParams, Link } from "react-router-dom";

// import { fetchFromAPI } from "../utils/fetchFromAPI";

// import ReactPlayer from "react-player";

// import { FaCheckCircle } from "react-icons/fa";

// import React, { useEffect, useState } from "react";

// import { Videos, Loader } from ".";

// function VideoDetail() {
//   const [videoDetail, setVideoDetail] = useState(null);

//   const [videos, setVideos] = useState(null);

//   const { id } = useParams();

//   useEffect(() => {
//     fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
//       setVideoDetail(data.items[0])
//     );

//     fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
//       (data) => setVideos(data.items)
//     );
//   }, [id]);

//   if (!videoDetail?.snippet) return <Loader />;

//   const {
//     snippet: { title, channelId, channelTitle },
//     statistics: { viewCount, likeCount },
//   } = videoDetail;

//   return (
//     <div style={{ minHeight: "95vh" }}>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           "@media (min-width: 768px)": { flexDirection: "row" },
//         }}
//       >
//         <div style={{ flex: 1 }}>
//           <div style={{ width: "100%", position: "sticky", top: "86px" }}>
//             <ReactPlayer
//               url={`https://www.youtube.com/watch?v=${id}`}
//               className="react-player"
//               controls
//             />

//             <p style={{ color: "#fff", fontWeight: "bold", padding: "2px" }}>
//               {title}
//             </p>

//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 color: "#fff",
//                 paddingTop: "1px",
//                 paddingLeft: "2px",
//                 paddingRight: "2px",
//               }}
//             >
//               <Link to={`/channel/${channelId}`}>
//                 <p style={{ fontSize: "small", color: "#fff" }}>
//                   {channelTitle}

//                   <i>
//                     {" "}
//                     <FaCheckCircle
//                       style={{
//                         fontSize: "12px",
//                         color: "gray",
//                         marginLeft: "5px",
//                         marginBottom: "2px",
//                       }}
//                     />{" "}
//                   </i>
//                 </p>
//               </Link>

//               <div
//                 style={{ display: "flex", gap: "20px", alignItems: "center" }}
//               >
//                 <p style={{ opacity: 0.7 }}>
//                   {parseInt(viewCount).toLocaleString()} views
//                 </p>

//                 <p style={{ opacity: 0.7 }}>
//                   {parseInt(likeCount).toLocaleString()} likes
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           style={{
//             justifyContent: "center",
//             alignItems: "center",
//             paddingLeft: "2px",
//             paddingTop: "5px",
//             "@media (min-width: 768px)": { paddingTop: "1px" },
//           }}
//         >
//           <Videos videos={videos} direction="column" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VideoDetail;
