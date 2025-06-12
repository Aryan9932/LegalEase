import React, { useState } from 'react';
import {
  Save,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  FileText,
  Briefcase
} from 'lucide-react';

const AddLawyer = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    contactNumber: '',
    yearsOfExperience: '',
    location: '',
    licenseNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const specializations = [
    'Criminal Defense',
    'Family Law',
    'Personal Injury',
    'Business Law',
    'Real Estate',
    'Employment Law',
    'Immigration Law',
    'Tax Law',
    'Intellectual Property',
    'Civil Litigation',
    'Corporate Law',
    'Contract Law',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.specialization.trim()) {
      newErrors.specialization = 'Specialization is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!phoneRegex.test(formData.contactNumber.replace(/\s+/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid contact number';
    }

    if (!formData.yearsOfExperience) {
      newErrors.yearsOfExperience = 'Years of experience is required';
    } else if (formData.yearsOfExperience < 0) {
      newErrors.yearsOfExperience = 'Years of experience cannot be negative';
    } else if (formData.yearsOfExperience > 70) {
      newErrors.yearsOfExperience = 'Years of experience seems too high';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'License number is required';
    } else if (formData.licenseNumber.trim().length < 3) {
      newErrors.licenseNumber = 'License number must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/lawyers/addlawyer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          email: formData.email.toLowerCase().trim(),
          name: formData.name.trim(),
          specialization: formData.specialization.trim(),
          contactNumber: formData.contactNumber.trim(),
          location: formData.location.trim(),
          licenseNumber: formData.licenseNumber.trim(),
          yearsOfExperience: parseInt(formData.yearsOfExperience)
        })
      });

      if (response.ok) {
        alert('Lawyer added successfully!');
        setFormData({
          name: '',
          specialization: '',
          email: '',
          contactNumber: '',
          yearsOfExperience: '',
          location: '',
          licenseNumber: ''
        });
      } else {
        const errorData = await response.json();
        if (errorData.message.includes('email')) {
          setErrors({ email: 'Email already exists' });
        } else if (errorData.message.includes('license')) {
          setErrors({ licenseNumber: 'License number already exists' });
        } else {
          setErrors({ general: 'Failed to add lawyer. Please try again.' });
        }
      }
    } catch (error) {
      console.error('Error adding lawyer:', error);
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C7D0FF] via-[#E8EEFF] to-[#F0F4FF] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={() => window.history.back()}
              className="absolute left-0 p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-4xl font-bold text-gray-800">Add New Lawyer</h1>
          </div>
          <p className="text-lg text-gray-600">
            Fill in the details below to add a new lawyer to the directory
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <InputField
              icon={<User />}
              label="Full Name"
              name="name"
              type="text"
              placeholder="Enter lawyer's full name"
              value={formData.name}
              error={errors.name}
              onChange={handleInputChange}
            />

            {/* Specialization */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 mr-2" />
                Specialization *
              </label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#4F46E5] outline-none transition-all duration-200 ${
                  errors.specialization ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select specialization</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              {errors.specialization && <p className="mt-1 text-sm text-red-600">{errors.specialization}</p>}
            </div>

            {/* Email */}
            <InputField
              icon={<Mail />}
              label="Email Address"
              name="email"
              type="email"
              placeholder="lawyer@example.com"
              value={formData.email}
              error={errors.email}
              onChange={handleInputChange}
            />

            {/* Contact Number */}
            <InputField
              icon={<Phone />}
              label="Contact Number"
              name="contactNumber"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.contactNumber}
              error={errors.contactNumber}
              onChange={handleInputChange}
            />

            {/* Years of Experience */}
            <InputField
              icon={<Award />}
              label="Years of Experience"
              name="yearsOfExperience"
              type="number"
              placeholder="Enter years of experience"
              value={formData.yearsOfExperience}
              error={errors.yearsOfExperience}
              onChange={handleInputChange}
            />

            {/* Location */}
            <InputField
              icon={<MapPin />}
              label="Location"
              name="location"
              type="text"
              placeholder="City, State/Province, Country"
              value={formData.location}
              error={errors.location}
              onChange={handleInputChange}
            />

            {/* License Number */}
            <InputField
              icon={<FileText />}
              label="License Number"
              name="licenseNumber"
              type="text"
              placeholder="Enter license number"
              value={formData.licenseNumber}
              error={errors.licenseNumber}
              onChange={handleInputChange}
            />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#4F46E5] text-white py-3 px-6 rounded-lg hover:bg-[#4338CA] transition-colors duration-200 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Add Lawyer
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Extracted InputField component for reusability
const InputField = ({ icon, label, name, type, placeholder, value, onChange, error }) => (
  <div>
    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
      {React.cloneElement(icon, { className: 'w-4 h-4 mr-2' })}
      {label} *
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#4F46E5] outline-none transition-all duration-200 ${
        error ? 'border-red-300 bg-red-50' : 'border-gray-300'
      }`}
      placeholder={placeholder}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default AddLawyer;
