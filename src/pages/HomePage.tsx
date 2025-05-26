import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import FeaturedGallery from '../components/home/FeaturedGallery';
import Services from '../components/home/Services';
import Testimonials from '../components/home/Testimonials';

function HomePage() {
  useEffect(() => {
    document.title = 'Klawed by Kizko';
  }, []);

  return (
    <div>
      <Hero />
      <FeaturedGallery />
      <Services />
      <Testimonials />
    </div>
  );
}

export default HomePage;