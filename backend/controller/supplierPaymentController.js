const path = require('path');
const fs = require('fs');

// Path to the supplier payment JSON data file
const dataPath = path.resolve(__dirname, '../data/supplierPayments.json');

// Controller to fetch all supplier payment data
exports.getSupplierPayments = async (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    const supplierPayments = JSON.parse(data).suppliers;
    res.json(supplierPayments);
  } catch (error) {
    console.error('Error fetching supplier payments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to fetch supplier payment by supplierId
exports.getSupplierPaymentById = async (req, res) => {
  const { supplierId } = req.params;
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    const suppliers = JSON.parse(data).suppliers;
    const supplier = suppliers.find(supplier => supplier.supplierId === supplierId);
    
    if (supplier) {
      res.json(supplier);
    } else {
      res.status(404).json({ message: 'Supplier not found' });
    }
  } catch (error) {
    console.error('Error fetching supplier payment by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
