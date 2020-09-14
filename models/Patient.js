const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patientSchema = new Schema({
  patientId: Number,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  contact: {
    email: {
      type: String,
      required: true,
      unique: true
    },
    telephone: {
      type: Number,
      required: true
    }
  },
  diagnosis: String,
  allergies: String,
  alertLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
  }
  treatments: [{
    name: String,
    dosis: String,
    startDate: Date,
    endDate: Date,
    comments: String
  }],
  bloodPressureData: [{
    date: Date,
    value: [{
            systolic: Number,
            diastolic: Number
        }],
    comment: String
  }],
  heartFrequencyData: [{
    date: Date,
    value: Number,
    comment: String
  }],
  bloodSugarData: [{
    date: Date,
    value: Number,
    comment: String
  }],
  assignedDoctor: {
    type: ObjectId,
    ref: Doctor,
    required: true
  },
  lastUpdate: Date
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
