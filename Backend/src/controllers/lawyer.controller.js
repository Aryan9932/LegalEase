import Lawyer from '../models/lawyer.model.js';

export const addLawyer = async (req, res) => {
  try {
    const {
      name,
      specialization,
      email,
      contactNumber,
      yearsOfExperience,
      location,
      licenseNumber
    } = req.body;

    if (
      !name ||
      !specialization ||
      !email ||
      !contactNumber ||
      yearsOfExperience == null ||
      !location ||
      !licenseNumber
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingLawyer = await Lawyer.findOne({
      $or: [{ email }, { licenseNumber }]
    });

    if (existingLawyer) {
      return res.status(400).json({ error: "Lawyer with this email or license number already exists." });
    }

    const newLawyer = new Lawyer({
      name: name.trim(),
      specialization: specialization.trim(),
      email: email.toLowerCase().trim(),
      contactNumber: contactNumber.trim(),
      yearsOfExperience,
      location: location.trim(),
      licenseNumber: licenseNumber.trim()
    });

    await newLawyer.save();

    res.status(201).json({ message: "Lawyer added successfully", lawyer: newLawyer });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllLawyers = async (req, res) => {
  try {
    const lawyers = await Lawyer.find();
    res.status(200).json(lawyers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch lawyers." });
  }
};
