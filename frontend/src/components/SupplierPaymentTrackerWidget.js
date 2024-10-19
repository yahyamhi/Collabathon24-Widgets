import React, { useState, useEffect } from 'react';
import './SupplierPaymentTrackerWidget.css'; // Import the new CSS

const SupplierPaymentTrackerWidget = () => {
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [payments, setPayments] = useState([]);

  // Dummy data for suppliers and payments
  useEffect(() => {
    setSuppliers([
      { id: '001', name: 'Supplier A' },
      { id: '002', name: 'Supplier B' },
      { id: '003', name: 'Supplier C' },
    ]);

    setPayments([
      { supplierId: '001', invoiceId: 'INV001', amount: '5000', status: 'Paid', dueDate: '2024-11-01' },
      { supplierId: '001', invoiceId: 'INV002', amount: '1500', status: 'Pending', dueDate: '2024-10-25' },
      { supplierId: '002', invoiceId: 'INV003', amount: '3000', status: 'Paid', dueDate: '2024-10-20' },
      { supplierId: '003', invoiceId: 'INV004', amount: '7000', status: 'Overdue', dueDate: '2024-09-30' },
      { supplierId: '001', invoiceId: 'INV005', amount: '2000', status: 'Paid', dueDate: '2024-09-20' },
    ]);
  }, []);

  const handleSupplierChange = (e) => {
    setSelectedSupplier(e.target.value);
  };

  // Filter payments based on selected supplier
  const outstandingPayments = payments.filter(
    payment => payment.supplierId === selectedSupplier && (payment.status === 'Pending' || payment.status === 'Overdue')
  );

  const paymentHistory = payments.filter(
    payment => payment.supplierId === selectedSupplier && payment.status === 'Paid'
  );

  return (
    <div>
      {/* Dropdown to select supplier */}
      <div className="supplier-dropdown">
        <label htmlFor="supplier-select"><strong>Supplier:</strong></label>
        <select id="supplier-select" value={selectedSupplier} onChange={handleSupplierChange}>
          <option value="">-- Select Supplier --</option>
          {suppliers.map(supplier => (
            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
          ))}
        </select>
      </div>

      {/* Outstanding Payments */}
      <h3>Outstanding Payments</h3>
      {outstandingPayments.length > 0 ? (
        <table className="payment-tracker-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {outstandingPayments.map(payment => (
              <tr key={payment.invoiceId}>
                <td>{payment.invoiceId}</td>
                <td>{payment.amount} EUR</td>
                <td>{payment.status}</td>
                <td>{payment.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No outstanding payments for the selected supplier.</p>
      )}

      {/* Payment History */}
      <h3>Payment History</h3>
      {paymentHistory.length > 0 ? (
        <table className="payment-tracker-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Paid Date</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map(payment => (
              <tr key={payment.invoiceId}>
                <td>{payment.invoiceId}</td>
                <td>{payment.amount} EUR</td>
                <td>{payment.status}</td>
                <td>{payment.dueDate}</td> {/* Paid date is the due date in this case */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No payment history for the selected supplier.</p>
      )}
    </div>
  );
};

export default SupplierPaymentTrackerWidget;
