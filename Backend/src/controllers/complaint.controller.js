import Complaint from '../models/complaint.model.js';

export const registerComplaint = async (req, res) => {
  try {
    const { name, contact, location, description } = req.body;

    if (!name || !contact || !location || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newComplaint = new Complaint({ name, contact, location, description });
    await newComplaint.save();

    res.status(201).json({ message: 'Complaint registered successfully', complaint: newComplaint });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ date: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
};
