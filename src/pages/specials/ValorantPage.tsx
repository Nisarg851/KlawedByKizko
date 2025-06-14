import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Trophy, Users, Sparkles, Play, Images, ArrowRight, X, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageSkeleton } from '../../components/layout/Skeletons';
import { optimizeCloudinaryUrl } from '../../utils/Helper';

// Valorant Agents data with nail art collections
const valorantAgents = [
  {
    id: 'astra',
    name: 'Astra',
    role: 'Controller',
    description: 'Galactic patterns with cosmic energy and space-themed armor',
    color: '#9B59B6',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786724/_MG_2146_ebdrgp.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786724/_MG_2141_jvgav6.jpg',
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749789350/IMG_6421_ctpuww.mov'
  },
  {
    id: 'clove',
    name: 'Clove',
    role: 'Controller',
    description: 'Dark urban fashion with a rebellious flair and violet accents',
    color: '#8E44AD',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786725/_MG_2207_o9l2yz.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786725/_MG_2205_sezrxa.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786724/_MG_2203_upyaas.jpg'
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749789386/IMG_6439_t5izmp.mov'
  },
  {
    id: 'cypher',
    name: 'Cypher',
    role: 'Sentinel',
    description: 'Desert-worn techwear with surveillance gadgets and sleek shades',
    color: '#C0392B',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786725/_MG_2104_tcpahw.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786725/_MG_2099_r1ebwn.jpg'
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749789421/IMG_6406_e3yeqt.mov'
  },
  {
    id: 'fade',
    name: 'Fade',
    role: 'Initiator',
    description: 'Shadowy Turkish motifs with eerie blue hues and spectral essence',
    color: '#34495E',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786725/_MG_2122_m09tyo.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786725/_MG_2119_s7zer7.jpg'
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749789464/IMG_6413_rxm320.mov'
  },
  {
    id: 'gekko',
    name: 'Gekko',
    role: 'Initiator',
    description: 'Street art aesthetic with neon splashes and companion creatures',
    color: '#2ECC71',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786726/_MG_2212_oafhnj.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786726/_MG_2210_kmcm3y.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786726/_MG_2209_zk8dxr.jpg'
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749789501/IMG_6440_dkvbtr.mov'
  },
  {
    id: 'harbour',
    name: 'Harbour',
    role: 'Controller',
    description: 'Mystical water-themed armor inspired by ancient Indian legends',
    color: '#2980B9',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786727/_MG_2182_xerdqo.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786727/_MG_2180_nmedku.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786727/_MG_2178_vuvkzf.jpg'
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749789533/IMG_6434_tx8o3y.mov'
  },
  {
    id: 'jett',
    name: 'Jett',
    role: 'Duelist',
    description: 'Agile Korean assassin with wind-blade style and sharp elegance',
    color: '#E74C3C',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786727/_MG_2196_i9yi3b.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786727/_MG_2193_fc3lr0.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786727/_MG_2190_wlvlhq.jpg'
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749789569/IMG_6437_lqgmlx.mov'
  },
  {
    id: 'killjoy',
    name: 'Killjoy',
    role: 'Sentinel',
    description: 'German tech genius with neon devices and robotic aesthetics',
    color: '#F1C40F',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786728/_MG_2187_skwscx.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786728/_MG_2184_larcyq.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786728/_MG_2183_xwvwy6.jpg'
    ],
    video: ''
  },
  {
    id: 'mystbloom',
    name: 'Mystbloom',
    role: 'Duelist',
    description: 'Mystic flora-themed cloak with glowing petals and burst magic',
    color: '#DA70D6',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786729/_MG_2081_flgr8n.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786729/_MG_2080_v7yqty.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786728/_MG_2079_cd8thf.jpg'
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749786735/IMG_6399_eejhfo.mov'
  },
  {
    id: 'neon',
    name: 'Neon',
    role: 'Duelist',
    description: 'Electric-blue runner with high-speed techwear and lightning boots',
    color: '#00BFFF',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786730/_MG_2162_y1kuzp.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786730/_MG_2164_nku1sj.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786729/_MG_2159_wj1rxq.jpg'
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749789654/IMG_6431_dnesyr.mov'
  },
  {
    id: 'omen',
    name: 'Omen',
    role: 'Controller',
    description: 'Cloaked shadow figure with teleportation smoke and mystery',
    color: '#2C3E50',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786730/_MG_2176_olpw3z.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786730/_MG_2174_k5ckj8.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786730/_MG_2173_ybygfx.jpg'
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749789695/IMG_6433_q9dfg3.mov'
  },
  {
    id: 'oni',
    name: 'Oni',
    role: 'Duelist',
    description: 'Demonic mask and armor inspired by Japanese folklore',
    color: '#B22222',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786732/_MG_2074_uvktdv.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786732/_MG_2068_pf4960.jpg'
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749786734/IMG_6393_jcnhpd.mov'
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    role: 'Duelist',
    description: 'Flame-infused street gear with fiery confidence and charisma',
    color: '#FF5733',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786733/_MG_2155_nyjsdd.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786732/_MG_2151_zbaz8q.jpg'
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749786736/IMG_6424_l3mluk.mov'
  },
  {
    id: 'raze',
    name: 'Raze',
    role: 'Duelist',
    description: 'Graffiti-covered armor with explosives and roller skates',
    color: '#FF9F00',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786734/_MG_2130_qrasgh.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786734/_MG_2126_byw3ia.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786733/_MG_2125_io6owe.jpg'
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749786738/IMG_6415_olwqft.mov'
  },
  {
    id: 'reyna',
    name: 'Reyna',
    role: 'Duelist',
    description: 'Vampiric queen with glowing purple eyes and sinister elegance',
    color: '#800080',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786735/_MG_2169_va3shh.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786734/_MG_2166_wb1vwr.jpg'
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749789768/IMG_6432_o7ifkj.mov'
  },
  {
    id: 'sage',
    name: 'Sage',
    role: 'Sentinel',
    description: 'Graceful healer with flowing robes and ice crystal orbs',
    color: '#2ECCFA',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786736/_MG_2201_tutbyb.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786736/_MG_2200_ooevkf.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786735/_MG_2198_zddtta.jpg'
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749789799/IMG_6438_wfrluq.mov'
  },
  {
    id: 'skye',
    name: 'Skye',
    role: 'Initiator',
    description: 'Earthy survivalist with animal spirit energy and forest gear',
    color: '#27AE60',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786737/_MG_2096_zyvo0q.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786737/_MG_2088_jcok1t.jpg',
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749789835/IMG_6404_mkznja.mov'
  },
  {
    id: 'sovereign',
    name: 'Sovereign',
    role: 'Sentinel',
    description: 'Royal golden armor with angelic energy and divine presence',
    color: '#F5DEB3',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786738/_MG_2086_hg5wkn.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786737/_MG_2085_czatf0.jpg'
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749789882/IMG_6402_ucyqv8.mov'
  },
  {
    id: 'viper',
    name: 'Viper',
    role: 'Controller',
    description: 'Toxic green suit with corrosive mist and venomous tech gear',
    color: '#27AE60',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786738/_MG_2218_ht1dsb.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786738/_MG_2221_mf0jiv.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786738/_MG_2217_dxh0ou.jpg'
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749789921/IMG_6441_gywwcw.mov'
  },
  {
    id: 'vyse',
    name: 'Vyse',
    role: 'Initiator',
    description: 'Cyber-enhanced tracker with scanning eye and precision toolkit',
    color: '#3498DB',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786739/_MG_2116_gib15t.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786738/_MG_2114_jlx4s7.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786738/_MG_2109_vjanbe.jpg'
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749789958/IMG_6408_tttwe6.mov'
  },
  {
    id: 'yoru',
    name: 'Yoru',
    role: 'Duelist',
    description: 'Dimensional rift-walker with a stealth-driven, aggressive playstyle and a flair for deception',
    color: '#0A0F2C',
    images: [
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786739/_MG_2135_nmrssf.jpg',
      'https://res.cloudinary.com/dcmetdbkq/image/upload/v1749786739/_MG_2132_crv4fp.jpg'
    ],
    video: 'https://res.cloudinary.com/dcmetdbkq/video/upload/v1749790012/IMG_6416_xby7ej.mov'
  }
]


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
    document.title = 'Valorant Masters 2025 | Klawed by Kizko';
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

        <div className="mt-[20%] md:mt-0 container relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-red-500/20 backdrop-blur-sm border border-pink-500/30 rounded-full px-6 py-3 mb-6">
                <Zap className="text-pink-400" size={20} />
                <span className="text-pink-400 font-bold">EXCLUSIVE TOURNAMENT SHOWCASE</span>
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
                <p className="text-gray-300">March 15-17 <br/>& 20-22, 2025</p>
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
              Kizko has crafted unique nail art designs inspired by various Valorant agents. 
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                      <span 
                        className="inline-block px-2 py-1 rounded-full text-xs font-bold"
                        style={{ backgroundColor: agent.color }}
                      >
                        {agent.role}
                      </span>
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
              Book your appointment now to get your own agent-inspired nail design. 
              Limited slots available during the tournament period.
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
                      <div className="flex items-end gap-3 mb-4">
                        <h2 className="font-serif text-3xl text-white">{selectedAgent.name}</h2>
                        <span 
                          className="inline-block px-3 py-1 rounded-full text-sm font-bold text-black"
                          style={{ backgroundColor: selectedAgent.color }}
                        >
                          {selectedAgent.role}
                        </span>
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
                        className='aspect-square rounded overflow-hidden border-2 transition-colors bg-black flex items-center justify-center 
                          border-primary-600 hover:border-primary-400'>
                        <div className='relative'>
                          <Play className="pl-2 absolute top-[44%] left-[40%] text-primary-500" size={42} />
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
