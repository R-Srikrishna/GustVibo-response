import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookTable.css';

const BookTable = () => {
  const [tables, setTables] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  /**
   * Loads table statuses from localStorage
   */
  useEffect(() => {
    loadTableStatuses();
  }, []);

  /**
   * Loads and updates table statuses based on bookings
   */
  const loadTableStatuses = () => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
    
    // Create 30 tables with their booking status
    const tablesData = Array.from({ length: 30 }, (_, i) => {
      const tableId = i + 1;
      const booking = confirmedBookings.find(b => b.tableId === tableId);
      
      return {
        id: tableId,
        status: booking ? 'booked' : 'available',
        booking: booking || null,
      };
    });
    
    setTables(tablesData);
  };

  /**
   * Handles table click with validation
   */
  const handleTableClick = (table) => {
    setErrorMessage('');

    // Check if table is already booked
    if (table.status === 'booked') {
      setErrorMessage(`Table ${table.id} is already booked. Please select another table.`);
      setTimeout(() => setErrorMessage(''), 4000);
      return;
    }

    // Check if user is logged in and get their email
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (userData && userData.email) {
      // Check if this email already has a booking
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const existingBooking = bookings.find(
        (b) => b.email === userData.email && b.status === 'confirmed'
      );

      if (existingBooking) {
        setErrorMessage(`This email (${userData.email}) already has a booking for Table ${existingBooking.tableId}. Please use a different email or cancel your existing booking.`);
        setTimeout(() => setErrorMessage(''), 5000);
        return;
      }
    }

    // Navigate to booking form
    navigate(`/userdetails/${table.id}`);
  };

  return (
    <div className="bookTable">
      <h2>Book a Table</h2>
      <p className="booking-instructions">
        Click on an available table to make a reservation
      </p>
      
      {errorMessage && (
        <div className="error-alert">
          <span className="error-icon">⚠</span>
          {errorMessage}
        </div>
      )}

      <div className="table-legend">
        <div className="legend-item">
          <div className="legend-color available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-color booked"></div>
          <span>Booked</span>
        </div>
      </div>

      <div className="tables__grid">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`table ${table.status}`}
            onClick={() => handleTableClick(table)}
            title={table.status === 'booked' ? `Table ${table.id} - Already Booked` : `Table ${table.id} - Click to Book`}
          >
            <div className="table-number">Table {table.id}</div>
            {table.status === 'booked' && (
              <div className="table-status-badge">Booked</div>
            )}
            {table.status === 'available' && (
              <div className="table-status-badge available-badge">Available</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookTable;
