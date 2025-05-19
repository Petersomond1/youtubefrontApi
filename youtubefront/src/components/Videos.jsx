// youtubefront\src\components\Videos.jsx
import React from "react";
import { ChannelCard, VideoCard } from "./index";
import "../index.css";
import Loader from "./Loader";

function Videos({ videos, direction }) {
  if (!videos?.length) return <Loader />;

  return (
    <div className="videos1" style={{ flexDirection: direction || "row" }}>
      {videos.map((item, idx) => {
        console.log("Item:", item); // Debug log to verify structure

        const videoId = item.id; // Video ID is directly in `id`
        const channelTitle = item.channelTitle; // Channel title is directly in `channelTitle`

        return (
          <div key={idx}>
            {videoId && <VideoCard video={{ ...item, id: videoId }} />}
            {channelTitle && <ChannelCard channelDetail={{ ...item, channelTitle }} />}
          </div>
        );
      })}
    </div>
  );
}

export default Videos;

// import React from "react";
// import { ChannelCard, VideoCard } from "./index";
// import "../index.css";
// import Loader from "./Loader";

// function Videos({ videos, direction }) {
//   if (!videos?.length) return <Loader />;

//   return (
//     <div className="videos1" style={{ flexDirection: direction || "row" }}>
//       {videos.map((item, idx) => {
//         console.log("Item:", item); // Debug log to verify structure

//         const videoId = item.id; // Video ID is directly in `id`
//         const channelTitle = item.channelTitle; // Channel title is directly in `channelTitle`

//         return (
//           <div key={idx}>
//             {videoId && <VideoCard video={item} />}
//             {channelTitle && <ChannelCard channelDetail={item} />}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default Videos;


// // youtubefront\src\components\Videos.jsx
// import React from "react";
// import { ChannelCard, VideoCard } from "./index";
// import "../index.css";
// import Loader from "./Loader";

// function Videos({ videos, direction }) {
//   // Debug log to check the videos data
//   console.log("Videos data:", videos);

//   if (!videos?.length) return <Loader />;

//   return (
//     <div className="videos1" style={{ flexDirection: direction || "row" }}>
//       {videos.map((item, idx) => {
//         console.log("Item:", item); // Log each item to verify its structure

//         // Extract videoId and channelId based on the actual structure
//         const videoId = item.id; // Assuming `id` is the video ID
//         const channelId = item.channelId || null; // Use `channelId` if available

//         return (
//           <div key={idx}>
//             {videoId && <VideoCard video={{ ...item, id: { videoId } }} />}
//             {channelId && <ChannelCard channelDetail={{ ...item, id: { channelId } }} />}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default Videos;


// // youtubefront\src\components\Videos.jsx
// import React from "react";
// import { ChannelCard, VideoCard } from "./index";
// import "../index.css";
// import Loader from "./Loader";

// function Videos({ videos, direction }) {
//   // Debug log to check the videos data
//   console.log("Videos data:", videos);

//   if (!videos?.length) return <Loader />;

//   return (
//     <div className="videos1" style={{ flexDirection: direction || "row" }}>
//       {videos.map((item, idx) => (
//         <div key={idx}>
//           {item.id.videoId && <VideoCard video={item} />}
//           {item.id.channelId && <ChannelCard channelDetail={item} />}
//           {/* Debug log to check the item */}
//           {console.log("Item:", item)}
//           {/* Debug log to check the videoId and channelId */}
//           {console.log("Video ID:", item.id.videoId)}
//           {console.log("Channel ID:", item.id.channelId)}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Videos;

// youtubefront\src\components\Videos.jsx
// import React from "react";
// import { ChannelCard, VideoCard } from "./index";
// // import { fetchFromAPI } from '../utils/fetchFromAPI';
// import "../index.css";
// import Loader from "./Loader";

// function Videos({
//   videos,
//   direction,
// }) {
//   if (!videos?.length) return <Loader />;

//   return (
//     <div className="videos1" style={{ direction: direction || "row" }}>
//       {videos.map((item, idx) => (
//         <div key={idx}>
//           {item.id.videoId && <VideoCard video={item} />}

//           {item.id.channelId && <ChannelCard channelDetail={item} />}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Videos;
