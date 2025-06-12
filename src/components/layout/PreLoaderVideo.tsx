import PreLoaderVideoFile from "/Kizklawed_preloader_video.mov";

const PreLoaderVideo = ({ onFinished }) => {
  return (
    <div className="w-full h-full fixed inset-0 z-50 bg-red-500 flex justify-center items-center">
      <video
        src={PreLoaderVideoFile}
        autoPlay
        onEnded={onFinished}
        className="w-full h-full object-cover border"
      />
    </div>
  );
};

export default PreLoaderVideo;