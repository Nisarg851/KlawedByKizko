import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, MapPin, Award, Sparkles } from 'lucide-react';
import KizkoProfile from "/Kizko_profile.jpg";
import InstaShowCase1 from "/insta_showcase_1.jpg";
import InstaShowCase2 from "/insta_showcase_2.jpg";
import InstaShowCase3 from "/insta_showcase_3.jpg";
import InstaShowCase4 from "/insta_showcase_4.jpg";

function ArtistPage() {
  const instafeed = [
    {
      name: "post1",
      src: InstaShowCase1,
      url: "https://www.instagram.com/p/DKhUvEMgLhI/?img_index=1"
    },
    {
      name: "post2",
      src: InstaShowCase2,
      url: "https://www.instagram.com/p/DKddIboNLw-/?img_index=1"
    },
    {
      name: "post3",
      src: InstaShowCase3,
      url: "https://www.instagram.com/p/C6KtPNRLaMw/?img_index=3"
    },
    {
      name: "post4",
      src: InstaShowCase4,
      url: "https://www.instagram.com/p/DCzI8D0RQZ0/?img_index=1"
    },
  ];

  useEffect(() => {
    document.title = 'About Kizko | Klawed by Kizko';
  }, []);

  return (
    <div className="section">
      <div className="container bg-card rounded-lg">
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
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Kizko
            </h1>

            <p className="text-neutral-200 mb-6 leading-relaxed">
              With 3 years of experience in nail artistry, Kizko has established herself as a premier nail artist known for pushing the boundaries of creativity and precision. Her nail journey began in her bedroom at home after developing an interest in nail art and design. After many hours of getting the basics down, she quickly turned it into a new creative medium.
            </p>
            <p className="text-neutral-200 mb-6 leading-relaxed">
              Kizko then found a way to implement her interest in anime, gaming, pop culture and art, into her nails. She has since done work for various artist, models, and conventions, displaying her dedication to the craft. She has begun to display her newfound talent on a wider scale showcasing the potential of nails as a canvas for self-expression.
            </p>
            <p className="text-neutral-200 mb-8 leading-relaxed">
              Both her passion for nail art and unmatched meticulous attention to detail have allowed her to diversify her brand from subtle & elegant everyday wear to elaborate artistic statements. Kizko continues to learn and grow, constantly pushing herself to learn new techniques and further her own artistic journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a 
                href="https://www.instagram.com/klawedbykiz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary">
                <Instagram size={18} />
                Follow on Instagram
              </a>
              {/* <a 
                href="mailto:kizko@example.com"
                className="btn btn-outline">
                <Mail size={18} />
                Contact Kizko
              </a> */}
            </div>
            
            <div className="flex flex-wrap gap-6">
              {/* <div className="flex items-center gap-2">
                <Award className="text-accent-500" size={24} />
                <span className="text-neutral-200 font-medium">Award-Winning Artist</span>
              </div> */}
              <div className="flex items-center gap-2">
                <MapPin className="text-primary-500" size={24} />
                <span className="text-neutral-200 font-medium">Mississauga, ON</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="text-yellow-400" size={24} />
                <span className="text-neutral-200 font-medium">Meet me at VCT Masters Toronto on June 14/15 + June 20-22</span>
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
              <div className="relative z-10 rounded-b-md overflow-hidden shadow-2xl">
                <img 
                  src={KizkoProfile} 
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
            className="font-serif text-3xl text-foreground mb-8 text-center">
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
                  src={instafeed[idx-1].src}
                  alt={`Instagram post ${idx}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <a href={instafeed[idx-1].url} target='_blank' className="absolute inset-0 bg-secondary-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram size={32} className="text-primary-500" />
                </a>
                
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="https://www.instagram.com/klawedbykiz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mb-8 inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
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