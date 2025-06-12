import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now
  }
});

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
