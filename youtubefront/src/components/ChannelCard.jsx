// youtubefront\src\components\ChannelCard.jsx
import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { demoProfilePicture } from "../utils/Constants";
import "../index.css";
import { Link } from "react-router-dom";

const ChannelCard = ({ channelDetail = {}, marginTop }) => {
  const { channelTitle, thumbnail } = channelDetail;

  if (!channelTitle) {
    console.warn("Invalid channel data:", channelDetail);
    return null; // Skip rendering if data is invalid
  }

  return (
    <div
      style={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: window.innerWidth <= 768 ? "356px" : "320px",
        height: "326px",
        margin: "auto",
        marginTop,
      }}
    >
      <Link to={`/channel/${channelTitle}`}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <img
            src={thumbnail || demoProfilePicture}
            alt={channelTitle || "Channel Thumbnail"}
            style={{
              borderRadius: "50%",
              height: "180px",
              width: "180px",
              marginBottom: "2px",
              border: "1px solid #e3e3e3",
            }}
          />
          <h6>
            {channelTitle || "Channel Title"}{" "}
            <FaRegCheckCircle
              style={{ fontSize: "14px", color: "gray", marginLeft: "5px" }}
            />
          </h6>
        </div>
      </Link>
    </div>
  );
};

export default ChannelCard;



// // youtubefront\src\components\ChannelCard.jsx
// import { FaRegCheckCircle } from "react-icons/fa";
// import { demoProfilePicture } from "../utils/Constants";
// import "../index.css";
// import { Link } from "react-router-dom";
// import React from "react";

// const ChannelCard = ({ channelDetail = {}, marginTop }) => {
//   if (!channelDetail?.id?.channelId || !channelDetail?.snippet) {
//     console.warn("Invalid channel data:", channelDetail);
//     return null; // Skip rendering if data is invalid
//   }

//   return (
//     <div
//       style={{
//         boxShadow: "none",
//         borderRadius: "20px",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         width: window.innerWidth <= 768 ? "356px" : "320px",
//         height: "326px",
//         margin: "auto",
//         marginTop,
//       }}
//     >
//       <Link to={`/channel/${channelDetail?.id?.channelId || ""}`}>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             textAlign: "center",
//             color: "#fff",
//           }}
//         >
//           <img
//             src={
//               channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture
//             }
//             alt={channelDetail?.snippet?.title || "Channel Thumbnail"}
//             style={{
//               borderRadius: "50%",
//               height: "180px",
//               width: "180px",
//               marginBottom: "2px",
//               border: "1px solid #e3e3e3",
//             }}
//           />
//           <h6>
//             {channelDetail?.snippet?.title || "Channel Title"}{" "}
//             <FaRegCheckCircle
//               style={{ fontSize: "14px", color: "gray", marginLeft: "5px" }}
//             />
//           </h6>
//           {channelDetail?.statistics?.subscriberCount && (
//             <p style={{ fontSize: "15px", fontWeight: 500, color: "gray" }}>
//               {parseInt(
//                 channelDetail?.statistics?.subscriberCount
//               ).toLocaleString("en-US")}{" "}
//               Subscribers
//             </p>
//           )}
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ChannelCard;

// // youtubefront\src\components\ChannelCard.jsx
// import { FaRegCheckCircle } from "react-icons/fa";

// import { demoProfilePicture } from "../utils/Constants";

// import "../index.css";

// import { Link } from "react-router-dom";

// import React from "react";

// const ChannelCard = ({ channelDetail, marginTop }) => (
//   <div
//     style={{
//       boxShadow: "none",

//       borderRadius: "20px",

//       display: "flex",

//       justifyContent: "center",

//       alignItems: "center",

//       width: window.innerWidth <= 768 ? "356px" : "320px",

//       // in the code above was an mui style @media, it would have been width={{ xs: '100% (or 356px)', md: '320px'}}

//       height: "326px",

//       margin: "auto",

//       marginTop,
//     }}
//   >
//     <Link to={`/channel/${channelDetail?.id?.channelId}`}>
//       <div
//         style={{
//           display: "flex",

//           flexDirection: "column",

//           justifyContent: "center",

//           textAlign: "center",

//           color: "#fff",
//         }}
//       >
//         //IMAGE. that url in it is gonna be the pointer to creating and
//         accessing a personal channel.
//         <img
//           src={
//             channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture
//           }
//           alt={channelDetail?.snippet?.title}
//           style={{
//             borderRadius: "50%",

//             height: "180px",

//             width: "180px",

//             marginBottom: "2px",

//             border: "1px solid #e3e3e3",
//           }}
//         />
//         <h6>
//           {channelDetail?.snippet?.title}{" "}
//           <FaRegCheckCircle
//             style={{ fontSize: "14px", color: "gray", marginLeft: "5px" }}
//           />
//         </h6>
//         {channelDetail?.statistics?.subscriberCount && (
//           <p style={{ fontSize: "15px", fontWeight: 500, color: "gray" }}>
//             {parseInt(
//               channelDetail?.statistics?.subscriberCount
//             ).toLocaleString("en-US")}{" "}
//             Subscribers
//           </p>
//         )}
//       </div>
//     </Link>
//   </div>
// );

// export default ChannelCard;
