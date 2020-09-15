const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const treatmentSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    doseMeals: {
      breakfast: Number,
      lunch: Number,
      dinner: Number,
      night: Number
    },
    doseTime: {
      quantity: Number,
      interval: Number,
      timeMeasure: {
        type: String,
        enum: ['month', 'weeks', 'days', 'hours']
      },
    },
    startDate: Date,
    endDate: Date,
    recommendation: String
});

const Treatment = mongoose.model('Treatment', treatmentSchema);
module.exports = Treatment;
