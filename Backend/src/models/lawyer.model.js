import mongoose from 'mongoose';

const lawyerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  specialization: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  contactNumber: { type: String, required: true, trim: true },
  yearsOfExperience: { type: Number, required: true, min: 0 },
  location: { type: String, required: true, trim: true },
  licenseNumber: { type: String, required: true, unique: true, trim: true }
});

const Lawyer = mongoose.model('Lawyer', lawyerSchema);

export default Lawyer;
