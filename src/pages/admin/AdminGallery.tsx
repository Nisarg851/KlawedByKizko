import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Trash2, Upload, X, Save } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { GalleryItem, GalleryTier } from '../../types';

// Sample data for the gallery
const sampleGalleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Crystal Elegance',
    description: 'Shimmering crystals set in a delicate gradient base, creating a luxurious statement.',
    imageUrl: 'https://images.pexels.com/photos/3997374/pexels-photo-3997374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tier: 'Artifact',
    createdAt: new Date('2025-01-15'),
  },
  {
    id: '2',
    title: 'Golden Hour',
    description: 'Metallic gold accents on a sunset-inspired gradient, perfect for special occasions.',
    imageUrl: 'https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tier: 'Legendary',
    createdAt: new Date('2025-02-10'),
  },
  {
    id: '3',
    title: 'Mystic Blue',
    description: 'Deep ocean blues with metallic detailing and abstract line work.',
    imageUrl: 'https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tier: 'Epic',
    createdAt: new Date('2025-02-20'),
  },
  {
    id: '4',
    title: 'Minimalist Dream',
    description: 'Clean lines and subtle details create an elegant, understated look.',
    imageUrl: 'https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tier: 'Rare',
    createdAt: new Date('2025-03-05'),
  },
  {
    id: '5',
    title: 'Floral Fantasy',
    description: 'Intricate hand-painted flowers with dimensional texture and detail.',
    imageUrl: 'https://images.pexels.com/photos/3997380/pexels-photo-3997380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tier: 'Artifact',
    createdAt: new Date('2025-03-15'),
  },
  {
    id: '6',
    title: 'Geometric Chic',
    description: 'Bold geometric patterns in contrasting colors for a modern edge.',
    imageUrl: 'https://images.pexels.com/photos/3997387/pexels-photo-3997387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tier: 'Legendary',
    createdAt: new Date('2025-03-20'),
  },
];

function AdminGallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(sampleGalleryItems);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>(sampleGalleryItems);
  const [tierFilter, setTierFilter] = useState<GalleryTier | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [newItemImage, setNewItemImage] = useState<File | null>(null);
  const [newItemPreview, setNewItemPreview] = useState<string>('');
  const [newItemForm, setNewItemForm] = useState({
    title: '',
    description: '',
    tier: 'Rare' as GalleryTier,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    document.title = 'Gallery Management | Admin Dashboard';
  }, []);

  // Dropzone for file uploads
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    maxSize: 5242880, // 5MB
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setNewItemImage(acceptedFiles[0]);
        setNewItemPreview(URL.createObjectURL(acceptedFiles[0]));
        
        // Clear any previous image error
        if (errors.image) {
          const newErrors = { ...errors };
          delete newErrors.image;
          setErrors(newErrors);
        }
      }
    },
    onDropRejected: (rejectedFiles) => {
      if (rejectedFiles.some(file => file.file.size > 5242880)) {
        setErrors({
          ...errors,
          image: 'Image must be less than 5MB'
        });
      } else {
        setErrors({
          ...errors,
          image: 'Invalid file type. Please upload images only.'
        });
      }
    }
  });

  // Filter gallery items based on tier and search term
  useEffect(() => {
    let filtered = galleryItems;
    
    // Apply tier filter
    if (tierFilter !== 'All') {
      filtered = filtered.filter(item => item.tier === tierFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredItems(filtered);
  }, [tierFilter, searchTerm, galleryItems]);

  // Function to start editing an item
  const startEditing = (item: GalleryItem) => {
    setEditingItem(item);
    setNewItemForm({
      title: item.title,
      description: item.description,
      tier: item.tier,
    });
    setNewItemPreview(item.imageUrl);
    setIsAddingNew(false); // Close add new form if open
  };

  // Function to cancel editing
  const cancelEditing = () => {
    setEditingItem(null);
    resetNewItemForm();
  };

  // Function to save edited item
  const saveEditedItem = () => {
    if (!validateForm()) return;
    
    const updatedItems = galleryItems.map(item => {
      if (item.id === editingItem?.id) {
        return {
          ...item,
          title: newItemForm.title,
          description: newItemForm.description,
          tier: newItemForm.tier,
          // If a new image was uploaded, we'd update the imageUrl here
          // In a real app, you'd handle the file upload to a storage service
        };
      }
      return item;
    });
    
    setGalleryItems(updatedItems);
    setEditingItem(null);
    resetNewItemForm();
  };

  // Function to delete an item
  const deleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      const updatedItems = galleryItems.filter(item => item.id !== id);
      setGalleryItems(updatedItems);
      
      if (editingItem?.id === id) {
        setEditingItem(null);
      }
    }
  };

  // Function to add a new gallery item
  const addNewItem = () => {
    if (!validateForm()) return;
    
    if (!newItemImage) {
      setErrors({
        ...errors,
        image: 'Please upload an image'
      });
      return;
    }
    
    // In a real app, you'd upload the image to a storage service
    // and get back a URL to store in the database
    const newItem: GalleryItem = {
      id: Date.now().toString(), // Simple ID generation for demo
      title: newItemForm.title,
      description: newItemForm.description,
      tier: newItemForm.tier,
      imageUrl: newItemPreview, // In a real app, this would be the URL from your storage service
      createdAt: new Date(),
    };
    
    setGalleryItems([newItem, ...galleryItems]);
    setIsAddingNew(false);
    resetNewItemForm();
  };

  // Reset new item form
  const resetNewItemForm = () => {
    setNewItemForm({
      title: '',
      description: '',
      tier: 'Rare',
    });
    setNewItemImage(null);
    setNewItemPreview('');
    setErrors({});
  };

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!newItemForm.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!newItemForm.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (isAddingNew && !newItemImage && !newItemPreview) {
      newErrors.image = 'Please upload an image';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItemForm({
      ...newItemForm,
      [name]: value,
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  return (
    <div className="section pt-8">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl text-secondary-900 mb-2">Gallery Management</h1>
              <p className="text-neutral-600">
                Add, edit, and organize your nail art portfolio.
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setIsAddingNew(!isAddingNew);
                  if (isAddingNew) {
                    resetNewItemForm();
                  }
                  setEditingItem(null);
                }}
              >
                {isAddingNew ? (
                  <>Cancel</>
                ) : (
                  <>
                    <Plus size={18} className="mr-2" />
                    Add New Design
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Add New / Edit Form */}
          {(isAddingNew || editingItem) && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="card p-6 mb-8"
            >
              <h2 className="font-serif text-xl text-secondary-900 mb-6">
                {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-neutral-700 mb-1">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newItemForm.title}
                      onChange={handleInputChange}
                      className={`input ${errors.title ? 'border-red-500' : ''}`}
                      placeholder="Enter a title for this design"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="tier" className="block text-neutral-700 mb-1">Design Tier</label>
                    <select
                      id="tier"
                      name="tier"
                      value={newItemForm.tier}
                      onChange={handleInputChange}
                      className="input"
                    >
                      <option value="Artifact">Artifact</option>
                      <option value="Legendary">Legendary</option>
                      <option value="Epic">Epic</option>
                      <option value="Rare">Rare</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-neutral-700 mb-1">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={newItemForm.description}
                      onChange={handleInputChange}
                      className={`input min-h-[120px] ${errors.description ? 'border-red-500' : ''}`}
                      placeholder="Describe the design, techniques, materials used, etc."
                    ></textarea>
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-neutral-700 mb-1">Design Image</label>
                  
                  {newItemPreview ? (
                    <div className="relative mb-4">
                      <img 
                        src={newItemPreview} 
                        alt="Preview" 
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      {!editingItem && (
                        <button
                          type="button"
                          onClick={() => {
                            setNewItemImage(null);
                            setNewItemPreview('');
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
                          aria-label="Remove image"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div 
                      {...getRootProps()} 
                      className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer transition-colors mb-2 ${
                        errors.image ? 'border-red-500' : 'border-neutral-300 hover:border-primary-300'
                      }`}
                    >
                      <input {...getInputProps()} />
                      <Upload className="mx-auto text-neutral-400 mb-2" size={28} />
                      <p>Drag & drop an image here, or click to select</p>
                      <p className="text-sm text-neutral-500 mt-1">Max 5MB per file</p>
                    </div>
                  )}
                  
                  {errors.image && (
                    <p className="text-red-500 text-sm mb-4">{errors.image}</p>
                  )}
                  
                  <div className="mt-6">
                    {editingItem ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={saveEditedItem}
                          className="btn btn-primary"
                        >
                          <Save size={18} className="mr-2" />
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditing}
                          className="btn btn-outline"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={addNewItem}
                        className="btn btn-primary w-full"
                      >
                        Add to Gallery
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Gallery Grid */}
          <div className="card p-6">
            <div className="flex flex-wrap gap-4 mb-6 justify-between">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="text-neutral-400" size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search designs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10 w-full md:w-64"
                />
              </div>
              
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value as GalleryTier | 'All')}
                className="input"
              >
                <option value="All">All Tiers</option>
                <option value="Artifact">Artifact</option>
                <option value="Legendary">Legendary</option>
                <option value="Epic">Epic</option>
                <option value="Rare">Rare</option>
              </select>
            </div>
            
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="card overflow-hidden transition-all hover:shadow-lg"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-secondary-800">{item.title}</h3>
                        <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                          item.tier === 'Artifact' ? 'bg-accent-100 text-accent-800' :
                          item.tier === 'Legendary' ? 'bg-purple-100 text-purple-800' :
                          item.tier === 'Epic' ? 'bg-primary-100 text-primary-800' :
                          'bg-secondary-100 text-secondary-800'
                        }`}>
                          {item.tier}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 line-clamp-2 mb-4">{item.description}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditing(item)}
                          className="flex-1 py-1.5 flex justify-center items-center gap-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-md transition-colors"
                        >
                          <Edit size={16} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="flex-1 py-1.5 flex justify-center items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto flex items-center justify-center bg-neutral-100 rounded-full mb-4">
                  <Search className="text-neutral-400" size={24} />
                </div>
                <h3 className="text-xl font-medium text-secondary-800 mb-2">No designs found</h3>
                <p className="text-neutral-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminGallery;