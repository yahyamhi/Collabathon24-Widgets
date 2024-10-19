import React from 'react';
import useFetch from '../hooks/useFetch'; // Import the custom useFetch hook
import './TaxComplianceOverviewWidget.css';

const TaxComplianceOverviewWidget = () => {
  // Use custom useFetch hook to fetch tax compliance data
  const { data: taxData, loading, error } = useFetch('/api/tax-compliance');

  return (
    <div>
      {loading ? (
        <p>Loading tax compliance data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="tax-compliance-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Due Date</th>
              <th>Amount (EUR)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {taxData?.taxObligations?.map((tax) => (
              <tr key={tax.id}>
                <td>{tax.type}</td>
                <td>{tax.dueDate}</td>
                <td>{tax.amount}</td>
                <td>{tax.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaxComplianceOverviewWidget;
