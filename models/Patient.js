const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patientSchema = new Schema({
  patientId: Number,
  healthInsuranceId: Number,
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
  },
  treatments: [{
    type: Schema.Types.ObjectId,
    ref: 'Treatment',
  }],
  bloodPressureData: [{
    isMeasured: Boolean,
    min: {
      systolic: Number,
      diastolic: Number
  },
    max: {
      systolic: Number,
      diastolic: Number
  },
    target: {
      systolic: Number,
      diastolic: Number
  },
    date: Date,
    value: [{
            systolic: Number,
            diastolic: Number
        }],
    comment: String
  }],
  heartFrequencyData: [{
    isMeasured: Boolean,
    min: Number,
    max: Number,
    target: Number,
    date: Date,
    value: Number,
    comment: String
  }],
  bloodSugarData: [{
    isMeasured: Boolean,
    min: Number,
    max: Number,
    target: Number,
    date: Date,
    value: Number,
    comment: String
  }],
  assignedDoctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  lastUpdate: Date
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
