const path = require('path');
const fs = require('fs');

// Path to the bank details JSON data file
const bankDataPath = path.join(__dirname, '../data/bankDetails.json');;
const bankDetails = JSON.parse(fs.readFileSync(bankDataPath, 'utf-8'));

const branchFinderService = {
  getBranches: async (city, street, type) => {
    try {
      // Read the JSON file containing bank details
      const data = fs.readFileSync(bankDataPath, 'utf8');
      const bankDetails = JSON.parse(data);

      // Filter the data based on city and street
      const filteredBranches = bankDetails.filter(branch => 
        branch.city === city && branch.street === street
      );

      // Return the filtered branches
      return filteredBranches;
    } catch (error) {
      console.error('Error fetching branch data from local JSON file:', error);
      throw error;
    }
  },
  getCitiesAndStreets: async () => {
    try {
      const citiesAndStreets = {};

      // Loop through bank details and collect cities and streets
      bankDetails.forEach(branch => {
        if (!citiesAndStreets[branch.city]) {
          citiesAndStreets[branch.city] = new Set();
        }
        citiesAndStreets[branch.city].add(branch.street);
      });

      // Convert Set to Array for easy handling in the frontend
      for (const city in citiesAndStreets) {
        citiesAndStreets[city] = Array.from(citiesAndStreets[city]);
      }

      return citiesAndStreets;
    } catch (error) {
      console.error('Error fetching cities and streets:', error);
      throw error;
    }
  }
};

module.exports = branchFinderService;
