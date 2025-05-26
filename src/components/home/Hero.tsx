import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="relative min-h-[90vh] bg-gradient-to-br from-secondary-900 to-secondary-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/3997387/pexels-photo-3997387.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-12 pb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
              <span className="text-primary-300 block">Bespoke</span> 
              Nail Artistry by Kizko
            </h1>
            <p className="text-neutral-200 text-lg mb-8 max-w-lg">
              Elevate your style with custom nail designs that are as unique as you are. 
              From subtle elegance to bold statements, each creation is a work of art.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/booking" className="btn btn-primary">
                Book Now <ArrowRight size={18} />
              </Link>
              <Link to="/gallery" className="btn btn-outline border-white text-white hover:bg-white/10">
                Explore Gallery
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl border-8 border-white transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img 
                src="https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Luxury nail art design" 
                className="w-full h-[400px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 to-transparent flex items-end">
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full mb-2">
                    Artifact Collection
                  </span>
                  <h3 className="font-serif text-2xl text-white">Crystal Dreams</h3>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -right-10 rounded-lg overflow-hidden shadow-2xl border-8 border-white transform -rotate-6 hover:rotate-0 transition-transform duration-300 hidden md:block">
              <img 
                src="https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Elegant nail design" 
                className="w-48 h-48 object-cover object-center"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Curved divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="fill-neutral-50">
          <path d="M0,64L80,80C160,96,320,128,480,128C640,128,800,96,960,80C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
}

export default Hero;