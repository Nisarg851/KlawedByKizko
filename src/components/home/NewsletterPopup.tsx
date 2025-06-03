import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X } from 'lucide-react';
import supabase from '../../utils/Supabase';
import Loader from '../layout/Loader';

interface NewsletterModel{
    email: string;
    newsletter_id: number;
};

function NewsletterPopup({ delay = 3000 }: { delay?: number; }) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if the user has already seen the popup
    const hasSeenPopup = localStorage.getItem('hasSeenNewsletterPopup');
    if (hasSeenPopup == "false" || hasSeenPopup == undefined) {
        const timer = setTimeout(() => {
        // console.log("Poping Newsletter");
        setIsVisible(true);
      }, delay);

      const renewalTime = delay + (1000 * 60 * 10) ;
      const renewalTimer = setTimeout(() => {
        // console.log("Renewing Popup");
        localStorage.setItem('hasSeenNewsletterPopup', 'false');
      }, renewalTime);

      return () => {clearTimeout(timer); clearTimeout(renewalTimer)};
    }
  }, [delay]);

  const handleClose = () => {
    setIsVisible(false);
    // Mark that the user has seen the popup
    localStorage.setItem('hasSeenNewsletterPopup', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Basic email validation
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return;
    }

    // console.log('Newsletter signup:', email);
    const newsletter: NewsletterModel = {email: email, newsletter_id: 1};
    const {error: supabaseError} = await supabase.from("newsletters")
                                        .insert([newsletter]);

    if(supabaseError){
      console.log(supabaseError);
      setError("Something went wrong, Pls try again!");
      return;
    }
    
    setIsLoading(false);
    setIsSubmitted(true);
    localStorage.setItem('hasSeenNewsletterPopup', 'true');
    
    // Close the popup after 2 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      { isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-card rounded-lg shadow-xl max-w-md w-full p-6"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>
            
            {isSubmitted ? (
              <div className="text-center py-4">
                <Mail className="mx-auto text-primary-500 mb-4" size={32} />
                <h3 className="font-serif text-xl text-secondary-900 dark:text-white mb-2">
                  Thank you for subscribing!
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  You'll be the first to know about new designs and special offers.
                </p>
              </div>
            ) : (
              isLoading
              ? <div className='flex justify-center'> <Loader /> </div>
              : (<>
                  <div className="text-center mb-6">
                    <Mail className="mx-auto text-primary-500 mb-4" size={32} />
                    <h3 className="font-serif text-xl text-secondary-900 dark:text-white mb-2">
                      Stay Updated with Kizko
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      Subscribe to our newsletter for exclusive nail art inspiration and special offers.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError('');
                        }}
                        placeholder="Enter your email address"
                        className="input w-full"
                      />
                      {error && (
                        <p className="text-red-500 text-sm mt-1">{error}</p>
                      )}
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                      Subscribe Now
                    </button>

                    <p className="text-xs text-center text-neutral-500 dark:text-neutral-400">
                      By subscribing, you agree to receive marketing emails from us.
                      You can unsubscribe at any time.
                    </p>
                  </form>
                </>)
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default NewsletterPopup;