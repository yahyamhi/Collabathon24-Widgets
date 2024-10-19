import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import './AccountSummaryWidgetContent.css';

// Helper function to format balance with currency
const formatBalanceWithCurrency = (value, currency) => {
  return `${new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 }).format(value)} ${currency}`;
};

const AccountSummaryWidgetContent = ({ endpoint }) => {
  // Fetch account IDs using useFetch
  const { data: accountIds, loading: accountIdsLoading, error: accountIdsError } = useFetch('/api/account-ids');
  const [selectedAccountId, setSelectedAccountId] = useState(); // Default to 123456

  // Fetch account summary dynamically based on selectedAccountId
  const { data, loading, error } = useFetch(
    selectedAccountId ? `/api/account-summary/${selectedAccountId}` : null
  );

  // Update selectedAccountId when account IDs are loaded, setting default to '123456' or fallback to the first ID
  useEffect(() => {
    if (accountIds && accountIds.length > 0 && !selectedAccountId) {
      setSelectedAccountId(accountIds[0]); // Set '123456' if available, otherwise set the first account
    }
  }, [accountIds, selectedAccountId]);

  // Handle dropdown change
  const handleAccountChange = (event) => {
    setSelectedAccountId(event.target.value);
  };

  if (accountIdsLoading) return <p>Loading account IDs...</p>;
  if (accountIdsError) return <p>Error fetching account IDs: {accountIdsError}</p>;

  return (
    <div>
      {/* Dropdown for Account IDs in single line */}
      <div className="account-dropdown">
        <label htmlFor="account-select"><strong>Account ID:</strong></label>
        <select
          id="account-select"
          value={selectedAccountId}
          onChange={handleAccountChange}
        >
          {accountIds && accountIds.map((accountId) => (
            <option key={accountId} value={accountId}>
              {accountId}
            </option>
          ))}
        </select>
      </div>

      {/* Only show account summary if an account is selected */}
      {!selectedAccountId ? (
        <p>Please select an account to view the summary.</p>
      ) : loading ? (
        <p>Loading account summary...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : data ? (
        <table className="account-summary-table">
          <tbody>
            {/* Available Balance */}
            {data.balances && (
              <tr>
                <td><strong>Available Balance:</strong></td>
                <td>{formatBalanceWithCurrency(data.balances.available, data.balances.currency)}</td>
              </tr>
            )}

            {/* Loan Details */}
            {data.loans && (
              <>
                <tr>
                  <td colSpan="2"><strong>Loan Details</strong></td>
                </tr>
                <tr>
                  <td>Outstanding Loan:</td>
                  <td>{formatBalanceWithCurrency(data.loans.outstanding, data.balances.currency)}</td>
                </tr>
                <tr>
                  <td>Loan Due Date:</td>
                  <td>{data.loans.dueDate}</td>
                </tr>
              </>
            )}

            {/* Term Deposit Details */}
            {data.termDeposits && (
              <>
                <tr>
                  <td colSpan="2"><strong>Term Deposit Details</strong></td>
                </tr>
                <tr>
                  <td>Total Term Deposit:</td>
                  <td>{formatBalanceWithCurrency(data.termDeposits.total, data.balances.currency)}</td>
                </tr>
                <tr>
                  <td>Maturity Date:</td>
                  <td>{data.termDeposits.maturityDate}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      ) : (
        <p>No account summary available.</p>
      )}
    </div>
  );
};

export default AccountSummaryWidgetContent;