import { Link } from 'react-router-dom';
import { Sparkles, Instagram, Mail, Phone } from 'lucide-react';
import PrimaryLogo from "/logo-primary.svg";

function Footer() {
  return (
    <footer className="bg-secondaryBackground dark:bg-background text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex max-md:flex-col-reverse justify-between gap-12">

          <div className="w-full md:w-[40%]">
            <Link to="/" className="flex items-center gap-2 mb-4">
              {/* <Sparkles className="text-primary-300" size={24} />
              <span className="font-serif text-2xl font-bold text-white">Klawed by Kizko</span> */}
              <span className="text-xl font-bold tracking-tight">
                  <img src={PrimaryLogo} className='w-[12rem] -mt-10'/>
                </span>
            </Link>
            <p className="text-neutral-200 mb-2 text-justify">
              Elevate your nails with bespoke artistry that's uniquely you. 
              From subtle elegance to bold statements, discover nail art that 
              expresses your personal style.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} /> <span className='font-bold'>Follow on Instagram</span>
              </a>
              {/* <a 
                href="mailto:info@klawedbykizko.com" 
                className="btn-primary p-2 rounded-full transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
              <a 
                href="tel:+1234567890" 
                className="btn-primary p-2 rounded-full transition-colors"
                aria-label="Phone"
              >
                <Phone size={24} />
              </a> */}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Explore</h3>
            <ul className="h-[10vh] flex flex-col flex-wrap md:h-full gap-3">
              <li>
                <Link to="/" className="text-neutral-200 hover:text-primary-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-neutral-200 hover:text-primary-300 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/artist" className="text-neutral-200 hover:text-primary-300 transition-colors">
                  About Kizko
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-neutral-200 hover:text-primary-300 transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                <Link to="/inquiry" className="text-neutral-200 hover:text-primary-300 transition-colors">
                  Custom Design
                </Link>
              </li>
              <li>
                <Link to="/valorant-2025" className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-3 py-1 rounded-lg font-medium hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 transition-all duration-300 inline-block">
                  ⚡Valorant 2025 
                </Link>
              </li>
            </ul>
          </div>
                
          {/* <div>
            <h3 className="font-serif text-xl font-bold mb-4">Hours</h3>
            <ul className="space-y-3 text-neutral-200">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>10:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>10:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/inquiry" className="btn btn-primary">
                Have an Inquiry ?
              </Link>
            </div>
          </div> */}
          
        </div>
        
        <div className="border-t border-secondary-800 pt-8 text-center text-neutral-200">
          <p>© {new Date().getFullYear()} Klawed by Kizko. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;