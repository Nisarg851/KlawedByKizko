import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import FeaturedGallery from '../components/home/FeaturedGallery';
import Services from '../components/home/Services';
import Testimonials from '../components/home/Testimonials';
import NewsletterPopup from '../components/home/NewsletterPopup';

function HomePage() {
  useEffect(() => {
    document.title = 'Klawed by Kizko';
  }, []);

  return (
    <div>
      {/* {showPreloader ? (
        <PreLoaderVideo onFinished={() => {setShowPreloader(false);}} />
      ) : ( */}
        <div>
          <Hero />
          <FeaturedGallery />
          <Services />
          <Testimonials />
          <NewsletterPopup delay={5000} />
        </div>
      {/* )} */}
    </div>
  );
}

export default HomePage;
