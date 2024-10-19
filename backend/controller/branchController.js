const branchFinderService = require('../services/branchFinderService');

exports.getBranches = async (req, res, next) => {
  const { city, street, type } = req.query;
  try {
    const branches = await branchFinderService.getBranches(city, street, type);
    res.json(branches);
  } catch (error) {
    next(error);
  }
};

exports.getCitiesAndStreets = async (req, res, next) => {
  try {
    const citiesAndStreets = await branchFinderService.getCitiesAndStreets();
    res.json(citiesAndStreets);
  } catch (error) {
    next(error);
  }
};