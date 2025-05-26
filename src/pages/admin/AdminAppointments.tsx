import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Filter, CheckCircle, XCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { BookingRequest, BookingStatus } from '../../types';

// Sample data for the appointments
const sampleAppointments: BookingRequest[] = [
  { 
    id: '1', 
    clientName: 'Emma Johnson', 
    email: 'emma@example.com', 
    phone: '123-456-7890',
    serviceTier: 'Legendary', 
    nailShape: 'Almond', 
    nailLength: 'Medium',
    preferredDate: new Date('2025-04-20'), 
    preferredTime: '10:00',
    inspirationPhotos: [],
    status: 'Approved',
    notes: 'Would like something with crystals',
    createdAt: new Date('2025-04-01'),
  },
  { 
    id: '2', 
    clientName: 'Sophia Chen', 
    email: 'sophia@example.com', 
    phone: '123-456-7891',
    serviceTier: 'Artifact', 
    nailShape: 'Stiletto', 
    nailLength: 'Long',
    preferredDate: new Date('2025-04-22'), 
    preferredTime: '14:30',
    inspirationPhotos: ['https://example.com/photo1.jpg'],
    status: 'Pending',
    notes: 'Inspired by cherry blossoms',
    createdAt: new Date('2025-04-05'),
  },
  { 
    id: '3', 
    clientName: 'Olivia Taylor', 
    email: 'olivia@example.com', 
    phone: '123-456-7892',
    serviceTier: 'Epic', 
    nailShape: 'Coffin', 
    nailLength: 'XL',
    preferredDate: new Date('2025-04-23'), 
    preferredTime: '11:15',
    inspirationPhotos: [],
    status: 'Approved',
    notes: 'Geometric design with gold accents',
    createdAt: new Date('2025-04-07'),
  },
  { 
    id: '4', 
    clientName: 'Isabella Martinez', 
    email: 'isabella@example.com', 
    phone: '123-456-7893',
    serviceTier: 'Rare', 
    nailShape: 'Round', 
    nailLength: 'Short',
    preferredDate: new Date('2025-04-25'), 
    preferredTime: '15:00',
    inspirationPhotos: ['https://example.com/photo2.jpg', 'https://example.com/photo3.jpg'],
    status: 'Pending',
    notes: 'Simple, elegant design for a wedding',
    createdAt: new Date('2025-04-10'),
  },
  { 
    id: '5', 
    clientName: 'Amelia Wilson', 
    email: 'amelia@example.com', 
    phone: '123-456-7894',
    serviceTier: 'Legendary', 
    nailShape: 'Almond', 
    nailLength: 'Long',
    preferredDate: new Date('2025-04-27'), 
    preferredTime: '12:00',
    inspirationPhotos: [],
    status: 'Rejected',
    notes: 'Rescheduled for the following week',
    createdAt: new Date('2025-04-12'),
  },
  { 
    id: '6', 
    clientName: 'Charlotte Brown', 
    email: 'charlotte@example.com', 
    phone: '123-456-7895',
    serviceTier: 'Epic', 
    nailShape: 'Square', 
    nailLength: 'Medium',
    preferredDate: new Date('2025-04-28'), 
    preferredTime: '16:30',
    inspirationPhotos: ['https://example.com/photo4.jpg'],
    status: 'Completed',
    notes: 'Ombre design with matte finish',
    createdAt: new Date('2025-04-15'),
  },
];

function AdminAppointments() {
  const [appointments, setAppointments] = useState<BookingRequest[]>(sampleAppointments);
  const [filteredAppointments, setFilteredAppointments] = useState<BookingRequest[]>(sampleAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState<BookingRequest | null>(null);
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  useEffect(() => {
    document.title = 'Appointments | Admin Dashboard';
  }, []);

  // Filter appointments based on status and search term
  useEffect(() => {
    let filtered = appointments;
    
    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(appointment => appointment.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(appointment => 
        appointment.clientName.toLowerCase().includes(term) ||
        appointment.email.toLowerCase().includes(term) ||
        appointment.phone.includes(term)
      );
    }
    
    setFilteredAppointments(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [statusFilter, searchTerm, appointments]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  // Status color mapping
  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  // Status icon mapping
  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'Pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'Rejected':
        return <XCircle size={16} className="text-red-500" />;
      case 'Completed':
        return <CheckCircle size={16} className="text-blue-500" />;
      default:
        return null;
    }
  };

  // Function to update appointment status
  const updateAppointmentStatus = (id: string, newStatus: BookingStatus) => {
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: newStatus } : appointment
    );
    setAppointments(updatedAppointments);
    
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, status: newStatus });
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
              <h1 className="font-serif text-2xl md:text-3xl text-secondary-900 mb-2">Appointment Management</h1>
              <p className="text-neutral-600">
                View and manage all appointment requests.
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <button className="btn btn-primary">
                <Calendar size={18} className="mr-2" />
                New Appointment
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="card p-6">
                <div className="flex flex-wrap gap-4 mb-6 justify-between">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="text-neutral-400" size={18} />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by name, email or phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input pl-10 w-full md:w-64"
                    />
                  </div>
                  
                  <div className="flex gap-2 items-center">
                    <Filter size={18} className="text-neutral-500" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as BookingStatus | 'All')}
                      className="input"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="text-left py-3 px-4 text-neutral-600 font-semibold">Client</th>
                        <th className="text-left py-3 px-4 text-neutral-600 font-semibold">Date & Time</th>
                        <th className="text-left py-3 px-4 text-neutral-600 font-semibold">Service</th>
                        <th className="text-left py-3 px-4 text-neutral-600 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? (
                        currentItems.map((appointment) => (
                          <tr 
                            key={appointment.id} 
                            className={`border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer ${
                              selectedAppointment?.id === appointment.id ? 'bg-primary-50' : ''
                            }`}
                            onClick={() => setSelectedAppointment(appointment)}
                          >
                            <td className="py-3 px-4">
                              <div className="font-medium text-secondary-800">{appointment.clientName}</div>
                              <div className="text-sm text-neutral-500">{appointment.email}</div>
                            </td>
                            <td className="py-3 px-4 text-neutral-600">
                              {appointment.preferredDate.toLocaleDateString('en-US', { 
                                month: 'short', day: 'numeric', year: 'numeric' 
                              })}
                              <br />
                              <span className="text-sm text-neutral-500">{appointment.preferredTime}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-block px-2 py-1 bg-secondary-100 text-secondary-800 text-xs rounded-full">
                                {appointment.serviceTier}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                                {getStatusIcon(appointment.status)}
                                <span className="ml-1">{appointment.status}</span>
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-neutral-500">
                            No appointments found matching your criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                {filteredAppointments.length > itemsPerPage && (
                  <div className="flex justify-between items-center mt-6">
                    <div className="text-sm text-neutral-500">
                      Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredAppointments.length)} of {filteredAppointments.length}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`p-2 rounded border ${
                          currentPage === 1 
                            ? 'border-neutral-200 text-neutral-400 cursor-not-allowed' 
                            : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                        }`}
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded border ${
                          currentPage === totalPages 
                            ? 'border-neutral-200 text-neutral-400 cursor-not-allowed' 
                            : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                        }`}
                        aria-label="Next page"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              {selectedAppointment ? (
                <div className="card p-6 sticky top-24">
                  <h2 className="font-serif text-xl text-secondary-900 mb-4">Appointment Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm text-neutral-500 font-medium">Client Information</h3>
                      <p className="font-medium text-secondary-800">{selectedAppointment.clientName}</p>
                      <p className="text-neutral-600">{selectedAppointment.email}</p>
                      <p className="text-neutral-600">{selectedAppointment.phone}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm text-neutral-500 font-medium">Appointment</h3>
                      <p className="text-neutral-700">
                        <span className="font-medium">Date: </span>
                        {selectedAppointment.preferredDate.toLocaleDateString('en-US', { 
                          weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
                        })}
                      </p>
                      <p className="text-neutral-700">
                        <span className="font-medium">Time: </span>
                        {selectedAppointment.preferredTime}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm text-neutral-500 font-medium">Service Details</h3>
                      <p className="text-neutral-700">
                        <span className="font-medium">Tier: </span>
                        {selectedAppointment.serviceTier}
                      </p>
                      <p className="text-neutral-700">
                        <span className="font-medium">Nail Shape: </span>
                        {selectedAppointment.nailShape}
                      </p>
                      <p className="text-neutral-700">
                        <span className="font-medium">Nail Length: </span>
                        {selectedAppointment.nailLength}
                      </p>
                    </div>
                    
                    {selectedAppointment.notes && (
                      <div>
                        <h3 className="text-sm text-neutral-500 font-medium">Notes</h3>
                        <p className="text-neutral-700 bg-neutral-50 p-3 rounded">{selectedAppointment.notes}</p>
                      </div>
                    )}
                    
                    {selectedAppointment.inspirationPhotos.length > 0 && (
                      <div>
                        <h3 className="text-sm text-neutral-500 font-medium">Inspiration Photos</h3>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {selectedAppointment.inspirationPhotos.map((photo, index) => (
                            <div key={index} className="aspect-square bg-neutral-100 rounded overflow-hidden">
                              <img src={photo} alt={`Inspiration ${index + 1}`} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-sm text-neutral-500 font-medium">Status</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <button
                          onClick={() => updateAppointmentStatus(selectedAppointment.id, 'Approved')}
                          className={`px-3 py-1.5 rounded text-sm font-medium ${
                            selectedAppointment.status === 'Approved' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateAppointmentStatus(selectedAppointment.id, 'Rejected')}
                          className={`px-3 py-1.5 rounded text-sm font-medium ${
                            selectedAppointment.status === 'Rejected' 
                              ? 'bg-red-500 text-white' 
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => updateAppointmentStatus(selectedAppointment.id, 'Completed')}
                          className={`px-3 py-1.5 rounded text-sm font-medium ${
                            selectedAppointment.status === 'Completed' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          }`}
                        >
                          Mark Completed
                        </button>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-neutral-200">
                      <button className="btn btn-primary w-full">
                        Contact Client
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card p-6 text-center">
                  <div className="py-8">
                    <Calendar className="mx-auto text-neutral-400 mb-4" size={48} />
                    <h3 className="font-serif text-xl text-secondary-900 mb-2">No Appointment Selected</h3>
                    <p className="text-neutral-600">
                      Select an appointment from the list to view details.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminAppointments;