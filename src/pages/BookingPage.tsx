import { useEffect } from 'react';
import { motion } from 'framer-motion';
import BookingForm from '../components/booking/BookingForm';
import { Calendar, Clock, CreditCard } from 'lucide-react';

function BookingPage() {
  useEffect(() => {
    document.title = 'Book Appointment | Klawed by Kizko';
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
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Book Your Appointment</h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Reserve your session with Kizko and transform your nails into wearable art. 
            Complete the form below to request an appointment.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BookingForm />
          </div>
          
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary-50 dark:bg-secondary-100 rounded-lg p-6"
            >
              <h3 className="font-serif text-xl text-secondary-900 mb-4">Booking Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="text-primary-500 shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-neutral-800">Availability</h4>
                    <p className="text-sm text-neutral-600">
                      Monday - Friday: 10:00 AM - 7:00 PM<br />
                      Saturday: 10:00 AM - 5:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="text-primary-500 shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-secondary-800">Appointment Duration</h4>
                    <p className="text-sm text-neutral-600">
                      Rare: 60-90 minutes<br />
                      Epic: 90-120 minutes<br />
                      Legendary: 2-3 hours<br />
                      Artifact: 3-4 hours
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CreditCard className="text-primary-500 shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-secondary-800">Payment</h4>
                    <p className="text-sm text-neutral-600">
                      A 25% deposit is required to confirm your booking.
                      Full payment is due at the end of your appointment.
                      We accept all major credit cards and cash.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-primary-50 rounded-lg p-6">
              <h3 className="font-serif text-xl text-primary-900 mb-4">Cancellation Policy</h3>
              <p className="text-sm text-primary-800 mb-4">
                We understand that plans change. If you need to reschedule or cancel your appointment,
                please do so at least 24 hours in advance to avoid a cancellation fee.
              </p>
              <ul className="text-sm text-primary-700 list-disc pl-5 space-y-1">
                <li>Cancellations with less than 24 hours notice may incur a 50% fee</li>
                <li>No-shows will be charged the full appointment price</li>
                <li>Late arrivals may result in shortened service time</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;