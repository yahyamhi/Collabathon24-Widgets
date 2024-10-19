const { commerzbankClient } = require('../utils/httpClient');

const branchFinderService = {
  getBranches: async (city, street, type) => {
    try {
      const response = await commerzbankClient.get('/branches-api/1/v1/geosearch/city_street', {
        params: { city, street, type }, // Added type parameter
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching branch data:', error);
      throw error;
    }
  },
};

module.exports = branchFinderService;
