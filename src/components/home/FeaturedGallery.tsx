import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GalleryTier } from '../../types';

// Sample data for featured gallery
const featuredItems = [
  {
    id: '1',
    title: 'Crystal Elegance',
    tier: 'Artifact' as GalleryTier,
    imageUrl: 'https://images.pexels.com/photos/3997374/pexels-photo-3997374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'Golden Hour',
    tier: 'Legendary' as GalleryTier,
    imageUrl: 'https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    title: 'Mystic Blue',
    tier: 'Epic' as GalleryTier,
    imageUrl: 'https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    title: 'Minimalist Dream',
    tier: 'Rare' as GalleryTier,
    imageUrl: 'https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

function FeaturedGallery() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Get color class based on tier
  const getTierColorClass = (tier: GalleryTier) => {
    switch (tier) {
      case 'Artifact':
        return 'bg-accent-500';
      case 'Legendary':
        return 'bg-purple-500';
      case 'Epic':
        return 'bg-primary-500';
      case 'Rare':
        return 'bg-secondary-500';
      default:
        return 'bg-secondary-500';
    }
  };

  return (
    <section className="section bg-neutral-50">
      <div className="container">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl md:text-4xl text-secondary-900 mb-4"
          >
            Featured Designs
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-600 max-w-2xl mx-auto"
          >
            Discover our most captivating nail art creations, each one a unique masterpiece crafted with precision and passion.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredItems.map((item) => (
            <motion.div 
              key={item.id}
              variants={item}
              className="gallery-item group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <span className={`inline-block px-2 py-1 text-xs text-white rounded-full mb-1 ${getTierColorClass(item.tier)}`}>
                  {item.tier}
                </span>
                <h3 className="text-white font-medium">{item.title}</h3>
              </div>
              <div className="gallery-overlay absolute inset-0 bg-secondary-900/60 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                <Link 
                  to={`/gallery?tier=${item.tier}`} 
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link to="/gallery" className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors">
            View All Gallery <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedGallery;