import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Check, AlertCircle, Upload, X } from 'lucide-react';
import supabase from '../../utils/Supabase';
import NewsletterPopup from '../home/NewsletterPopup';
import Loader from '../layout/Loader';
import { InquiryModel } from '../../models/Models';

interface FormData {
  name: string;
  email: string;
  designDescription: string;
  inspirationPhotos: (File|string)[];
}

function InquiryForm() {
  const defaultFormData = {
    name: '',
    email: '',
    designDescription: '',
    inspirationPhotos: [] as (File|string)[],
  }

  const [formData, setFormData] = useState(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear errors for this field
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.designDescription.trim()) {
      newErrors.designDescription = 'Design description is required';
    } else if (formData.designDescription.length < 10) {
      newErrors.designDescription = 'Please provide more details about your design';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveData = async (newFormData: FormData) => {
    const inquiryModel: InquiryModel = {
      name: newFormData.name,
      email: newFormData.email,
      design_description: newFormData.designDescription,
      inspiration_photos: newFormData.inspirationPhotos as string[]
    }

    const {error: supabaseError} = await supabase.from("inquiries")
                                        .insert([inquiryModel]);

    if(supabaseError){
      console.log(supabaseError);
      setErrors({...errors, formSubmission: "failure"});
      return;
    }

    setSubmitted(true);
    setIsLoading(false);

    setErrors({...errors, formSubmission: "success"});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
      setIsLoading(true);

      let uploadedImagePromises = [] as Promise<string>[];
      if(formData.inspirationPhotos.length > 0){
       uploadedImagePromises = formData.inspirationPhotos.map(async (photo) => {
          const image = new FormData();
          image.append("file", photo as Blob);
          image.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string);
          image.append("cloud_name", import.meta.env.VITE_CLOUDINARY_API_ENV as string);
          image.append("asset_folder", import.meta.env.VITE_CLOUDINARY_UPLOAD_INQUIRIES_FOLDER);

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
        return defaultFormData;
      });
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
        <h3 className="font-serif text-2xl text-secondary-900 mb-4">Inquiry Submitted Successfully!</h3>
        <p className="text-neutral-600 mb-6">
          Thank you for your interest in a custom nail design. Kizko will review your request 
          and contact you within 48 hours to discuss your design in more detail.
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
    <div className="bg-card rounded-xl p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
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
          <label htmlFor="designDescription" className="block text-neutral-800 dark:text-neutral-200 mb-1">Design Description</label>
          <textarea
            id="designDescription"
            name="designDescription"
            value={formData.designDescription}
            onChange={handleChange}
            className={`input min-h-[150px] ${errors.designDescription ? 'border-red-500' : ''}`}
            placeholder="Describe your dream nail design in as much detail as possible. Include colors, patterns, themes, or any specific elements you'd like to incorporate."
          />
          {errors.designDescription && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle size={14} className="mr-1" /> {errors.designDescription}
            </p>
          )}
        </div>
        
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
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Max 3 files, 5MB per file</p>
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
        
        <div className="mt-8">
          <button
            type="submit"
            className="btn btn-primary w-full">
            Submit Inquiry
          </button>
        </div>
      </form>
    </div>
  );
}

export default InquiryForm;