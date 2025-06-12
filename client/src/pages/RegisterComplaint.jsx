import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Phone, MapPin, User, FileText, Send, Loader } from 'lucide-react';

const RegisterComplaint = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    location: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.location || !formData.description) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/api/complaint/registercomplaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      setSuccess(true);
      setFormData({ name: '', contact: '', location: '', description: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to submit complaint: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', contact: '', location: '', description: '' });
    setError(null);
    setSuccess(false);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div className="max-w-2xl mx-auto" initial={{ y: 40 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
        {/* Header */}
        <motion.div className="text-center mb-8" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Register Complaint</h1>
          <p className="text-gray-600">Submit your complaint and we'll help you find legal assistance</p>
        </motion.div>

        {/* Success Message */}
        {success && (
          <motion.div
            className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center space-x-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="text-green-800 font-medium">Complaint Submitted Successfully!</h3>
              <p className="text-green-700 text-sm">We'll get back to you soon.</p>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="h-6 w-6 text-red-600" />
            <div>
              <h3 className="text-red-800 font-medium">Error</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Fields */}
          {[
            { name: "name", label: "Full Name", icon: <User className="h-4 w-4 mr-2" />, type: "text", placeholder: "Enter your full name" },
            { name: "contact", label: "Contact Number", icon: <Phone className="h-4 w-4 mr-2" />, type: "tel", placeholder: "Enter your phone number" },
            { name: "location", label: "Location", icon: <MapPin className="h-4 w-4 mr-2" />, type: "text", placeholder: "Enter your city or area" }
          ].map(({ name, label, icon, type, placeholder }) => (
            <div key={name}>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                {icon} {label} *
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                disabled={loading}
              />
            </div>
          ))}

          {/* Description */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FileText className="h-4 w-4 mr-2" /> Complaint Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your complaint..."
              rows={5}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 resize-none"
              disabled={loading}
            />
          </div>

          {/* Submit + Reset */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:bg-red-400 flex items-center justify-center"
            >
              {loading ? <><Loader className="h-5 w-5 animate-spin mr-2" />Submitting...</> : <><Send className="h-5 w-5 mr-2" />Submit Complaint</>}
            </button>
            <button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className="sm:w-32 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50"
            >
              Reset
            </button>
          </div>

          {/* What Happens Next */}
          <motion.div className="mt-8 p-4 bg-gray-50 rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h3 className="text-sm font-medium text-gray-800 mb-2">What happens next?</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Your complaint will be reviewed by our legal team</li>
              <li>• We'll match you with suitable lawyers in your area</li>
              <li>• You’ll receive a response within 24–48 hours</li>
              <li>• All information is kept confidential</li>
            </ul>
          </motion.div>
        </motion.form>

        {/* Contact Info */}
        <motion.div className="text-center mt-8 text-gray-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <p className="text-sm">Need immediate assistance?</p>
          <p className="text-lg font-semibold text-red-600">+1-800-LEGAL-HELP</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RegisterComplaint;
