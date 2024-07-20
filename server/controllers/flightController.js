const Flight = require('../models/Flight');

exports.getCities = async (req, res) => {
  try {
    const departureCities = await Flight.distinct('departureCity');
    const destinationCities = await Flight.distinct('destinationCity');

    res.json({ departureCities, destinationCities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};