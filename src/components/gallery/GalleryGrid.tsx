import { useState } from 'react';
import { motion } from 'framer-motion';
import { GalleryItem, GalleryTier } from '../../types';
import { useSearchParams } from 'react-router-dom';

// Sample gallery data
const galleryData: GalleryItem[] = [
  {
    id: '1',
    title: 'Crystal Elegance',
    description: 'Shimmering crystals set in a delicate gradient base, creating a luxurious statement.',
    imageUrl: 'https://images.pexels.com/photos/3997374/pexels-photo-3997374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tier: 'Artifact',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Golden Hour',
    description: 'Metallic gold accents on a sunset-inspired gradient, perfect for special occasions.',
    imageUrl: 'https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tier: 'Legendary',
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Mystic Blue',
    description: 'Deep ocean blues with metallic detailing and abstract line work.',
    imageUrl: 'https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tier: 'Epic',
    createdAt: new Date(),
  },
  {
    id: '4',
    title: 'Minimalist Dream',
    description: 'Clean lines and subtle details create an elegant, understated look.',
    imageUrl: 'https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tier: 'Rare',
    createdAt: new Date(),
  },
  {
    id: '5',
    title: 'Floral Fantasy',
    description: 'Intricate hand-painted flowers with dimensional texture and detail.',
    imageUrl: 'https://images.pexels.com/photos/3997380/pexels-photo-3997380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tier: 'Artifact',
    createdAt: new Date(),
  },
  {
    id: '6',
    title: 'Geometric Chic',
    description: 'Bold geometric patterns in contrasting colors for a modern edge.',
    imageUrl: 'https://images.pexels.com/photos/3997387/pexels-photo-3997387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tier: 'Legendary',
    createdAt: new Date(),
  },
  {
    id: '7',
    title: 'Pastel Dreams',
    description: 'Soft pastel watercolor effect with delicate gold foil accents.',
    imageUrl: 'https://images.pexels.com/photos/2106687/pexels-photo-2106687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tier: 'Epic',
    createdAt: new Date(),
  },
  {
    id: '8',
    title: 'Midnight Sparkle',
    description: 'Deep navy base with holographic glitter for stunning depth.',
    imageUrl: 'https://images.pexels.com/photos/3373732/pexels-photo-3373732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tier: 'Rare',
    createdAt: new Date(),
  },
];

interface GalleryGridProps {
  initialFilter?: GalleryTier | 'All';
}

function GalleryGrid({ initialFilter = 'All' }: GalleryGridProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const tier = searchParams.get("tier") as GalleryTier ?? initialFilter;

  console.log(tier);

  const [filter, setFilter] = useState<GalleryTier | 'All'>(tier);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredGallery = filter === 'All' 
    ? galleryData 
    : galleryData.filter(item => item.tier === filter);

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setFilter('All')}
          className={`px-4 py-2 rounded-full transition-colors ${
            filter === 'All' 
              ? 'bg-secondary-800 text-white' 
              : 'bg-neutral-100 text-secondary-800 hover:bg-neutral-200'
          }`}
        >
          All Designs
        </button>
        <button
          onClick={() => setFilter('Artifact')}
          className={`px-4 py-2 rounded-full transition-colors ${
            filter === 'Artifact' 
              ? 'bg-accent-500 text-white' 
              : 'bg-neutral-100 text-secondary-800 hover:bg-neutral-200'
          }`}
        >
          Artifact
        </button>
        <button
          onClick={() => setFilter('Legendary')}
          className={`px-4 py-2 rounded-full transition-colors ${
            filter === 'Legendary' 
              ? 'bg-purple-500 text-white' 
              : 'bg-neutral-100 text-secondary-800 hover:bg-neutral-200'
          }`}
        >
          Legendary
        </button>
        <button
          onClick={() => setFilter('Epic')}
          className={`px-4 py-2 rounded-full transition-colors ${
            filter === 'Epic' 
              ? 'bg-primary-500 text-white' 
              : 'bg-neutral-100 text-secondary-800 hover:bg-neutral-200'
          }`}
        >
          Epic
        </button>
        <button
          onClick={() => setFilter('Rare')}
          className={`px-4 py-2 rounded-full transition-colors ${
            filter === 'Rare' 
              ? 'bg-secondary-500 text-white' 
              : 'bg-neutral-100 text-secondary-800 hover:bg-neutral-200'
          }`}
        >
          Rare
        </button>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredGallery.map((galleryItem) => (
          <motion.div 
            key={galleryItem.id}
            variants={item}
            className="gallery-item group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            onClick={() => setSelectedItem(galleryItem)}
          >
            <div className="aspect-square overflow-hidden">
              <img 
                src={galleryItem.imageUrl} 
                alt={galleryItem.title} 
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <span className={`inline-block px-2 py-1 text-xs text-white rounded-full mb-1 ${getTierColorClass(galleryItem.tier)}`}>
                {galleryItem.tier}
              </span>
              <h3 className="text-white font-medium">{galleryItem.title}</h3>
            </div>
            <div className="gallery-overlay absolute inset-0 bg-secondary-900/60 opacity-0 transition-opacity duration-300 flex items-center justify-center">
              <button 
                onClick={() => setSelectedItem(galleryItem)}
                className="btn btn-primary"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal for gallery item details */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setSelectedItem(null)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative">
                <img 
                  src={selectedItem.imageUrl} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-cover object-center"
                />
                <div className={`absolute top-4 right-4 ${getTierColorClass(selectedItem.tier)} text-white px-3 py-1 rounded-full text-sm`}>
                  {selectedItem.tier}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl text-secondary-900 mb-2">{selectedItem.title}</h3>
                <p className="text-neutral-600 mb-6">{selectedItem.description}</p>
                <div className="mt-auto space-y-4">
                  <button 
                    onClick={() => window.location.href = '/booking'}
                    className="btn btn-primary w-full"
                  >
                    Book This Design
                  </button>
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="btn btn-outline w-full"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default GalleryGrid;