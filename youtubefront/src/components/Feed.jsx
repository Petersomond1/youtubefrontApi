import React, { useEffect, useState } from "react";
import "../index.css";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import Sidebar from './Sidebar';
import Videos from './Videos';
import { FaHandMiddleFinger } from "react-icons/fa";
import axios from 'axios'

function Feed() {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  

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


  


  return (


    <div className="feed1">

      <div className="feed2">


         <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}  /> 


        <p className="copyright">


          Copyright © 2024 Youtube_Atlanta Media


        </p>


      </div>


       <div className="feed3" style= {{overflowY: 'auto', height: '90vh', flex: 2 }}>


        <h4 className="feed4" style={{ color: "white" }}>{selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>


        </h4>
        <button >Click here</button>


         <Videos videos={videos}/> 


      </div> 


    </div>


  );


}





export default Feed;