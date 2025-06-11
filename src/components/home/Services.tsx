import { motion } from 'framer-motion';
import { Sparkles, Clock, Palette, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Sparkles size={32} className="text-primary-500" />,
    title: 'Bespoke Designs',
    description: 'Personalized nail art crafted specifically for you, reflecting your style and personality.',
  },
  {
    icon: <Clock size={32} className="text-primary-500" />,
    title: 'Professional Service',
    description: 'Luxurious, attentive experience with meticulous attention to detail and comfort.',
  },
  {
    icon: <Palette size={32} className="text-primary-500" />,
    title: 'Premium Materials',
    description: 'Only the finest quality gels, polishes, and embellishments for lasting beauty.',
  },
  {
    icon: <Award size={32} className="text-primary-500" />,
    title: 'Artistic Excellence',
    description: 'Artistry that transforms your nails into wearable masterpieces that capture attention.',
  }
];

function Services() {
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

  return (
    <section className="section bg-secondaryBackground">
      <div className="container">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl md:text-4xl text-foreground mb-4"
          >
            Why Choose Klawed by Kizko
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-200 max-w-2xl mx-auto"
          >
            Experience nail artistry that elevates beyond the ordinary. Each session is an opportunity to express your unique style.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="bg-cardSecondary p-6 rounded-xl hover:translate-y-[-8px]"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="font-serif text-xl text-foreground mb-2">{service.title}</h3>
              <p className="text-neutral-200 mb-4">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 bg-cardSecondary rounded-xl p-8 md:p-12 shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">Ready to transform your nails?</h3>
              <p className="text-neutral-200 mb-6">
                Book your appointment today and experience the artistry of Kizko. From subtle elegance to bold statements, 
                your nails will become a canvas for expressing your unique style.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/artist" className="btn btn-primary">
                  About us
                </Link>
                <Link to="/inquiry" className="btn border-2 border-primary-500 text-primary-500 hover:bg-foreground">
                  Custom Design Inquiry
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3997380/pexels-photo-3997380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Elegant nail art" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-accent-500 text-white px-4 py-2 rounded-lg font-serif">
                Premium Artistry
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;