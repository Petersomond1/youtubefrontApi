// //  youtubefront\src\components\Feed.jsx
import React, { useEffect, useState } from "react";
import "../index.css";
<<<<<<< HEAD
import Sidebar from "./Sidebar";
import Videos from "./Videos";
import axios from "axios";
=======
import { fetchFromAPI } from "../utils/fetchFromAPI";
import Sidebar from './Sidebar';
import Videos from './Videos';
import { FaHandMiddleFinger } from "react-icons/fa";
import axios from 'axios'
>>>>>>> 4cc83c51ba43ad2e770e940842e3119df8fb1da5

function Feed() {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
<<<<<<< HEAD
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/videos/search?q=${selectedCategory}`
        );
        setVideos(response.data.videos);
        setError(null);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          setError("Rate limit exceeded. Please try again later.");
        } else {
          setError("Failed to fetch videos. Please try again.");
        }
      }
    };

    fetchVideos();
  }, [selectedCategory]);

=======
  

  useEffect(()=>{
    const handleGet = async ()=>{
      try {
        console.log("sending request")
        const response = await axios.get(`http://localhost:5000/api/videos?category=${selectedCategory}`)
        console.log("response", response)
      } catch (error) {
        console.error("error while sending get request", error)
      }
    }
    handleGet()

  },[])

  useEffect(() => {
   // setVideos(null);
     fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
     .then((data) => setVideos(data.items));

     
  }, [selectedCategory]);


  


>>>>>>> 4cc83c51ba43ad2e770e940842e3119df8fb1da5
  return (
    <div className="feed1">
<<<<<<< HEAD
=======

>>>>>>> 4cc83c51ba43ad2e770e940842e3119df8fb1da5
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
<<<<<<< HEAD
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <Videos videos={videos} />
        )}
      </div>
=======
        <button >Click here</button>


         <Videos videos={videos}/> 


      </div> 


>>>>>>> 4cc83c51ba43ad2e770e940842e3119df8fb1da5
    </div>
  );
}

export default Feed;

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
