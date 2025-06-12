import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the agreement schema
const agreementQuestionariesSchema = new Schema({
  agreementName: { type: String, required: true },   // Name of the agreement
  questions: [
    {
      questionText: { type: String, required: true },  // The actual question text
      createdAt: { type: Date, default: Date.now }     // Timestamp when the question is created
    }
  ]
});

// Create the Agreement model
const Agreement = mongoose.model('Agreement', agreementQuestionariesSchema);


export { Agreement };
