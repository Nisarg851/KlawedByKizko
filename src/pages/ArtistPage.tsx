import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, MapPin, Award } from 'lucide-react';

function ArtistPage() {
  useEffect(() => {
    document.title = 'About Kizko | Klawed by Kizko';
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full mb-4">
              Meet The Artist
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-secondary-900 mb-6">
              Kizko
            </h1>
            <p className="text-neutral-700 mb-6 leading-relaxed">
              With over 8 years of experience in nail artistry, Kizko has established herself as a premier nail artist 
              known for pushing the boundaries of creativity and precision. Her journey began with a passion for art and 
              a fascination with the potential of nails as a canvas for self-expression.
            </p>
            <p className="text-neutral-700 mb-6 leading-relaxed">
              Having trained with some of the industry's most respected artisans in Tokyo and New York, Kizko combines 
              technical expertise with an artistic vision that transforms each client's nails into wearable masterpieces. 
              Her work has been featured in fashion magazines and worn by celebrities at red carpet events.
            </p>
            <p className="text-neutral-700 mb-8 leading-relaxed">
              Every design is approached with meticulous attention to detail, whether it's a subtle, elegant set for 
              everyday wear or an elaborate artistic statement. Kizko believes that nail art should reflect the individuality 
              of each client, creating designs that are as unique as the person wearing them.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <Instagram size={18} />
                Follow on Instagram
              </a>
              <a 
                href="mailto:kizko@example.com"
                className="btn btn-outline"
              >
                <Mail size={18} />
                Contact Kizko
              </a>
            </div>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Award className="text-accent-500" size={24} />
                <span className="text-secondary-800 font-medium">Award-Winning Artist</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-primary-500" size={24} />
                <span className="text-secondary-800 font-medium">Los Angeles, CA</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/3997380/pexels-photo-3997380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Kizko at work" 
                  className="w-full object-cover"
                />
              </div>
              <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-32 h-32 bg-primary-100 rounded-full z-0"></div>
              <div className="absolute bottom-12 -left-6 w-24 h-24 bg-accent-100 rounded-full z-0"></div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl text-secondary-900 mb-8 text-center"
          >
            Instagram Feed
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative aspect-square rounded-lg overflow-hidden group"
              >
                <img 
                  src={`https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`} 
                  alt={`Instagram post ${idx}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-secondary-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram size={32} className="text-white" />
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              View More on Instagram <Instagram size={18} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistPage;