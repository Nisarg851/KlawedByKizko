import { useState } from "react";
import SplashScreen from "./SplashScreen";

const PreLoaderVideo = () => {
  const [done, setDone] = useState(false);
  return (
    <div className="w-full h-full">
      <SplashScreen onIntroComplete={()=>{setDone(true)}}/>
      {done && <h1>Home Screen</h1>}
    </div>
  );
};

export default PreLoaderVideo;