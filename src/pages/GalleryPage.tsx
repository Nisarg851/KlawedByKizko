import { useEffect } from 'react';
import { motion } from 'framer-motion';
import GalleryGrid from '../components/gallery/GalleryGrid';

function GalleryPage() {
  useEffect(() => {
    document.title = 'Gallery | Klawed by Kizko';
  }, []);

  return (
    <div className="section dark:bg-secondary-900">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Nail Art Gallery</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Browse our collection of bespoke nail designs, organized by artistry tiers from rare to artifact.
            Each creation is a unique expression of style and creativity.
          </p>
        </motion.div>
        
        <GalleryGrid />
      </div>
    </div>
  );
}

export default GalleryPage;