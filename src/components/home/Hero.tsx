import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import PrimaryLogo from "/logo-primary.svg";
import ProfilePhoto from "/insta-profile.jpg";
import NewsBanner from '../layout/NewsBanner';

function Hero() {
  const {theme} = useTheme();

  return (
    <div className="relative min-h-[90vh] bg-background">
      <NewsBanner/>
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-cover bg-center"></div>
      </div> */}
      
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-12 pb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <div className="w-full lg:w-[20vw] min-md:h-[24vh] animate-sparkle overflow-hidden">
                <Link to='/artist'>
                  <img src={PrimaryLogo} className='w-full lg:w-[20vw] h-[24vh]'/>
                </Link>
              </div>
              {/* <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-semibold leading-tight mb-6">
                KLAWED BY <Link to='/artist'><span className="nav-link text-primary-500 animate-sparkle">KIZKO</span></Link>
              </h1> */}
              <p className="px-2 font-serif text-neutral-200 text-lg mb-8 max-w-lg ">
                Elevate your style with custom nail designs that are as unique as you are.
                From subtle elegance to bold statements, each creation is a work of art.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/gallery" className="btn border-2 border-primary-500 text-primary-500 hover:bg-foreground">
                Explore Gallery
              </Link>
              <Link to="/inquiry" className="btn btn-primary bg-primary-500">
                Custom Design Inquiry <ArrowRight size={18} />
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
                src={ProfilePhoto} 
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
                src={ProfilePhoto}
                alt="Elegant nail design" 
                className="w-48 h-48 object-cover object-center"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Curved divider */}
      <div className="absolute bg-backgroud bottom-0 left-0 right-0">
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="h-[20%] fill-neutral-50 border-2 border-red-600">
          <path fill="#0099ff" fill-opacity="1" d="M0,192L80,186.7C160,181,320,171,480,138.7C640,107,800,53,960,42.7C1120,32,1280,64,1360,80L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg> 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,192L80,186.7C160,181,320,171,480,138.7C640,107,800,53,960,42.7C1120,32,1280,64,1360,80L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
        */}

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 240">
        {
          theme == "light"
          ? ( 
              <path fill="#000021" fillOpacity="1" d="M0,160L80,176C160,192,320,224,480,234.7C640,245,800,235,960,229.3C1120,224,1280,224,1360,224L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            )
          : (
              <path fill="#131214" fillOpacity="1" d="M0,160L80,176C160,192,320,224,480,234.7C640,245,800,235,960,229.3C1120,224,1280,224,1360,224L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            )
        }
        {/* <path fill="#F8F7F7" fill-opacity="1" d="M0,128L80,106.7C160,85,320,43,480,42.7C640,43,800,85,960,112C1120,139,1280,149,1360,154.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path> */}
         {/* <path fill="#F8F7F7" fill-opacity="1" d="M0,160L80,181.3C160,203,320,245,480,261.3C640,277,800,267,960,240C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path> */}
          {/* <path fill="#F8F7F7" fill-opacity="1" d="M0,192L80,186.7C160,181,320,171,480,138.7C640,107,800,53,960,42.7C1120,32,1280,64,1360,80L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path> */}
        </svg>
      </div>
    </div>
  );
}

export default Hero;