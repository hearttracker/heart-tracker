const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const treatmentSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    doseMeals: {
      isSelected: Boolean,
      breakfast: Number,
      lunch: Number,
      dinner: Number,
      night: Number
    },
    doseTime: {
      isSelected: Boolean,
      quantity: Number,
      interval: Number,
      timeMeasure: {
        type: String,
        enum: ['months', 'weeks', 'days', 'hours']
      },
    },
    startDate: String,
    endDate: String,
    recommendation: String
});

const Treatment = mongoose.model('Treatment', treatmentSchema);
module.exports = Treatment;
