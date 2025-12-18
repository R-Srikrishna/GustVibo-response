import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    number: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    number: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  /**
   * Validates email format
   */
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  /**
   * Validates password strength
   */
  const validatePassword = (password) => {
    // At least 8 characters, contains letters and numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  /**
   * Validates phone number (10 digits, no leading zero)
   */
  const validateNumber = (num) => {
    const numberRegex = /^[1-9][0-9]{9}$/;
    return numberRegex.test(num);
  };

  /**
   * Validates name (at least 3 characters)
   */
  const validateName = (name) => {
    return name.trim().length >= 3;
  };

  /**
   * Handles input changes and clears errors
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Only allow digits for phone number
    if (name === 'number') {
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
      password: '',
      number: '',
    };
    let isValid = true;

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 3 characters.';
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

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters and contain both letters and numbers.';
      isValid = false;
    }

    // Validate phone number
    if (!formData.number) {
      newErrors.number = 'Phone number is required.';
      isValid = false;
    } else if (!validateNumber(formData.number)) {
      newErrors.number = 'Phone number must be exactly 10 digits and cannot start with 0.';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    // Check if email already exists
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const emailExists = users.some((u) => u.email === formData.email);

      if (emailExists) {
        setErrors({
          ...newErrors,
          email: 'This email is already registered. Please use a different email.',
        });
        setIsSubmitting(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        number: formData.number,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Show success message and navigate
      navigate('/login', { 
        state: { message: 'Account created successfully! Please login.' } 
      });
    } catch (error) {
      setErrors({
        ...newErrors,
        email: 'An error occurred. Please try again.',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create Account</h2>
        <p className="signup-subtitle">Join us and start your journey</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
              disabled={isSubmitting}
            />
            {errors.name && (
              <span className="error-message">
                <span className="error-icon">⚠</span> {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className="error-message">
                <span className="error-icon">⚠</span> {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              disabled={isSubmitting}
            />
            {errors.password && (
              <span className="error-message">
                <span className="error-icon">⚠</span> {errors.password}
              </span>
            )}
            {!errors.password && formData.password && (
              <span className="password-hint">
                Must be at least 8 characters with letters and numbers
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="number">Phone Number</label>
            <input
              type="tel"
              id="number"
              name="number"
              placeholder="Enter 10-digit phone number"
              value={formData.number}
              onChange={handleChange}
              className={errors.number ? 'input-error' : ''}
              maxLength="10"
              disabled={isSubmitting}
            />
            {errors.number && (
              <span className="error-message">
                <span className="error-icon">⚠</span> {errors.number}
              </span>
            )}
          </div>

          <button 
            type="submit" 
            className="signup-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="login-link-text">
          Already have an account?{' '}
          <Link to="/login" className="link-text">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
