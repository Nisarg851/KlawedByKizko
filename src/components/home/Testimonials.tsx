import { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Emma Johnson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    text: 'Kizko transformed my nails into works of art! The attention to detail is incredible, and the designs always receive compliments. I won\'t trust anyone else with my nails.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sophia Chen',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    text: 'The level of creativity and precision is unmatched. I came with a vague idea and Kizko turned it into something more beautiful than I could have imagined. Worth every penny!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Olivia Taylor',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    text: 'I\'ve been a client for over a year, and I\'m always amazed by the consistent quality and innovation. Kizko has a gift for understanding exactly what I want, even when I can\'t fully articulate it.',
    rating: 5,
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section bg-secondaryBackground dark:bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            What Our Clients Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-200 max-w-2xl mx-auto">
            Hear from those who have experienced the artistry of Kizko firsthand.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-background rounded-xl p-8 shadow-md"
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* <div className="shrink-0">
                  <img 
                    src={currentTestimonial.avatar} 
                    alt={currentTestimonial.name} 
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary-200"
                  />
                </div> */}
                <div>
                  <div className="flex mb-2">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} size={18} className="fill-accent-500 text-accent-500" />
                    ))}
                  </div>
                  <div className="flex flex-col text-foreground dark:text-neutral-200 italic mb-4">
                    <Quote className="rotate-180 scale-50 fill-white"/>
                    <p className="px-[8%] font-serif text-justify ">{currentTestimonial.text}</p>
                    <Quote className="self-end scale-50 fill-white"/>
                  </div>
                  <p className="text-end font-serif font-semibold text-foreground dark:text-neutral-100">{currentTestimonial.name}</p>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center mt-8 gap-4">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-card shadow hover:bg-primary-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} className="text-foreground hover:text-background" />
              </button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentIndex ? 'bg-primary-400 w-6' : 'bg-neutral-100'}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-card shadow hover:bg-primary-50 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} className="text-foreground hover:text-background" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;