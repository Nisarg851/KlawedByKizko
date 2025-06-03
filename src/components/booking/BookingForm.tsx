import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import { useDropzone } from 'react-dropzone';
import { Check, AlertCircle, Upload, X } from 'lucide-react';
import { GalleryTier, NailShape, NailLength } from '../../types';
import 'react-calendar/dist/Calendar.css';
import supabase from '../../utils/Supabase';
import NewsletterPopup from '../home/NewsletterPopup';
import Loader from '../layout/Loader';

interface FormData {
  name: string;
  email: string;
  phone: string;
  serviceTier: GalleryTier;
  nailShape: NailShape;
  nailLength: NailLength;
  date: Date;
  time: string;
  inspirationPhotos: (File|string)[];
  notes: string;
}

interface AppointmentModel {
  name: string;
  email: string;
  phone: string;
  service_tier: GalleryTier;
  nail_shape: NailShape;
  nail_length: NailLength;
  appointment_datetime_slot: Date;
  duration: number;
  inspiration_photos: (File|string)[];
  notes: string;
}

function BookingForm() {
  const defualtFormData: FormData = {
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
  }

  const [formData, setFormData] = useState<FormData>(defualtFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [unavailableDateTimeSlots, setUnavailableDateTimeSlots] = useState({});

  useEffect(()=>{
    const fetchBookedSlots = async () => {
      const today = new Date();
      const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);

      // maxDate: End of day, 3 months from now
      const maxDate = new Date(today);
      maxDate.setMonth(maxDate.getMonth() + 3);
      maxDate.setHours(23, 59, 59, 999); // Set to the very end of the day for the max month

      const { data, error } = await supabase
        .from('appointments')
        .select('appointment_datetime_slot, duration') 
        .gte('appointment_datetime_slot', minDate.toISOString()) 
        .lte('appointment_datetime_slot', maxDate.toISOString())
        .order('appointment_datetime_slot', { ascending: true });

      if(error){
        console.log(error);
        setErrors({...errors, formSubmission: "failure"});
        return;
      }

      const timeslots : {[date: string]: { time: string; duration: number; }[]} = {}; 

      data.forEach((appointmentSlot) => {
        const appointment = new Date(appointmentSlot.appointment_datetime_slot);
        const date = `${appointment.getDate()}-${appointment.getMonth()}-${appointment.getFullYear()}`;

        const hours = String(appointment.getHours()).padStart(2, '0');
        const minutes = String(appointment.getMinutes()).padStart(2, '0');

        if(timeslots[date]==undefined)
          timeslots[date] = [];

        timeslots[date].push({"time": `${hours}:${minutes}`, "duration": appointmentSlot.duration});
      });

      // console.log("Timeslot", timeslots);

      setUnavailableDateTimeSlots(timeslots as never);
    }

    fetchBookedSlots();
    
  },[errors]);

  const saveData = async (newFormData: FormData) => {
    const [hours, minutes] = newFormData.time.split(':').map(Number);
    newFormData.date.setHours(hours, minutes, 0, 0);

    const appointmentModel: AppointmentModel = {
      name: newFormData.name,
      email: newFormData.email,
      phone: newFormData.phone,
      service_tier: newFormData.serviceTier,       
      nail_shape: newFormData.nailShape,           
      nail_length: newFormData.nailLength,         
      appointment_datetime_slot: newFormData.date,    
      duration: 60,
      inspiration_photos: newFormData.inspirationPhotos, 
      notes: newFormData.notes,
    };

    const {error: supabaseError} = await supabase.from("appointments")
                                      .insert([appointmentModel])
                                      .select();

    if(supabaseError){
      console.log(supabaseError);
      setErrors({...errors, formSubmission: "failure"});
      return;
    }

    // console.log("Appointment booked!", data);
    setSubmitted(true);
    setIsLoading(false);
    setErrors({...errors, formSubmission: "success"});
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Handling Submit!!!");
    if (validateStep(step)) {
      setIsLoading(true);

      let uploadedImagePromises = [] as Promise<string>[];
      if(formData.inspirationPhotos.length > 0){
       uploadedImagePromises = formData.inspirationPhotos.map(async (photo) => {
          const image = new FormData();
          image.append("file", photo as Blob);
          image.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string);
          image.append("cloud_name", import.meta.env.VITE_CLOUDINARY_API_ENV as string);          
          image.append("asset_folder", import.meta.env.VITE_CLOUDINARY_UPLOAD_BOOKINGS_FOLDER as string);

          let res = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
            method: "POST",
            body: image
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error.message || `Cloudinary upload failed!`);
          }
          
          res = await res.json();

          return res.url;
        });
      }
      
      const results = await Promise.all(uploadedImagePromises);
      const uploadedImageUrls = await results.filter(url => url!=null) as string[];

      setFormData((prevFormData: FormData) => {
        const newFormData = { ...prevFormData, inspirationPhotos: uploadedImageUrls};
        saveData(newFormData);
        return defualtFormData;
      });
    }
  };


  // Available Booking time-slots
  const generateTimeSlots = () => {
    const selectedDate: string = `${formData.date.getDate()}-${formData.date.getMonth()}-${formData.date.getFullYear()}`;
    const bookedTimeSlots: any = unavailableDateTimeSlots[selectedDate as never];

    const bookedTimeSlotObj: any = {};
    bookedTimeSlots?.forEach((timeSlot: { time: string; duration: number; }) => {
      bookedTimeSlotObj[timeSlot.time] = timeSlot.duration
    });

    const slots = [];
    const startTime = 10 * 60; // 10:00 AM in minutes
    const endTime = 18 * 60;   // 6:00 PM in minutes (18:00)
    const interval = 30;       // 30 minutes

    for (let totalMinutes = startTime; totalMinutes <= endTime; totalMinutes += interval) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      // Format for the value (e.g., "10:00", "10:30")
      const value = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      if(bookedTimeSlotObj[value] != undefined){
        // console.log("found a booked slot", value, bookedTimeSlotObj[value]);
        totalMinutes += (bookedTimeSlotObj[value] + 60 - interval);
        
        // remove the last 2 slots to free up 1hr before an appointment
        slots.pop();
        slots.pop();

        continue;
      }

      // Format for the display (e.g., "10:00 AM", "10:30 AM", "1:00 PM")
      let displayHours = hours;
      let ampm = 'AM';
      if (hours >= 12) {
        ampm = 'PM';
        if (hours > 12) {
          displayHours = hours - 12;
        }
      }
      if (hours === 0) { // Handle 12 AM (midnight)
        displayHours = 12;
      }
      const display = `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;

      slots.push(
        <option key={value} value={value} className='text-neutral-800 dark:text-neutral-200'>
          {display}
        </option>
      );
    }
    return slots;
  };

  // Unavailable dates for the calendar (e.g., weekends and specific dates)
  const isDateUnavailable = (date: Date) => {
    const day = date.getDay();
    const isWeekend = (day === 0) || (day === 6); // Saturday and Sunday is unavailable
    
    // Example specific unavailable dates
    const unavailableDates = [
      new Date(2025, 6, 15), // April 15, 2025
      new Date(2025, 6, 16), // April 16, 2025
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
            <h3 className="font-serif text-2xl text-foreground mb-6">Your Information</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-neutral-800 dark:text-neutral-200 mb-1">Full Name</label>
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
                <label htmlFor="email" className="block text-neutral-800 dark:text-neutral-200 mb-1">Email Address</label>
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
                <label htmlFor="phone" className="block text-neutral-800 dark:text-neutral-200 mb-1">Phone Number</label>
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
            <h3 className="font-serif text-2xl text-foreground mb-6">Service Choice</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="serviceTier" className="block text-neutral-800 dark:text-neutral-200 mb-1">Service Tier</label>
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
                <label htmlFor="nailShape" className="block text-neutral-800 dark:text-neutral-200 mb-1">Nail Shape</label>
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
                <label htmlFor="nailLength" className="block text-neutral-800 dark:text-neutral-200 mb-1">Nail Length</label>
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
            <h3 className="font-serif text-2xl text-foreground mb-6">Appointment Date & Time</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-neutral-800 dark:text-neutral-200 mb-3">Select a Date</label>
                <div className="calendar-container border border-neutral-200 rounded-lg overflow-hidden">
                  <Calendar
                    onChange={(date) => setFormData({ ...formData, date: date as Date })}
                    value={formData.date}
                    minDate={new Date()}
                    maxDate={(() => {
                        const d = new Date();
                        d.setMonth(d.getMonth() + 3);
                        return d;
                    })()}
                    tileDisabled={({ date }) => isDateUnavailable(date)}
                  />
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                  <span className="text-primary-500">Note:</span> Highlighted dates are unavailable.
                </p>
              </div>
              
              <div>
                <label htmlFor="time" className="block text-neutral-800 dark:text-neutral-200 mb-1">Available Time Slots</label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="input">
                    {generateTimeSlots()}
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
            <h3 className="font-serif text-2xl text-foreground mb-6">Inspiration & Notes</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Inspiration Photos (Optional)</label>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">Upload up to 3 images to help us understand your vision.</p>
                
                <div 
                  {...getRootProps()} 
                  className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer transition-colors ${
                    errors.photos ? 'border-red-500' : 'border-neutral-300 hover:border-primary-300'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="mx-auto text-neutral-400 mb-2" size={28} />
                  <p>Drag & drop images here, or click to select</p>
                  <p className="text-sm text-neutral-400 dark:text-neutral-400 mt-1">Max 3 files, 5MB per file</p>
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
                          src={URL.createObjectURL(file as Blob)} 
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
                <label htmlFor="notes" className="block text-neutral-800 dark:text-neutral-200 mb-1">Additional Notes (Optional)</label>
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
                onClick={nextStep}
                className="btn btn-primary"
              >
                Next Step
              </button>
            </div>
          </motion.div>
        );

      
      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-serif text-2xl text-foreground mb-6">Order Details</h3>
            
            <div>
              <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Full Name</label>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{formData.name}</p>

              <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Email</label>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{formData.email}</p>

              <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Phone number</label>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{formData.phone}</p>
            </div>

            <div>
              <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Service Tier</label>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{formData.serviceTier}</p>

              <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Nail Shape</label>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{formData.nailShape}</p>

              <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Nail Length</label>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{formData.nailLength}</p>
            </div>

            <div>
              <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Date and Time</label>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{formData.date.toDateString()} at {formData.time}</p>
            </div>

            <div>
              {
                formData.inspirationPhotos.length > 0 && (
                <div>
                  <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Inspiration Photos</label>
                  <div className="mt-4 grid grid-cols-3 gap-3 mb-3">
                    {formData.inspirationPhotos.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file as Blob)}
                          alt={`Inspiration ${index + 1}`}
                          className="w-full h-48 object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {
                formData.notes!="" && (
                  <div>
                    <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Additional Notes</label>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{formData.notes}</p>
                  </div>
              )}
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
                Submit
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if(isLoading){
    return (<div className='flex justify-center'>
      <Loader />
    </div>);
  }
  
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
        {
          submitted && ( <NewsletterPopup />)
        }
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
    <div className="bg-card p-6 md:p-8 rounded-xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4, 5].map((stepNumber) => (
            <div 
              key={stepNumber}
              className="flex flex-col items-center"
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNumber === step 
                    ? 'bg-primary-500 text-white' 
                    : stepNumber < step 
                      ? 'bg-primary-400 text-white' 
                      : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-400'
                }`}
              >
                {stepNumber < step ? <Check size={16} /> : stepNumber}
              </div>
              <div className="text-xs mt-1 text-neutral-500 hidden md:block">
                {stepNumber === 1 && 'Information'}
                {stepNumber === 2 && 'Service'}
                {stepNumber === 3 && 'Date & Time'}
                {stepNumber === 4 && 'Personalize'}
                {stepNumber === 5 && 'Details'}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <form onSubmit={(e)=>{e.preventDefault();}}>
        {renderStep()}
      </form>
    </div>
  );
}

export default BookingForm;