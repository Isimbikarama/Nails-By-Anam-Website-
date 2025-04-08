import React, { useEffect, useState } from 'react';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Map of service IDs to their names (if needed for fallback)
  const serviceIdToNameMap = {
 1: 'Gel-X Extensions',
 2: 'Natural Nail Manicure',
3: 'Acrylic Extensions',
 4: 'Nail Art - Simple',
   5: 'Nail Art - Complex',
 6: 'Removal',
   7: 'Gel Polish',
    8: 'French Tips'
    // Add all other services here
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/bookings'); // Update port to 5002
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Helper function to get service name
  const getServiceName = (serviceName) => {
    // Try to find the service by comparing with mapped names
    const serviceEntry = Object.entries(serviceIdToNameMap).find(([_, name]) => name === serviceName);
    return serviceEntry ? serviceIdToNameMap[serviceEntry[0]] : serviceName;
  };

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleDeleteAll = async () => {
    try {
      if (!window.confirm('Are you sure you want to delete all bookings?')) {
        return;
      }

      const response = await fetch('http://localhost:5002/api/bookings', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete bookings');
      }

      setBookings([]); // Clear bookings from state
      console.log('All bookings deleted successfully');
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete bookings: ' + err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-pink-800 mb-6 text-center">Bookings</h2>
      {error && <p className="text-red-500">{error}</p>}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="p-4 border border-pink-300 rounded-lg">
              <h3 className="text-lg font-bold">{booking.name}</h3>
              <p>Email: {booking.email}</p>
              <p>Phone: {booking.phone}</p>
              <p>Services: {Array.isArray(booking.services) 
                ? booking.services.map(getServiceName).join(', ')
                : getServiceName(booking.service)}</p>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              {booking.location && <p>Location: {booking.location}</p>}
              {booking.notes && <p>Notes: {booking.notes}</p>}
              {booking.image && (
                <img
                  src={`http://localhost:5002/${booking.image}`}
                  alt="Inspiration"
                  className="mt-2 max-h-48 rounded"
                />
              )}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleDeleteAll}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete All Bookings
      </button>
    </div>
  );
};

export default BookingList;


