const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true,
  },
  flightDetails: {
    airline: {
      type: String,
      required: true,
    },
    departure: {
      time: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    },
    arrival: {
      time: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    stops: {
      type: String,
      required: true,
    },
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
