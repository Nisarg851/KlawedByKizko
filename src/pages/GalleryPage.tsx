import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GalleryGrid from '../components/gallery/GalleryGrid';
import supabase from '../utils/Supabase';
import { GalleryModel } from '../models/Models';

export interface Gallery {
  All: GalleryModel[];
  Artifact: GalleryModel[];
  Legendary: GalleryModel[];
  Epic: GalleryModel[];
  Rare: GalleryModel[];
};

export interface GalleryPageOffset {
  All: number;
  Artifact: number;
  Legendary: number;
  Epic: number;
  Rare: number;
}

function GalleryPage() {
  const [loading, setLoading] = useState(false);
  const ITEMS_PER_PAGE = 8;

  const [gallery, setGallery] = useState<Gallery>({
    "All": [],
    "Artifact": [], 
    "Legendary": [], 
    "Epic": [], 
    "Rare": []
  });
  
  const [galleryTierPageOffset, setGalleryTierPageOffset] = useState({
    "All": 0,
    "Artifact": 0, 
    "Legendary": 0, 
    "Epic": 0, 
    "Rare": 0
  });

  useEffect(() => {
    document.title = 'Gallery | Klawed by Kizko';
    window.scrollTo(0, 0);
    
    const tiers = ["Artifact", "Legendary", "Epic", "Rare"];
    const fetchGalleryItems = async (tier: string, offset: number) => {
      setLoading(true);
      try {
          let query = supabase.from('gallery').select();
          if(tier != "All"){
            query = query.eq("tier", tier);
          }
          const { data, error } = await query.order('created_at', { ascending: true }) 
                                        .range(offset, offset + ITEMS_PER_PAGE - 1);
  
          if (error) throw error;
  
          setGallery(prevData => ({
            ...prevData,
            [tier]: data,
          }));
      } catch (error) {
          console.error(`Error fetching gallery items for tier ${tier}:`, error.message);
        }
        setLoading(false);
      };
    
    ["All",...tiers].forEach(tier => {
      fetchGalleryItems(tier, galleryTierPageOffset[tier]);
    });

  }, [galleryTierPageOffset]);

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
          <p className="text-neutral-200 max-w-2xl mx-auto">
            Browse our collection of bespoke nail designs, organized by artistry tiers from rare to artifact.
            Each creation is a unique expression of style and creativity.
          </p>
        </motion.div>
        
        <GalleryGrid loading={loading} gallery={gallery} galleryTierPageOffset={galleryTierPageOffset} setGalleryTierPageOffset={setGalleryTierPageOffset} ITEMS_PER_PAGE={ITEMS_PER_PAGE}/>
      </div>
    </div>
  );
}

export default GalleryPage;