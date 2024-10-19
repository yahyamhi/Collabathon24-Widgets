import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchData } from '../api/apiClient'; // Use fetchData directly for POST
import './Widget.css';

const QuickTransferWidget = () => {
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [transferResult, setTransferResult] = useState(null);
  const [transferError, setTransferError] = useState(null);
  const [transferLoading, setTransferLoading] = useState(false);

  // Fetch account balances using useFetch (GET request)
  const { data: availableBalances, loading: balancesLoading, error: balancesError } = useFetch('/api/account-balances');

  // Handle Transfer button click and initiate POST request manually
  const handleTransfer = async () => {
    if (!fromAccountId || !toAccountId || !amount) {
      alert('Please fill in all fields.');
      return;
    }
  
    const fromAccount = availableBalances.find(account => account.accountId === fromAccountId);
    const availableBalance = parseFloat(fromAccount.availableBalance.replace(/[^\d.-]/g, ''));
    
    if (availableBalance < parseFloat(amount)) {
      alert('Insufficient balance.');
      return;
    }

    setTransferLoading(true); // Set loading state
    try {
      const response = await fetchData('/api/quick-transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          fromAccountId,
          toAccountId,
          amount: parseFloat(amount), // Ensure amount is a float
        },
      });
      setTransferResult(response); // Set the result from the transfer
      setTransferError(null); // Clear previous errors
    } catch (error) {
      setTransferError('Error in response'); // Set an error message
      setTransferResult(null); // Clear previous results
    } finally {
      setTransferLoading(false); // Turn off loading state
    }
  };

  return (
    <div className="quick-transfer-widget">

      {/* Sender Account Section */}
      <div className="row">
        <label htmlFor="fromAccountId">From Account:</label>
        <select
          value={fromAccountId}
          onChange={(e) => setFromAccountId(e.target.value)}
          aria-label="From Account"
        >
          <option value="" disabled>Select Sender Account</option>
          {availableBalances?.map(account => (
            <option key={account.accountId} value={account.accountId}>
              {account.accountId} - {account.availableBalance} {account.currency}
            </option>
          ))}
        </select>
      </div>

      {/* Recipient Account Section */}
      <div className="row">
        <label htmlFor="toAccountId">To Account:</label>
        <select
          id="toAccountId"
          value={toAccountId}
          onChange={(e) => setToAccountId(e.target.value)}
          aria-label="To Account"
        >
          <option value="" disabled>Select Recipient Account</option>
          {availableBalances?.map(account => (
            <option key={account.accountId} value={account.accountId}>
              {account.accountId}
            </option>
          ))}
        </select>
      </div>

      {/* Amount Input */}
      <div className="form-group">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount to transfer"
        />
      </div>

      {/* Transfer Button */}
      <button className="transfer-button" onClick={handleTransfer} disabled={transferLoading}>
        {transferLoading ? 'Transferring...' : 'Transfer'}
      </button>

      {/* Display Transfer Results */}
      {transferResult && (
        <div className="transfer-result">
          <p>Transfer successful!</p>
          <p>
            From Account {transferResult.fromAccount.accountId} New Balance: {transferResult.fromAccount.newBalance}{' '}
            {transferResult.fromAccount.currency}
          </p>
          <p>
            To Account {transferResult.toAccount.accountId} New Balance: {transferResult.toAccount.newBalance}{' '}
            {transferResult.toAccount.currency}
          </p>
        </div>
      )}
      {transferError && <p className="error">{transferError}</p>}
    </div>
  );
};

export default QuickTransferWidget;
