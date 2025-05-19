 //  youtubefront\src\components\SearchFeed.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from ".";

const SearchFeed = () => {
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [s3Videos, setS3Videos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    const fetchSearchResults = async () => {
      const data = await fetchFromAPI(`all?category=${searchTerm}`);
      setYoutubeVideos(data.youtubeVideos);
      setS3Videos(data.s3Videos);
    };

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div style={{ padding: "8px", minHeight: "95vh" }}>
      <h4
        style={{
          fontWeight: "900",
          color: "white",
          marginBottom: "24px",
          marginLeft: "100px",
        }}
      >
        Search Results for{" "}
        <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </h4>

      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "100px" }} />
        <div>
          <h5 style={{ color: "white" }}>YouTube Videos</h5>
          <Videos videos={youtubeVideos} />
          <h5 style={{ color: "white" }}>S3 Videos</h5>
          <Videos videos={s3Videos} />
        </div>
      </div>
    </div>
  );
};

export default SearchFeed;

// //  youtubefront\src\components\SearchFeed.jsx
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { fetchFromAPI } from "../utils/fetchFromAPI";
// import { Videos } from ".";

// const SearchFeed = () => {
//   const [videos, setVideos] = useState(null);
//   const { searchTerm } = useParams();

//   useEffect(() => {
//     fetchFromAPI(`search?q=${searchTerm}`).then((data) =>
//       setVideos(data.videos)
//     );
//   }, [searchTerm]);

//   return (
//     <div style={{ padding: "8px", minHeight: "95vh" }}>
//       <h4
//         style={{
//           fontWeight: "900",
//           color: "white",
//           marginBottom: "24px",
//           marginLeft: "100px",
//         }}
//       >
//         Search Results for{" "}
//         <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
//       </h4>

//       <div style={{ display: "flex" }}>
//         <div style={{ marginRight: "100px" }} />
//         <Videos videos={videos} />
//       </div>
//     </div>
//   );
// };

// export default SearchFeed;

// import { useState, useEffect } from "react";

// import { useParams } from "react-router-dom";

// //import { fetchFromAPI } from "../utils/fetchFromAPI";

// import { Videos } from ".";

// const SearchFeed = () => {
//   const [videos, setVideos] = useState(null);

//   const { searchTerm } = useParams();

//   useEffect(() => {
//     fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) =>
//       setVideos(data.items)
//     );
//   }, [searchTerm]);

//   return (
//     <div style={{ padding: "8px", minHeight: "95vh" }}>
//       <h4
//         style={{
//           fontWeight: "900",
//           color: "white",
//           marginBottom: "24px",
//           marginLeft: "100px",
//         }}
//       >
//         Search Results for{" "}
//         <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
//       </h4>

//       <div style={{ display: "flex" }}>
//         <div style={{ marginRight: "100px" }} />

//         <Videos videos={videos} />
//       </div>
//     </div>
//   );
// };

// export default SearchFeed;
