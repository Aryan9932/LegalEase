import Lawyer from "../models/lawyer.model.js";
import transporter from "../config/mail.config.js";

export const bookLawyer = async (req, res) => {
  const { lawyerEmail, userName, userEmail, bookingDate } = req.body;

  try {
    // Find the lawyer by their email
    const lawyer = await Lawyer.findOne({ email: lawyerEmail });
    if (!lawyer) {
      return res.status(404).json({ success: false, message: "Lawyer not found" });
    }

    // Send email to the lawyer notifying them of the booking
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: lawyer.email,
      subject: 'New Booking Request',
      text: `Dear ${lawyer.name},\n\nYou have received a new booking request from ${userName} (${userEmail}).\n\nBooking Details:\nDate: ${bookingDate}\n\nPlease contact the user for further details.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Booking successful, email sent to the lawyer.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to book the lawyer",
      error: error.message,
    });
  }
};
