import { useEffect } from 'react';
import { motion } from 'framer-motion';
import InquiryForm from '../components/inquiry/InquiryForm';
import { Palette, Sparkles, Hourglass } from 'lucide-react';

function InquiryPage() {
  useEffect(() => {
    document.title = 'Custom Design Inquiry | Klawed by Kizko';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="section">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Custom Design Inquiry</h1>
          <p className="text-neutral-200 max-w-2xl mx-auto">
            Have a unique vision for your nails? Describe your dream design and Kizko will create 
            a personalized nail art experience just for you.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <InquiryForm />
          </div>
          
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary-50 dark:bg-secondary-100 rounded-lg p-6"
            >
              <h3 className="font-serif text-xl text-secondary-900 mb-4">Custom Design Process</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-secondary-200 flex items-center justify-center text-secondary-700 font-semibold shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-800">Submit Your Inquiry</h4>
                    <p className="text-sm text-neutral-600">
                      Fill out the form with details about your dream nail design. 
                      The more specific you are, the better!
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-secondary-200 flex items-center justify-center text-secondary-700 font-semibold shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-800">Consultation</h4>
                    <p className="text-sm text-neutral-600">
                      Kizko will review your request and contact you to discuss details, 
                      pricing, and scheduling options.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-secondary-200 flex items-center justify-center text-secondary-700 font-semibold shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-800">Design Creation</h4>
                    <p className="text-sm text-neutral-600">
                      Once details are finalized, you'll book an appointment for 
                      Kizko to bring your vision to life.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-primary-50 rounded-lg p-6"
            >
              <h3 className="font-serif text-xl text-primary-900 mb-4">Design Tips</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Palette className="text-primary-500 shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-primary-800">Be Specific About Colors</h4>
                    <p className="text-sm text-primary-700">
                      Mention exact colors or reference images that show your preferred palette.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Sparkles className="text-primary-500 shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-primary-800">Consider Special Elements</h4>
                    <p className="text-sm text-primary-700">
                      Note if you want crystals, foils, 3D elements, or other special techniques.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Hourglass className="text-primary-500 shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-primary-800">Plan Ahead</h4>
                    <p className="text-sm text-primary-700">
                      Custom designs often require more time, so inquire at least 1-2 weeks before your desired due date.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InquiryPage;