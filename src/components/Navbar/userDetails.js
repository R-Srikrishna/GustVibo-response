import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './userDetails.css';

const UserDetails = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Auto-fill form with logged-in user data
   */

  /**
 * Checks if the table is still available
 */
const checkTableAvailability = () => {
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const existingBooking = bookings.find(
    (b) => b.tableId === parseInt(tableId) && b.status === 'confirmed'
  );

  if (existingBooking) {
    setErrors({
      name: '',
      email: `Table ${tableId} is already booked. Please select another table.`,
      phone: '',
    });
    setTimeout(() => {
      navigate('/BookTable');
    }, 3000);
  }
};

/**
 * Auto-fill form with logged-in user data
 */
useEffect(() => {
  const userData = JSON.parse(localStorage.getItem('user') || 'null');
  if (userData) {
    setFormData({
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.number || '',
    });
  }

  checkTableAvailability();
}, [checkTableAvailability]);


  /**
   * Validates email format
   */
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  /**
   * Validates phone number (10 digits, no leading zero)
   */
  const validatePhone = (phone) => {
    const phoneRegex = /^[1-9][0-9]{9}$/;
    return phoneRegex.test(phone);
  };

  /**
   * Validates name (at least 2 characters)
   */
  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  /**
   * Handles input changes and clears errors
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Only allow digits for phone number
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 10) {
        setFormData((prev) => ({
          ...prev,
          [name]: digitsOnly,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Handles form submission with comprehensive validation
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = {
      name: '',
      email: '',
      phone: '',
    };
    let isValid = true;

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 2 characters.';
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    // Validate phone
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
      isValid = false;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits and cannot start with 0.';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    // Save booking details to localStorage
    try {
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      
      // Check if table is already booked
      const tableBooking = bookings.find(
        (b) => b.tableId === parseInt(tableId) && b.status === 'confirmed'
      );

      if (tableBooking) {
        setErrors({
          ...newErrors,
          email: `Table ${tableId} is already booked. Please select another table.`,
        });
        setIsSubmitting(false);
        setTimeout(() => {
          navigate('/BookTable');
        }, 3000);
        return;
      }

      // Check if email already has a booking
      const emailBooking = bookings.find(
        (b) => b.email === formData.email.trim() && b.status === 'confirmed'
      );

      if (emailBooking) {
        setErrors({
          ...newErrors,
          email: `This email (${formData.email.trim()}) already has a booking for Table ${emailBooking.tableId}. Please use a different email or cancel your existing booking.`,
        });
        setIsSubmitting(false);
        return;
      }

      // Check if phone number already has a booking
      const phoneBooking = bookings.find(
        (b) => b.phone === formData.phone && b.status === 'confirmed'
      );

      if (phoneBooking) {
        setErrors({
          ...newErrors,
          phone: `This phone number already has a booking for Table ${phoneBooking.tableId}. Please use a different phone number.`,
        });
        setIsSubmitting(false);
        return;
      }

      // Create booking
      const bookingDetails = {
        tableId: parseInt(tableId),
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone,
        status: 'confirmed',
        bookedAt: new Date().toISOString(),
      };

      // Add new booking
      bookings.push(bookingDetails);
      localStorage.setItem('bookings', JSON.stringify(bookings));

      // Also save individual table booking
      localStorage.setItem(`table_${tableId}`, JSON.stringify(bookingDetails));

      // Mark as successfully booked
      localStorage.setItem('successfullyBooked', 'true');

      setIsBooked(true);
      setFormData({ name: '', email: '', phone: '' });
      setErrors({ name: '', email: '', phone: '' });

      // Navigate to home after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setErrors({
        ...newErrors,
        email: 'An error occurred. Please try again.',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="userdetails">
      {isBooked ? (
        <div className="confirmation-message">
          <div className="success-icon">✓</div>
          <h2>Table {tableId} Successfully Booked!</h2>
          <p>Your reservation has been confirmed.</p>
          <p className="confirmation-details">
            We'll send a confirmation email to your registered email address.
          </p>
          <p className="redirect-message">Redirecting to home page...</p>
        </div>
      ) : (
        <div className="booking-form-container">
          <h2>Complete Your Booking</h2>
          <p className="booking-subtitle">Table {tableId} - Please enter your details</p>

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'input-error' : ''}
                disabled={isSubmitting}
                required
              />
              {errors.name && (
                <span className="error-message">
                  <span className="error-icon">⚠</span> {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
                disabled={isSubmitting}
                required
              />
              {errors.email && (
                <span className="error-message">
                  <span className="error-icon">⚠</span> {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter 10-digit phone number"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'input-error' : ''}
                maxLength="10"
                disabled={isSubmitting}
                required
              />
              {errors.phone && (
                <span className="error-message">
                  <span className="error-icon">⚠</span> {errors.phone}
                </span>
              )}
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Confirming Booking...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
