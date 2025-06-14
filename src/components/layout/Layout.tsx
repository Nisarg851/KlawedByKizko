import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';
import SplashScreen from './SplashScreen';

interface LayoutProps {
  isAdmin?: boolean;
}

function Layout({ isAdmin = false }: LayoutProps) {
  const [introCompleted, setIntroCompleted] = useState(false);

  return (
    <>
         {!introCompleted 
       ? (
           <div className="w-full h-full">
             <SplashScreen onIntroComplete={()=>{setIntroCompleted(true)}}/>
            </div>
         ) 
       : (
           <div className="flex flex-col min-h-screen bg-background">
             <Header isAdmin={isAdmin} />
             <motion.main 
               className="flex-grow pt-20"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.3 }}>
                 <Outlet />
             </motion.main>
             <Footer />
           </div>
         )
     }
    </>
  )
}

export default Layout;