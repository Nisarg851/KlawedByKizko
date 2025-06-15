import { MouseEventHandler, useState } from 'react';
import { motion } from 'framer-motion';
import { GalleryTier } from '../../types';
import { useSearchParams } from 'react-router-dom';
import { Gallery, GalleryPageOffset } from '../../pages/GalleryPage';
import Loader from '../layout/Loader';
import { ChevronLeft, ChevronRight, Maximize } from 'lucide-react';
import { GalleryModel } from '../../models/Models';
import { ImageSkeleton } from '../layout/Skeletons';
import { optimizeCloudinaryUrl } from '../../utils/Helper';

interface GalleryGridProps {
  initialFilter?: GalleryTier | 'All';
  loading?: boolean;
  gallery: Gallery;
  galleryTierPageOffset: {
    "All": 0,
    "Artifact": 0, 
    "Legendary": 0, 
    "Epic": 0, 
    "Rare": 0
  };
  setGalleryTierPageOffset: React.Dispatch<React.SetStateAction<GalleryPageOffset>>;
  ITEMS_PER_PAGE: number;
}

const ResourceMediaItem = ({ galleryItem }: {galleryItem: GalleryModel}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="aspect-square relative overflow-hidden">
      {/* Skeleton */}
      {!loaded && (
        <ImageSkeleton/>
      )}

      {/* Image or Video */}
      {galleryItem.resource_type === "image" ? (
        <img
          src={optimizeCloudinaryUrl(galleryItem.url)}
          alt={galleryItem.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        <video
          src={optimizeCloudinaryUrl(galleryItem.url)}
          onLoadedData={() => setLoaded(true)}
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}


function GalleryGrid({ initialFilter = 'All', loading, gallery, galleryTierPageOffset, setGalleryTierPageOffset, ITEMS_PER_PAGE }: GalleryGridProps) {

  const [searchParams, setSearchParams] = useSearchParams();
  const tier = searchParams.get("tier") as GalleryTier ?? initialFilter;
  const [filter, setFilter] = useState<GalleryTier | 'All'>(tier);
  const [selectedItem, setSelectedItem] = useState<GalleryModel | null>(null);

  const handleNextPage = (tier: string) => {
    setGalleryTierPageOffset(prevPage => ({
      ...prevPage,
      [tier]: (prevPage[tier] || 0) + ITEMS_PER_PAGE,
    }));
  };

  const handlePrevPage = (tier: string) => {
    setGalleryTierPageOffset(prevPage => ({
      ...prevPage,
      [tier]: Math.max(0, (prevPage[tier] || 0) - ITEMS_PER_PAGE),
    }));
  };

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

  return (
    <div>
      <div className="bg-card flex justify-between mb-8 p-1 gap-4 rounded-lg overflow-scroll">
        <button
          onClick={() => setFilter('All')}
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === 'All' 
              ? 'bg-neutral-800 text-white' 
              : 'bg-transparent text-foreground hover:text-secondary-900 hover:bg-neutral-200'
          }`}
        >
          All Designs
        </button>
        <button
          onClick={() => setFilter('Artifact')}
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === 'Artifact' 
              ? 'bg-accent-500 text-white' 
              : 'bg-transparent text-foreground hover:text-secondary-900 hover:bg-accent-100'
          }`}
        >
          Artifact
        </button>
        <button
          onClick={() => setFilter('Legendary')}
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === 'Legendary' 
              ? 'bg-purple-500 text-white' 
              : 'bg-transparent text-foreground hover:text-secondary-900 hover:bg-purple-100'
          }`}
        >
          Legendary
        </button>
        <button
          onClick={() => setFilter('Epic')}
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === 'Epic' 
              ? 'bg-primary-500 text-white' 
              : 'bg-transparent text-foreground hover:text-secondary-900 hover:bg-primary-100'
          }`}
        >
          Epic
        </button>
        <button
          onClick={() => setFilter('Rare')}
          className={`px-4 py-2 rounded-md transition-colors ${
            filter === 'Rare' 
              ? 'bg-secondary-500 text-white' 
              : 'bg-transparent text-foreground hover:text-secondary-900 hover:bg-secondary-100'
          }`}
        >
          Rare
        </button>
      </div>
        {
          loading
          ? <div className="w-full h-[25vh] flex justify-center items-center"><Loader/></div>
          : (
              gallery[filter].length==0
              ? <h1 className="italic w-full font-serif text-2xl text-center text-foreground mb-4">That's all folks :)</h1>
              : (<motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      
                      {gallery[filter].map((galleryItem) => (
                        <motion.div 
                          key={galleryItem.id}
                          // variants={item}
                          // className="gallery-item group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                          className="gallery-item relative overflow-hidden rounded-lg shadow-md"
                          onClick={() => setSelectedItem(galleryItem)}>
                                    <div className="absolute z-20 inset-0 bg-primary-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                      <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                                        <Maximize className="text-white" size={24} />
                                      </div>
                                    </div>
                                    <ResourceMediaItem galleryItem={galleryItem}/>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                      <span className={`inline-block px-2 py-1 text-xs text-white rounded-full mb-1 ${getTierColorClass(galleryItem.tier as GalleryTier)}`}>
                                        {galleryItem.tier}
                                      </span>
                                      {/* <h3 className="text-white font-medium">{galleryItem.title}</h3> */}
                                    </div>
                                    {/* <div className="gallery-overlay absolute inset-0 bg-secondary-900/60 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                                      <button 
                                        onClick={() => setSelectedItem(galleryItem)}
                                        className="btn btn-primary"
                                      >
                                        View Details
                                      </button>
                                    </div> */}
                                  </motion.div>
                                ))}
                        </motion.div>)
            )
          }
      <div className={`mt-8 w-full flex justify-evenly items-center`}>
        {galleryTierPageOffset[filter] > 0 && (<button 
          onClick={()=>{handlePrevPage(filter)}}
          className="p-2 rounded-full bg-primary-500 shadow hover:bg-primary-50 transition-colors"
          aria-label="Previous">
          <ChevronLeft size={24} className="text-foreground hover:text-background" />
        </button>)}

        {(galleryTierPageOffset[filter] < 50 && gallery[filter].length>=ITEMS_PER_PAGE) && (<button 
          onClick={()=>{handleNextPage(filter)}}
          className="p-2 rounded-full bg-primary-500 shadow hover:bg-primary-50 transition-colors"
          aria-label="Next">
          <ChevronRight size={24} className="text-foreground hover:text-background" />
        </button>)}
      </div>

      {/* Modal for gallery item details */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setSelectedItem(null)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="md:w-[50%] max-w-4xl w-full max-h-[90vh] overflow-hidden bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="relative flex justify-center items-center">
                {selectedItem.resource_type=="image"
                  ? (
                      <img 
                        src={optimizeCloudinaryUrl(selectedItem.url)} 
                        alt={selectedItem.title} 
                        className="md:w-[60%] md:h-[50%] object-cover object-center"
                      />
                    )
                  : (
                      <div className="md:w-[50%] md:h-[45%] object-cover object-center">
                        <video
                          src={optimizeCloudinaryUrl(selectedItem.url)}
                          preload="metadata"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      </div>
                    )
                }
                <div className={`absolute bottom-4 right-[2%] md:right-[26%]  ${getTierColorClass(selectedItem.tier as GalleryTier)} text-white px-3 py-1 rounded-full text-sm`}>
                  {selectedItem.tier}
                </div>
              </div>
              {/* <div className="p-6">
                <h3 className="font-serif text-2xl text-foreground mb-2">{selectedItem.title}</h3>
                <p className="text-neutral-200 mb-6">{selectedItem.description}</p>
                <div className="mt-auto space-y-4">
                  <button 
                    onClick={() => window.location.href = '/inquiry'}
                    className="btn btn-primary w-full"
                  >
                    Enquire about this Design
                  </button>
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="btn btn-outline w-full"
                  >
                    Close
                  </button>
                </div>
              </div> */}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default GalleryGrid;