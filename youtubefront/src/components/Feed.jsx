//  youtubefront\src\components\Feed.jsx
import React, { useEffect, useState } from "react";
import "../index.css";
import Sidebar from "./Sidebar";
import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";

function Feed() {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [s3Videos, setS3Videos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [error, setError] = useState(null);

  const fetchVideos = async (pageToken = "") => {
    try {
      const data = await fetchFromAPI(`all?category=${selectedCategory}&pageToken=${pageToken}`);
      setYoutubeVideos((prev) => [...prev, ...data.youtubeVideos]);
      setS3Videos(data.s3Videos ?? []); // S3 videos are fetched all at once
      console.log("@feed Fetched YouTube videos:", data.youtubeVideos);
      console.log("@feed Fetched S3 videos:", data.s3Videos);
      setNextPageToken(data.nextPageToken);
      setError(null);
    } catch (error) {
      setError("Failed to fetch videos. Please try again.");
    }
  };

  useEffect(() => {
    setYoutubeVideos([]);
    setS3Videos([]);
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
            <h5 style={{ color: "white" }}>YouTube Videos</h5>
            <Videos videos={youtubeVideos} />
            {nextPageToken && (
              <button onClick={() => fetchVideos(nextPageToken)}>Load More</button>
            )}
            <h5 style={{ color: "white" }}>S3 Videos</h5>
            <Videos videos={s3Videos} />
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
