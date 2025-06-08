import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Image, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import supabase from '../../utils/Supabase';
import { AppointmentModel } from '../../models/Models';

// Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  // Status icon mapping
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'cancelled':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

const OrderDetails = ({appointment, callback}: {appointment: AppointmentModel, callback: React.Dispatch<React.SetStateAction<AppointmentModel | undefined>>}) => {
  appointment.appointment_datetime_slot = new Date(appointment.appointment_datetime_slot);

  const handleAppointmentStatusChange = async (id: string, status: string) => {
    const {data, error} = await supabase.from("appointments")
                                  .update({status: status})
                                  .eq("id", id)
                                  .select();
    if(error)
      console.log("Unable to fetch appointments: ", error);

    console.log("Data Updated:", data);
    if(data != undefined)
      callback(data[0]);    
  }

  return (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}>
        <h3 className="font-serif text-2xl text-foreground mb-6">Order Details</h3>
        
        <div className="text-neutral-800 dark:text-neutral-200 mb-1 flex justify-center">
          <span className={`w-full inline-flex justify-center items-center px-2 py-2 rounded-md text-md ${getStatusColor(appointment.status)}`}>
            {getStatusIcon(appointment.status)} <span className="mx-2 first-letter:uppercase">{appointment.status}</span>
          </span>
        </div>

        <div>
          <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Full Name</label>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{appointment.name}</p>

          <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Email</label>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{appointment.email}</p>

          <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Phone number</label>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{appointment.phone}</p>
        </div>

        <div>
          <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Service Tier</label>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{appointment.service_tier}</p>

          <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Nail Shape</label>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{appointment.nail_shape}</p>

          <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Nail Length</label>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{appointment.nail_length}</p>
        </div>

        <div>
          <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Date and Time</label>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{appointment.appointment_datetime_slot.toLocaleDateString()} at {appointment.appointment_datetime_slot.toLocaleTimeString()}</p>
        </div>

        <div>
          {
            appointment.inspiration_photos.length > 0 && (
            <div>
              <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Inspiration Photos</label>
              <div className="mt-4 grid grid-cols-3 gap-3 mb-3">
                {appointment.inspiration_photos.map((link, index) => (
                  <div key={index} className="relative">
                    <img
                      src={link as string}
                      alt={`Inspiration ${index + 1}`}
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {
            appointment.notes!="" && (
              <div>
                <label className="block text-neutral-800 dark:text-neutral-200 mb-1">Additional Notes</label>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{appointment.notes}</p>
              </div>
          )}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => {handleAppointmentStatusChange(appointment.id as string, "cancelled");}}
            className="btn bg-red-700 hover:bg-red-600 text-white">
            Reject
          </button>
          <button
            type="button"
            onClick={() => {handleAppointmentStatusChange(appointment.id as string, "pending");}}
            className="btn bg-yellow-500 hover:bg-yellow-400 text-white">
            Move to Pending
          </button>
          <button
            type="submit"
            onClick={() => {handleAppointmentStatusChange(appointment.id as string, "confirmed");}}
            className="btn bg-green-600 hover:bg-green-500 text-white">
            Accept
          </button>
        </div>
      </motion.div>
  );
}

function AdminDashboard() {
  const { currentUser } = useAuth();
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [recentAppointments, setRecentAppointments] = useState<AppointmentModel[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentModel>();
  
  // Sample data for the dashboard
  const stats = [
    { label: 'Pending Appointments', value: 12, icon: <Clock className="text-primary-500" />, link: '/admin/appointments' },
    { label: 'New Inquiries', value: 5, icon: <AlertCircle className="text-yellow-500" />, link: '/admin/inquiries' },
    { label: 'Gallery Items', value: 24, icon: <Image className="text-secondary-500" />, link: '/admin/gallery' },
    { label: 'Total Clients', value: 148, icon: <Users className="text-accent-500" />, link: '/admin/clients' },
  ];

  // const recentAppointments = [
  //   { id: 1, name: 'Emma Johnson', date: '2025-04-20', time: '10:00 AM', service: 'Legendary', status: 'Confirmed' },
  //   { id: 2, name: 'Sophia Chen', date: '2025-04-22', time: '2:30 PM', service: 'Artifact', status: 'Pending' },
  //   { id: 3, name: 'Olivia Taylor', date: '2025-04-23', time: '11:15 AM', service: 'Epic', status: 'Confirmed' },
  //   { id: 4, name: 'Isabella Martinez', date: '2025-04-25', time: '3:00 PM', service: 'Rare', status: 'Pending' },
  // ];

  const handleAppointmentClick = (id: string) => {
    setSelectedAppointment(recentAppointments.filter(appointment => appointment.id == id)[0] as never as AppointmentModel);
  }

  // console.log("selected:", selectedAppointment);

  useEffect(() => {
    document.title = 'Admin Dashboard | Klawed by Kizko';

    const fetchBookedAppointments = async () => {
      const today = new Date();
      const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);

      const maxDate = new Date(today);
      maxDate.setDate(maxDate.getDate() + 3);
      maxDate.setHours(23, 59, 59, 999);

      const {data, error} = await supabase.from("appointments")
                                          .select()
                                          .gte('appointment_datetime_slot', minDate.toISOString()) 
                                          .lte('appointment_datetime_slot', maxDate.toISOString())
                                          .order('appointment_datetime_slot', { ascending: true });;
      if(error){
        console.log("Unable to fetch appointments: ", error);
        setErrors({...errors, "supabase_error": error.message});
        return;
      }

      console.log("Data: ",data);

      // const appointments: AppointmentModel[] = data.map(item => {
      //   const appointment: AppointmentModel = {

      //   };

      //   return appointment;
      // });

      setRecentAppointments(data);
    }
    const fetchInquiries = async () => {}
    const fetchNewsletters = async () => {}

    fetchBookedAppointments();
    fetchInquiries();
    fetchNewsletters();
  }, [errors, selectedAppointment]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="section pt-8">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl text-secondary-900 mb-2">Welcome, {currentUser?.email.split('@')[0]}</h1>
            <p className="text-neutral-600">
              Here's what's happening with your business today.
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Link to="/admin/appointments" className="btn btn-primary">
              <Calendar size={18} className="mr-2" />
              View Appointments
            </Link>
          </div>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                  {stat.icon}
                </div>
                <span className="text-3xl font-semibold text-secondary-900">{stat.value}</span>
              </div>
              <h3 className="text-neutral-600 font-medium">{stat.label}</h3>
              <Link to={stat.link} className="text-sm text-primary-600 hover:underline mt-2 inline-block">
                View details
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl text-secondary-900">Upcoming Appointments</h2>
                <Link to="/admin/appointments" className="text-sm text-primary-600 hover:underline">
                  View all
                </Link>
              </div>
              
              <div className="overflow-scroll">
                <table className="w-[100vw] overflow-scroll">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-center py-3 px-4 text-neutral-600 font-semibold">No</th>
                      <th className="text-start py-3 px-4 text-neutral-600 font-semibold">Client</th>
                      {/* <th className="text-center py-3 px-4 text-neutral-600 font-semibold">Date & Time</th> */}
                      {/* <th className="text-center py-3 px-4 text-neutral-600 font-semibold">Duration</th> */}
                      {/* <th className="text-center py-3 px-4 text-neutral-600 font-semibold">Phone</th> */}
                      <th className="text-center py-3 px-4 text-neutral-600 font-semibold">Service</th>
                      <th className="text-center py-3 px-4 text-neutral-600 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAppointments.map((appointment, index) => (
                      <tr key={appointment.id} className="border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer" onClick={() => {handleAppointmentClick(appointment.id!)}}>
                        <td className="py-3 px-4 text-neutral-600 text-center font-medium">
                          {index+1}
                        </td>
                        <td className="py-3 px-4 text-neutral-600 text-start font-medium">
                          {appointment.name}
                          <p className='text-neutral-500'>{appointment.email}</p>
                          <span className="text-sm text-neutral-500">
                            {new Date((appointment.appointment_datetime_slot)).toLocaleDateString('en-US', { 
                              month: 'short', day: 'numeric', year: 'numeric' 
                            })}
                          </span>
                          <span className="text-sm text-neutral-500"> at {new Date((appointment.appointment_datetime_slot)).toLocaleTimeString()}</span>
                        </td>
                        {/* <td className="py-3 px-4 text-neutral-600 text-center">
                          {new Date((appointment.appointment_datetime_slot)).toLocaleDateString('en-US', { 
                            month: 'short', day: 'numeric', year: 'numeric' 
                          })}
                          <br />
                          <span className="text-sm text-neutral-500">at {new Date((appointment.appointment_datetime_slot)).toLocaleTimeString()}</span>
                        </td> */}
                        {/* <td className="py-3 px-4 text-neutral-500 font-md text-center">
                          {appointment.duration} mins.
                        </td> */}
                        {/* <td className="py-3 px-4 text-neutral-500 font-md text-center">
                          {appointment.phone}
                        </td> */}
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-2 py-1 bg-secondary-100 text-secondary-800 text-xs rounded-full">
                            {appointment.service_tier}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-flex items-center px-2 py-2 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                            {getStatusIcon(appointment.status)}
                            <span className="ml-1 first-letter:uppercase">{appointment.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
          
          {selectedAppointment!=undefined && 
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
                <div className="card p-6">
                  <OrderDetails appointment={selectedAppointment} callback={setSelectedAppointment}/>
                </div> 
            </motion.div>
          }

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="card p-6">
              <h2 className="font-serif text-xl text-secondary-900 mb-6">Quick Actions</h2>
              
              <div className="space-y-3">
                <Link to="/admin/appointments/new" className="flex items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                  <Calendar className="text-primary-600 mr-3" size={20} />
                  <span className="text-primary-800 font-medium">Create Appointment</span>
                </Link>
                
                <Link to="/admin/gallery/new" className="flex items-center p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
                  <Image className="text-secondary-600 mr-3" size={20} />
                  <span className="text-secondary-800 font-medium">Add Gallery Item</span>
                </Link>
                
                <Link to="/admin/settings" className="flex items-center p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                  <Users className="text-neutral-600 mr-3" size={20} />
                  <span className="text-neutral-800 font-medium">Manage Profile</span>
                </Link>
              </div>
              
              <div className="mt-6 p-4 bg-accent-50 rounded-lg">
                <h3 className="font-medium text-accent-800 mb-2">Tip of the Day</h3>
                <p className="text-sm text-accent-700">
                  Remember to follow up with clients after their appointments to get feedback 
                  and encourage them to share photos of their nail art on social media.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;