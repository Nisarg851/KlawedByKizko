import { useState } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import { useDropzone } from 'react-dropzone';
import { Check, AlertCircle, Upload, X } from 'lucide-react';
import { GalleryTier, NailShape, NailLength } from '../../types';
import 'react-calendar/dist/Calendar.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  serviceTier: GalleryTier;
  nailShape: NailShape;
  nailLength: NailLength;
  date: Date;
  time: string;
  inspirationPhotos: File[];
  notes: string;
}

function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    serviceTier: 'Rare',
    nailShape: 'Almond',
    nailLength: 'Medium',
    date: new Date(),
    time: '10:00',
    inspirationPhotos: [],
    notes: '',
  });

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Dropzone for file uploads
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 3,
    maxSize: 5242880, // 5MB
    onDrop: (acceptedFiles) => {
      if (formData.inspirationPhotos.length + acceptedFiles.length > 3) {
        setErrors({
          ...errors,
          photos: 'Maximum 3 photos allowed'
        });
        return;
      }
      setFormData({
        ...formData,
        inspirationPhotos: [...formData.inspirationPhotos, ...acceptedFiles]
      });
      if (errors.photos) {
        const newErrors = { ...errors };
        delete newErrors.photos;
        setErrors(newErrors);
      }
    },
    onDropRejected: (rejectedFiles) => {
      if (rejectedFiles.some(file => file.file.size > 5242880)) {
        setErrors({
          ...errors,
          photos: 'Each file must be less than 5MB'
        });
      } else {
        setErrors({
          ...errors,
          photos: 'Invalid file type. Please upload images only.'
        });
      }
    }
  });

  const removePhoto = (index: number) => {
    const newPhotos = [...formData.inspirationPhotos];
    newPhotos.splice(index, 1);
    setFormData({ ...formData, inspirationPhotos: newPhotos });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear errors for this field
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Valid email is required';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10,}$/.test(formData.phone.replace(/[^\d]/g, ''))) {
        newErrors.phone = 'Valid phone number is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      // Here you would typically send the data to the server
      console.log(formData);
      setSubmitted(true);
    }
  };

  // Unavailable dates for the calendar (e.g., weekends and specific dates)
  const isDateUnavailable = (date: Date) => {
    const day = date.getDay();
    const isWeekend = day === 0; // Sunday is unavailable
    
    // Example specific unavailable dates
    const unavailableDates = [
      new Date(2025, 3, 15), // April 15, 2025
      new Date(2025, 3, 16), // April 16, 2025
    ];
    
    const isSpecificUnavailableDate = unavailableDates.some(
      unavailableDate => 
        unavailableDate.getDate() === date.getDate() &&
        unavailableDate.getMonth() === date.getMonth() &&
        unavailableDate.getFullYear() === date.getFullYear()
    );
    
    return isWeekend || isSpecificUnavailableDate;
  };

  // Form steps
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-serif text-2xl text-secondary-900 mb-6">Your Information</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-neutral-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.name}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-neutral-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-neutral-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`input ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="Your phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.phone}
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="btn btn-primary"
              >
                Next Step
              </button>
            </div>
          </motion.div>
        );
        
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-serif text-2xl text-secondary-900 mb-6">Service Preferences</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="serviceTier" className="block text-neutral-700 mb-1">Service Tier</label>
                <select
                  id="serviceTier"
                  name="serviceTier"
                  value={formData.serviceTier}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="Artifact">Artifact - Premium Design</option>
                  <option value="Legendary">Legendary - Advanced Design</option>
                  <option value="Epic">Epic - Detailed Design</option>
                  <option value="Rare">Rare - Simple Design</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="nailShape" className="block text-neutral-700 mb-1">Nail Shape</label>
                <select
                  id="nailShape"
                  name="nailShape"
                  value={formData.nailShape}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="Square">Square</option>
                  <option value="Round">Round</option>
                  <option value="Almond">Almond</option>
                  <option value="Stiletto">Stiletto</option>
                  <option value="Coffin">Coffin</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="nailLength" className="block text-neutral-700 mb-1">Nail Length</label>
                <select
                  id="nailLength"
                  name="nailLength"
                  value={formData.nailLength}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="Short">Short</option>
                  <option value="Medium">Medium</option>
                  <option value="Long">Long</option>
                  <option value="XL">XL</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="btn btn-outline"
              >
                Previous Step
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="btn btn-primary"
              >
                Next Step
              </button>
            </div>
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-serif text-2xl text-secondary-900 mb-6">Appointment Date & Time</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-neutral-700 mb-3">Select a Date</label>
                <div className="calendar-container border border-neutral-200 rounded-lg overflow-hidden">
                  <Calendar
                    onChange={(date) => setFormData({ ...formData, date: date as Date })}
                    value={formData.date}
                    minDate={new Date()}
                    tileDisabled={({ date }) => isDateUnavailable(date)}
                  />
                </div>
                <p className="text-sm text-neutral-500 mt-2">
                  <span className="text-primary-500">Note:</span> Highlighted dates are unavailable.
                </p>
              </div>
              
              <div>
                <label htmlFor="time" className="block text-neutral-700 mb-1">Preferred Time</label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="btn btn-outline"
              >
                Previous Step
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="btn btn-primary"
              >
                Next Step
              </button>
            </div>
          </motion.div>
        );
        
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-serif text-2xl text-secondary-900 mb-6">Inspiration & Notes</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-neutral-700 mb-1">Inspiration Photos (Optional)</label>
                <p className="text-sm text-neutral-500 mb-3">Upload up to 3 images to help us understand your vision.</p>
                
                <div 
                  {...getRootProps()} 
                  className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer transition-colors ${
                    errors.photos ? 'border-red-500' : 'border-neutral-300 hover:border-primary-300'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="mx-auto text-neutral-400 mb-2" size={28} />
                  <p>Drag & drop images here, or click to select</p>
                  <p className="text-sm text-neutral-500 mt-1">Max 3 files, 5MB per file</p>
                </div>
                
                {errors.photos && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.photos}
                  </p>
                )}
                
                {formData.inspirationPhotos.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {formData.inspirationPhotos.map((file, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt={`Inspiration ${index + 1}`} 
                          className="w-full h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          aria-label="Remove photo"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-neutral-700 mb-1">Additional Notes (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="input min-h-[120px]"
                  placeholder="Any specific requests or details about your desired nail design..."
                />
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="btn btn-outline"
              >
                Previous Step
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Submit Booking Request
              </button>
            </div>
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  // Success message after submission
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="text-green-500" size={32} />
        </div>
        <h3 className="font-serif text-2xl text-secondary-900 mb-4">Booking Request Submitted!</h3>
        <p className="text-neutral-600 mb-6">
          Thank you for your booking request. We'll review your preferred date and time and get back to you 
          within 24 hours to confirm your appointment.
        </p>
        <div className="mt-6">
          <button
            onClick={() => window.location.href = '/'}
            className="btn btn-primary"
          >
            Return to Home
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="card p-6 md:p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div 
              key={stepNumber}
              className="flex flex-col items-center"
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNumber === step 
                    ? 'bg-primary-500 text-white' 
                    : stepNumber < step 
                      ? 'bg-primary-200 text-primary-700' 
                      : 'bg-neutral-200 text-neutral-500'
                }`}
              >
                {stepNumber < step ? <Check size={16} /> : stepNumber}
              </div>
              <div className="text-xs mt-1 text-neutral-500 hidden md:block">
                {stepNumber === 1 && 'Information'}
                {stepNumber === 2 && 'Preferences'}
                {stepNumber === 3 && 'Date & Time'}
                {stepNumber === 4 && 'Details'}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {renderStep()}
      </form>
    </div>
  );
}

export default BookingForm;