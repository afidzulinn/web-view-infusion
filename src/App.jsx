import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import Loader from "./components/loader";
import ButtonHandler from "./components/btn-handler";
import { detect, detectVideo } from "./utils/detect";
import "./style/App.css";
import Timer from "./Timer";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { ButtonWebcamComponent } from "./components/ButtonWebcamComponent";

const App = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 }); // loading state
  const [isDrop, setIsDrop] = useState(false);
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  }); // init model & input shape
  const [calculateDrop, setCalculateDrop] = useState(0);
  // references
  const imageRef = useRef(null);
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // model configs
  const modelName = "fix";

  useEffect(() => {
    tf.ready().then(async () => {
      const yolov8 = await tf.loadGraphModel(
        `${window.location.href}/${modelName}_web_model/model.json`,
        {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions }); // set loading fractions
          },
        }
      ); // load model

      // warming up model
      const dummyInput = tf.ones(yolov8.inputs[0].shape);
      const warmupResults = yolov8.execute(dummyInput);

      setLoading({ loading: false, progress: 1 });
      setModel({
        net: yolov8,
        inputShape: yolov8.inputs[0].shape,
      }); // set model & input shape

      tf.dispose([warmupResults, dummyInput]); // cleanup memory
    });
  }, []);

  const handleCalculate = (status) =>{
    setIsDrop(status)
  }

  useEffect(() => {
    if(isDrop){
      setCalculateDrop(current=> current + 1)
    }
  }, [isDrop])

  const [timer, setTimer] = useState(60);
  const [play, setPlay] = useState(false);

  // useEffect(() =>{
  //   let time = null;
  //   if(play){
  //     time = setInterval(() => {
  //       setTimer(current => {
  //         if(current === 0){
  //           setPlay(false)
  //           clearInterval(time)
  //           return 0;
  //         }else{
  //           return current - 1
  //         }
  //       });
  //     }, 1000); 
  //   }
  //   return () => {
  //     clearInterval(time);
  //   };
  // },[play])

  return (
    <div className="App">


      {loading.loading && <Loader>Loading model... {(loading.progress * 100).toFixed(2)}%</Loader>}
      {loading.loading ? null : <Timer  value={timer}/> }

      <div className="header">
        <h1>Infusion Drop Detection App</h1>
        <p>
          Infusion Drop live detection application on browser powered by <code>tensorflow.js</code>
        </p>
        <p>
          model : <code className="code">{modelName}</code>
        </p>
      </div>

      <div className="content">
        <img
          src="#"
          ref={imageRef}
          onLoad={() => detect(imageRef.current, model, canvasRef.current)}
        />
        <video
          autoPlay
          muted
          ref={cameraRef}
          onPlay={() => detectVideo(cameraRef.current, model, canvasRef.current, handleCalculate)}
        />
        {/* <video
          autoPlay
          muted
          ref={videoRef}
          onPlay={() => detectVideo(videoRef.current, model, canvasRef.current, handleCalculate)}
          style={{width:'100vw', height:'100wh', objectFit:"cover" }}

        /> */}
        <canvas width={model.inputShape[1]} height={model.inputShape[2]} ref={canvasRef} />
      </div>
      <>
      <video
          autoPlay
          muted
          ref={videoRef}
          onPlay={() => detectVideo(videoRef.current, model, canvasRef.current, handleCalculate)}
          style={{width:'100%', height:'100%', objectFit:"cover" }}

        />
      </>
      <div><h3>Drop Stats in one minutes : {calculateDrop}</h3></div>

      {/* <ButtonHandler imageRef={imageRef} cameraRef={cameraRef} videoRef={videoRef} /> */}
      <ButtonWebcamComponent imageRef={imageRef} cameraRef={cameraRef} videoRef={videoRef} />
      <button onClick={()=>{setPlay(current => !current)}} disabled={play} >Mulai</button>
    </div>
  );
};

export default App;