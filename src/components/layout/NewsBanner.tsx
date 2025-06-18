import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewsBanner() {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-8xl mx-auto mt-10 px-6 py-5 
                 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
                 bg-[length:200%_200%] animate-gradient-x 
                 text-white text-center shadow-xl overflow-hidden"
    >
      <Link
        to="/valorant-2025"
        className="flex items-center justify-center gap-4 group"
      >
          <h3 className="text-xl upp sm:text-2xl font-bold leading-tight drop-shadow-sm">
            Checkout out new Hot VALORANT Collection !
          </h3>
          {/* <p className="text-sm sm:text-base mt-1 text-white/90">
            Experience an immersive visual journey through color and form—celebrating the artist’s most ambitious work yet.
          </p> */}
        <motion.div
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="shrink-0"
        >
          <ArrowRight className="w-6 h-6 text-white drop-shadow" />
        </motion.div>
      </Link>
    </motion.div>
  );
}
