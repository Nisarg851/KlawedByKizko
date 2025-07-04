import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Trophy, Users, Sparkles, Play, Images, ArrowRight, X, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageSkeleton } from '../../components/layout/Skeletons';
import { optimizeCloudinaryUrl } from '../../utils/Helper';
import valorantAgents from "../../models/ValorantAgentCollection.json";
import XWidgetEmbed from './XWidgetEmbed';

interface Media {
  title: string;
  url: string;
  mediaType: string;
}

const LoadMedia = (media: Media) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="aspect-square relative overflow-hidden">
          {!loaded && (
            <ImageSkeleton/>
          )}
    
          {/* Image or Video */}
          {media.mediaType === "image" ? (
            <img
              src={optimizeCloudinaryUrl(media.url)}
              alt={media.title}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : (
            <video
              src={optimizeCloudinaryUrl(media.url)}
              onLoadedData={() => setLoaded(true)}
              preload="metadata"
              autoPlay
              muted
              loop
              playsInline
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>
  );
}

function ValorantPage() {
  const [selectedAgent, setSelectedAgent] = useState<typeof valorantAgents[0] | null>(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    document.title = 'VALORANT MASTERS 2025 | Klawed by Kizko';
    // window.scrollTo(0, 0);
  }, []);

  const openAgentModal = (agent: typeof valorantAgents[0]) => {
    setSelectedAgent(agent);
    setSelectedMediaIndex(0);
    setIsVideoPlaying(false);
  };

  const closeModal = () => {
    setSelectedAgent(null);
    setIsVideoPlaying(false);
  };

  const nextMedia = () => {
    if (selectedAgent) {
      const totalMedia = selectedAgent.images.length + 1; // +1 for video
      setSelectedMediaIndex((prev) => (prev + 1) % totalMedia);
      setIsVideoPlaying(selectedMediaIndex === selectedAgent.images.length - 1);
    }
  };

  const prevMedia = () => {
    if (selectedAgent) {
      const totalMedia = selectedAgent.images.length + 1;
      setSelectedMediaIndex((prev) => (prev - 1 + totalMedia) % totalMedia);
      setIsVideoPlaying(selectedMediaIndex === 0);
    }
  };

  const selectMedia = (index: number) => {
    setSelectedMediaIndex(index);
    setIsVideoPlaying(index === (selectedAgent?.images.length || 0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-secondaryBackground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-no-repeat md:bg-cover bg-top opacity-30"
          style={{ backgroundImage: 'url(/VCT-event.png)' }}
        />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-pink-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="mt-[20%] md:mt-0 w-full relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='md:flex justify-between md:border-b-2 border-primary-500/30'>
            <div className='px-4 md:py-16'>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-red-500/20 backdrop-blur-sm border border-pink-500/30 rounded-full px-6 py-3 mb-6">
                  <Zap className="text-pink-400" size={20} />
                  <span className="text-pink-400 text-xs md:text-lg font-bold">EXCLUSIVE TOURNAMENT SHOWCASE</span>
                </div>
                <h1 className="font-serif text-5xl md:text-7xl mb-4">
                  <span className="bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                    VALORANT
                  </span>
                  <br />
                  <span className="text-white">MASTERS 2025</span>
                </h1>
              
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Kizko's exclusive agent-inspired nail art collection debuts at Toronto's biggest esports event
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-pink-500/30">
                  <Calendar className="text-pink-400 mx-auto mb-3" size={32} />
                  <h3 className="font-bold text-lg mb-2">Tournament Dates</h3>
                  <p className="text-gray-300">June 14-15 <br/>& 20-22, 2025</p>
                </div>
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
                  <MapPin className="text-red-400 mx-auto mb-3" size={32} />
                  <h3 className="font-bold text-lg mb-2">Location</h3>
                  <p className="text-gray-300">Enercare Centre <br/> Toronto, ON </p>
                </div>
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-pink-500/30">
                  <Trophy className="text-pink-400 mx-auto mb-3" size={32} />
                  <h3 className="font-bold text-lg mb-2">Nail Art Showcase</h3>
                  <p className="text-gray-300">A Huge & Exclusive Agent Collections</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/gallery" 
                  className="btn border-2 border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300">
                  View Other Collections
                </Link>
                <button 
                  onClick={() => document.getElementById('agent-collection')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  View Agent Collection
                </button>
              </div>
            </div>

            <div className="mt-8 md:mt-0 md:w-[40%] bg-black/30 backdrop-blur-sm md:p-6 md:border-l-2 border-primary-500/30">
              <h2 className="font-serif text-4xl md:text-5xl text-white py-8">
                Event Highlights
              </h2>
              <div className='flex justify-center items-center px-2'>
                <XWidgetEmbed/>
              </div>
            </div>
            
          </motion.div>
        </div>
      </section>

      {/* Kizko's Showcase Section */}
      <section className="section bg-black/20 backdrop-blur-sm">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
              Exclusive Agent Collection
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Kizko has crafted unique nail art designs inspired by various VALORANT agents. 
              Each collection features a unique design showcasing the persona behind each character.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-pink-500/20 to-red-500/20 backdrop-blur-sm rounded-lg p-8 border border-pink-500/30"
            >
              <Users className="text-pink-400 mb-4" size={48} />
              <h3 className="font-bold text-2xl text-white mb-4">The Agent Collection</h3>
              <p className="text-gray-300">
                This collection features 22 distinct designs, one for each iconic agent, meticulously crafted to capture their essence, abilities, and unique style directly onto your nails.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-red-500/20 to-yellow-500/20 backdrop-blur-sm rounded-lg p-8 border border-red-500/30"
            >
              <Images className="text-red-400 mb-4" size={48} />
              <h3 className="font-bold text-2xl text-white mb-4">Exclusive & Unique Designs</h3>
              <p className="text-gray-300">
                Elevate your nail game with Kizko's extensive VCT collection and unique nail art designs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-pink-500/20 to-yellow-500/20 backdrop-blur-sm rounded-lg p-8 border border-pink-500/30"
            >
              <Sparkles className="text-pink-400 mb-4" size={48} />
              <h3 className="font-bold text-2xl text-white mb-4">Collective Variations</h3>
              <p className="text-gray-300">
                Every agent gets their moment to shine with stunning variations within their individual collection. 
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Agent Collection Grid */}
      <section id="agent-collection" className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
              Agent Nail Art Collection
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              View the complete nail art collection each with intricate and unique nail art designs crafted in their honor.
            </p>
          </motion.div>

          <div className='relative'>
            <div className="h-[90vh] overflow-y-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {valorantAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => openAgentModal(agent)}>
                  <div className="relative overflow-hidden rounded-lg bg-black/30 backdrop-blur-sm border border-gray-700 hover:border-primary-400 transition-all duration-300 transform hover:scale-105">
                    <div className="aspect-square overflow-hidden">
                      {
                        <LoadMedia title={agent.name} url={agent.images[0]} mediaType="image"/>
                      }
                      {/* <video
                              src={agent.video}
                              onLoadedData={() => setLoaded(true)}
                              preload="metadata"
                              autoPlay
                              muted
                              loop
                              playsInline
                              className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110 ${
                                  loaded ? "opacity-100" : "opacity-0"
                              }`}
                              /> */}
                      {/* <img
                        src={agent.images[0]}
                        alt={`${agent.name} nail art`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      /> */}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className='w-full overflow-x-scroll'>
                          {agent.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-block mr-2 px-2 py-1 rounded-full text-xs font-bold"
                                style={{ backgroundColor: agent.color }}>
                                {tag}
                              </span>
                          ))}
                        </div>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                        </div>
                      </div>
                      <h3 className="font-bold text-xl text-white mb-1">{agent.name}</h3>
                      {/* <p className="text-sm text-gray-300 line-clamp-2">{agent.description}</p> */}
                    </div>
                    <div className="absolute inset-0 bg-primary-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                        <ArrowRight className="text-white" size={24} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className='absolute top-0 w-full h-[8px] bg-gradient-to-t from-transparent via-black/40 to-black/80'></div>
            <div className='absolute bottom-0 w-full h-[8px] bg-gradient-to-t from-black/80 via-black/40 to-transparent'></div>    
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-secondaryBackground backdrop-blur-sm">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
              Get Your Agent Design
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Book your collection now to get your own Agent/Weapon skin inspired nail design. 
              Limited slots available during the tournament period. <br/>
              <span className='text-primary-500'>Shipping to US and Canada <Sparkles className='inline align-text-top mt-1' size={16}/></span>
            </p>
            {/* <div className="flex flex-wrap justify-center gap-4">
              <Link to="/booking" className="btn bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105">
                Book Now
              </Link>
              <Link to="/gallery" className="btn border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300">
                View Full Gallery
              </Link>
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* Agent Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 rounded-lg overflow-hidden max-w-6xl w-full md:w-[40%] max-h-[90vh] overflow-y-auto border border-gray-700 "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="p-8">

                  {/* Info Section */}
                  <div className="space-y-6">
                    <div>
                      <div className="">
                        <h2 className="font-serif text-3xl text-white">{selectedAgent.name}</h2>
                        {selectedAgent.tags.map((tag,index) => {
                          console.log(index);
                          return (
                          <span 
                            key={index}
                            className="inline-block my-2 mr-2 px-3 py-1 rounded-full text-sm font-bold text-black"
                            style={{ backgroundColor: selectedAgent.color }}>
                              {tag}
                          </span>
                        )})}
                      </div>
                      {/* <p className="text-gray-300 text-lg leading-relaxed">{selectedAgent.description}</p> */}
                    </div>

                    {/* <div className="space-y-4">
                      <h3 className="font-bold text-xl text-white">Collection Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/30 rounded-lg p-4">
                          <div className="text-pink-400 font-bold text-2xl">3</div>
                          <div className="text-gray-300 text-sm">Designs</div>
                        </div>
                        <div className="bg-black/30 rounded-lg p-4">
                          <div className="text-red-400 font-bold text-2xl">1</div>
                          <div className="text-gray-300 text-sm">Process Video</div>
                        </div>
                      </div>
                    </div> */}

                    {/* <div className="space-y-4">
                      <h3 className="font-bold text-xl text-white">Design Features</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-pink-400 rounded-full" />
                          Agent-specific color palette
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          Ability-inspired patterns
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-pink-400 rounded-full" />
                          Premium materials and techniques
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-pink-400 rounded-full" />
                          Tournament-exclusive design
                        </li>
                      </ul>
                    </div> */}

                    {/* <div className="pt-6 border-t border-gray-700">
                      <Link 
                        to="/booking" 
                        className="btn bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white w-full py-3 rounded-lg font-bold text-lg transition-all duration-300"
                      >
                        Book {selectedAgent.name} Design
                      </Link>
                    </div> */}
                  </div>

                  {/* Media Section */}
                  <div className="space-y-4">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-black">
                      {selectedMediaIndex < selectedAgent.images.length ? (
                        <img
                          src={selectedAgent.images[selectedMediaIndex]}
                          alt={`${selectedAgent.name} design ${selectedMediaIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-black">
                          <div className="text-center">
                            {/* <Play className="text-white mx-auto mb-4" size={64} /> */}
                            <video
                              src={optimizeCloudinaryUrl(selectedAgent.video)}
                              preload="metadata"
                              autoPlay
                              muted
                              loop
                              playsInline
                              className={`w-full h-full object-cover`}
                            />
                            {/* <p className="text-white text-lg">Process Video</p>
                            <p className="text-gray-400 text-sm">Click to play</p> */}
                          </div>
                        </div>
                      )}
                      
                      {/* Navigation Arrows */}
                      <button
                        onClick={prevMedia}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextMedia}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>

                    {/* Media Thumbnails */}
                    <div className="grid grid-cols-4 gap-2">
                      {selectedAgent.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => selectMedia(index)}
                          className={`aspect-square rounded overflow-hidden border-2 transition-colors ${
                            selectedMediaIndex === index ? 'border-pink-400' : 'border-gray-600 hover:border-gray-400'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                      {selectedAgent.video!='' && (<button
                        onClick={() => selectMedia(selectedAgent.images.length)}
                        className='relative aspect-square rounded overflow-hidden border-2 transition-colors bg-black flex items-center justify-center hover:border-primary-400'>
                        <div className='absolute w-full h-full flex justify-center items-center'>
                          <Play className="pl-1 py-1 rounded-full bg-primary-500 text-foreground-500" size={28} />
                        </div>
                        <div>
                          <video
                              src={selectedAgent.video}
                              className="w-full h-full object-cover"
                            />
                        </div>
                      </button>)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ValorantPage;
