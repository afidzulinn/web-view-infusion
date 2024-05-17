import { useState, useRef } from "react";
import { Webcam } from "../utils/webcam";

export const ButtonWebcamComponent = ({ imageRef, cameraRef, videoRef }) =>{
    const [streaming, setStreaming] = useState(null); // streaming state
    const inputImageRef = useRef(null); // video input reference
    const inputVideoRef = useRef(null); // video input reference
    const webcam = new Webcam(); // webcam handler
  
    // closing image
    const closeImage = () => {
      const url = imageRef.current.src;
      imageRef.current.src = "#"; // restore image source
      URL.revokeObjectURL(url); // revoke url
  
      setStreaming(null); // set streaming to null
      inputImageRef.current.value = ""; // reset input image
      imageRef.current.style.display = "none"; // hide image
    };
  
    // closing video streaming
    const closeVideo = () => {
      const url = videoRef.current.src;
      videoRef.current.src = ""; // restore video source
      URL.revokeObjectURL(url); // revoke url
  
      setStreaming(null); // set streaming to null
      inputVideoRef.current.value = ""; // reset input video
      videoRef.current.style.display = "none"; // hide video
    };
    return(
        <button
        onClick={() => {
          // if not streaming
          if (streaming === null || streaming === "image") {
            // closing image streaming
            if (streaming === "image") closeImage();
            webcam.open(cameraRef.current); // open webcam
            cameraRef.current.style.display = "block"; // show camera
            setStreaming("camera"); // set streaming to camera
          }
          // closing video streaming
          else if (streaming === "camera") {
            webcam.close(cameraRef.current);
            cameraRef.current.style.display = "none";
            setStreaming(null);
          } else alert(`Can't handle more than 1 stream\nCurrently streaming : ${streaming}`); // if streaming video
        }}
      >
        {streaming === "camera" ? "Close" : "Open"} Webcam
      </button>
    )   
}