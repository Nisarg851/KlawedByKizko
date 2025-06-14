import PreLoaderVideoFile from "/klawedbykiz_intro.mp4";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import KizkoProfile from "/Kizko_profile.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

function SplashScreen({ onIntroComplete }) {
  const [showVideo, setShowVideo] = useState(false);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, 200], [0.4, 1]);
  const isMobile = useIsMobile(); // 👈 Use custom hook

  useEffect(() => {
    const seen = localStorage.getItem("introSeenTime");
    if (seen && Date.now() - parseInt(seen) < 30 * 60 * 1000) {
      onIntroComplete(); // Skip intro
    }
  }, []);

  const triggerIntro = () => {
    localStorage.setItem("introSeenTime", Date.now());
    setShowVideo(true);
  };

  const handleDragEnd = (_, info) => {
    if (info.point.x > 200) {
      triggerIntro();
    }
  };

  const handleClickDesktop = () => {
    animate(x, 240, {
      type: "spring",
      stiffness: 120,
      damping: 20,
      onComplete: triggerIntro,
    });
  };

  if (showVideo) {
    return (
        <div className="w-full h-[100vh] flex items-center justify-center bg-secondaryBackground">
          <video
            src={PreLoaderVideoFile}
            preload="metadata"
            onEnded={onIntroComplete}
            autoPlay
            playsInline
            className="w-full object-cover object-center"/>
        </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-background to-black text-white relative overflow-hidden">
      {/* iPhone-style glowing text */}
      
      {/* Swipe bar */}
      <div 
        onClick={!isMobile ? handleClickDesktop : undefined}
        className="w-[300px] h-[60px] bg-primary-500/25 rounded-full border-2 border-primary-500/80 flex items-center px-2 relative cursor-pointer">
        <motion.div
          className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-primary-500/80"
          drag={isMobile ? "x" : false}
          dragConstraints={{ left: 0, right: 240 }}
          dragElastic={0.1}
          style={{ x }}
          onDragEnd={isMobile ? handleDragEnd : undefined}
        >
          <img src={KizkoProfile}
            alt="profile"
            className="w-full h-full object-cover"/>
          {/* <img
            src="/profile.jpg"
            alt="profile"
            className="w-full h-full object-cover"
          /> */}
        </motion.div>
        <div className="top-1/3 text-center w-full">
            <span className="flex justify-center items-end text-xl tracking-widest animate-pulse opacity-80">
                {isMobile ? "Swipe" : "Click"}, Let's Go <ChevronRight />
            </span>
        </div>

        {/* Trail Glow */}
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-white/20 pointer-events-none"
          style={{ width: x, opacity }}
        />
      </div>
    </div>
  );
}

// const SplashScreen = ({ onIntroComplete }) => {
//   const [showVideo, setShowVideo] = useState(false);
//   const x = useMotionValue(0);
//   const opacity = useTransform(x, [0, 200], [0.4, 1]);

//   const handleDragEnd = (_, info) => {
//     if (info.point.x > 200) {
//       // Swiped far enough
//       localStorage.setItem("introSeenTime", Date.now().toString());
//       setShowVideo(true);
//     }
//   };

//   useEffect(() => {
//     const seen = localStorage.getItem("introSeenTime");
//     if (seen && Date.now() - parseInt(seen) < 30 * 60 * 1000) {
//       onIntroComplete(); // Skip intro
//     }
//   }, []);

//   if (showVideo) {
//     return (
//       <video
//         src={PreLoaderVideoFile}
//         preload="metadata"
//         onEnded={onIntroComplete}
//         autoPlay
//         playsInline
//         className="w-full h-[400px] object-cover object-center"/>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
//       {/* Glowing text */}
      

//       {/* Swipe bar */}
//       <div className="w-[300px] h-[60px] bg-white/10 rounded-full border border-white/30 flex items-center px-2 relative">
//         <motion.div
//           className="w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer"
//           drag="x"
//           dragConstraints={{ left: 0, right: 240 }}
//           dragElastic={0.1}
//           style={{ x }}
//           onDragEnd={handleDragEnd}
//         >
//           <img
//             src={KizkoProfile}
//             alt="profile"
//             className="w-full h-full object-cover"
//           />
//         </motion.div>
//         <div className="top-1/3 text-center w-full">
//           <p className="text-xl tracking-widest animate-pulse opacity-70">
//             Swipe to Begin ⟶ 
//           </p>
//         </div>
//         {/* Optional trailing glow effect */}
//         <motion.div
//           className="absolute left-0 top-0 h-full rounded-full bg-white/20 pointer-events-none"
//           style={{ width: x, opacity }}
//         />
//       </div>
//     </div>
//   );
// }

export default SplashScreen;