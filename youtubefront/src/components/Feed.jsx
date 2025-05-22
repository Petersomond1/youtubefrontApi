//  youtubefront\src\components\Feed.jsx
import React, { useEffect, useState } from "react";
import "../index.css";
import Sidebar from "./Sidebar";
import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";

function Feed() {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [allVideos, setAllVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async (pageToken = "") => {
    try {
      setLoading(true);
      const data = await fetchFromAPI(`all?category=${selectedCategory}&pageToken=${pageToken}`);
      
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch videos");
      }

      if (pageToken) {
        // If it's pagination, append only new YouTube videos (database videos don't paginate)
        setAllVideos((prev) => [
          ...prev.filter(video => video.source === 'database'), // Keep existing database videos
          ...prev.filter(video => video.source === 'youtube'), // Keep existing YouTube videos
          ...data.youtubeVideos // Add new YouTube videos
        ]);
      } else {
        // If it's a fresh fetch, replace all videos
        setAllVideos(data.videos || []);
      }

      console.log("@feed Fetched all videos:", data.videos);
      setNextPageToken(data.nextPageToken);
      setError(null);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to fetch videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  // Reset and fetch videos when category changes
  useEffect(() => {
    setAllVideos([]);
    setNextPageToken(null);
    fetchVideos();
  }, [selectedCategory]);

  return (
    <div className="feed1">
      <div className="feed2">
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <p className="copyright">Copyright © 2024 Youtube_Atlanta Media</p>
      </div>
      <div
        className="feed3"
        style={{ overflowY: "auto", height: "90vh", flex: 2 }}
      >
        <h4 className="feed4" style={{ color: "white" }}>
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </h4>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <>
            <Videos videos={allVideos} />
            
          </>
        )}
      </div>
    </div>
  );
}


export default Feed;


// //  youtubefront\src\components\Feed.jsx
// import React, { useEffect, useState } from "react";
// import "../index.css";
// import Sidebar from "./Sidebar";
// import Videos from "./Videos";
// import { fetchFromAPI } from "../utils/fetchFromAPI";

// function Feed() {
//   const [selectedCategory, setSelectedCategory] = useState("New");
//   const [youtubeVideos, setYoutubeVideos] = useState([]);
//   const [s3Videos, setS3Videos] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const data = await fetchFromAPI(`search?q=${selectedCategory}`);
//         setYoutubeVideos(data.youtubeVideos);
//         setS3Videos(data.s3Videos);
//         setError(null);
//       } catch (error) {
//         setError("Failed to fetch videos. Please try again.");
//       }
//     };

//     fetchVideos();
//   }, [selectedCategory]);

//   return (
//     <div className="feed1">
//       <div className="feed2">
//         <Sidebar
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//         />
//         <p className="copyright">Copyright © 2024 Youtube_Atlanta Media</p>
//       </div>

//       <div
//         className="feed3"
//         style={{ overflowY: "auto", height: "90vh", flex: 2 }}
//       >
//         <h4 className="feed4" style={{ color: "white" }}>
//           {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
//         </h4>
//         {error ? (
//           <p style={{ color: "red" }}>{error}</p>
//         ) : (
//           <>
//             <h5 style={{ color: "white" }}>YouTube Videos</h5>
//             <Videos videos={youtubeVideos} />
//             <h5 style={{ color: "white" }}>S3 Videos</h5>
//             <Videos videos={s3Videos} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Feed;



// import React, { useEffect, useState } from "react";
// import "../index.css";
// import Sidebar from "./Sidebar";
// import Videos from "./Videos";
// import { fetchFromAPI } from "../utils/fetchFromAPI";

// function Feed() {
//   const [selectedCategory, setSelectedCategory] = useState("New");
//   const [videos, setVideos] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const data = await fetchFromAPI(`search?q=${selectedCategory}`);
//         setVideos(data.videos);
//         setError(null);
//       } catch (error) {
//         setError("Failed to fetch videos. Please try again.");
//       }
//     };

//     fetchVideos();
//   }, [selectedCategory]);

//   return (
//     <div className="feed1">
//       <div className="feed2">
//         <Sidebar
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//         />
//         <p className="copyright">Copyright © 2024 Youtube_Atlanta Media</p>
//       </div>

//       <div
//         className="feed3"
//         style={{ overflowY: "auto", height: "90vh", flex: 2 }}
//       >
//         <h4 className="feed4" style={{ color: "white" }}>
//           {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
//         </h4>
//         {error ? (
//           <p style={{ color: "red" }}>{error}</p>
//         ) : (
//           <Videos videos={videos} />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Feed;


// // //  youtubefront\src\components\Feed.jsx
// import React, { useEffect, useState } from "react";
// import "../index.css";
// import { fetchFromAPI } from "../utils/fetchFromAPI";
// import Sidebar from './Sidebar';
// import Videos from './Videos';
// import axios from 'axios';

// function Feed() {
//   const [selectedCategory, setSelectedCategory] = useState("New");
//   const [videos, setVideos] = useState([]);
  

//   useEffect(()=>{
//     const handleGet = async ()=>{
//       try {
//         console.log("sending request")
//         const response = await axios.get(`http://localhost:5000/api/videos?category=${selectedCategory}`)
//         console.log("response", response)
//       } catch (error) {
//         console.error("error while sending get request", error)
//       }
//     }
//     handleGet()

//   },[])

//   useEffect(() => {
//    // setVideos(null);
//      fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
//      .then((data) => setVideos(data.items));

     
//   }, [selectedCategory]);


  


//   return (
//     <div className="feed1">
//       <div className="feed2">
//         <Sidebar
//           selectedCategory={selectedCategory}

//     <div
//       className="feed3"
//       style={{ overflowY: "auto", height: "90vh", flex: 2 }}
//     >
//       <h4 className="feed4" style={{ color: "white" }}>
//         {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
//       </h4>
//       {error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : (
//         <Videos videos={videos} />
//       )}
//     </div>
//   </div>
// );
// }

// export default Feed;

//  youtubefront\src\components\Feed.jsx
// import React, { useEffect, useState } from "react";
// import "../index.css";
// import { fetchFromAPI } from "../utils/fetchFromAPI";
// import Sidebar from "./Sidebar";
// import Videos from "./Videos";
// import { FaHandMiddleFinger } from "react-icons/fa";
// import axios from "axios";

// function Feed() {
//   const [selectedCategory, setSelectedCategory] = useState("New");
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     const handleGet = async () => {
//       try {
//         console.log("sending request");
//         const response = await axios.get(
//            `http://localhost:5000/api/videos/search?q=${selectedCategory}`
//         );
//         console.log("response", response);
//       } catch (error) {
//         console.error("error while sending get request", error);
//       }
//     };

//     handleGet();
//   }, []);

//   useEffect(() => {
//     // setVideos(null);
//     `http://localhost:5000/api/videos/search?part=snippet&q=${selectedCategory}`).then((data) =>
//       setVideos(data.items)
//     );
//   }, [selectedCategory]);

//   return (
//     <div className="feed1">
//       <div className="feed2">
//         <Sidebar
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//         />

//         <p className="copyright">Copyright © 2024 Youtube_Atlanta Media</p>
//       </div>

//       <div
//         className="feed3"
//         style={{ overflowY: "auto", height: "90vh", flex: 2 }}
//       >
//         <h4 className="feed4" style={{ color: "white" }}>
//           {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
//         </h4>
//         <button>Click here</button>

//         <Videos videos={videos} />
//       </div>
//     </div>
//   );
// }

// export default Feed;
