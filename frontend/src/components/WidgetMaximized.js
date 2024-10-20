import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate to handle redirection
import AccountSummaryWidgetContent from './AccountSummaryWidgetContent';
import QuickTransferWidget from './QuickTransferWidget';
import CurrencyExchangeWidget from './CurrencyExchangeWidget';
import CashFlowWidget from './CashFlowWidget';
import BranchFinderContent from './BranchFinderContent';
import SupplierPaymentTrackerWidget from './SupplierPaymentTrackerWidget';
import TaxComplianceOverviewWidget from './TaxComplianceOverviewWidget';
import ExpensePieChartWidget from './ExpensePieChartWidget';
import StockWidget from './StockWidget'

const WidgetMaximized = () => {
  const { id } = useParams(); // Get the widget ID from the route params
  const [isInDashboard, setIsInDashboard] = useState(false); // Track if the widget is already in the dashboard
  const navigate = useNavigate(); // For redirection after adding the widget

  // Mapping of widget IDs to their corresponding titles
  const widgetTitleMap = {
    accountsummary: 'Account Summary',
    quickselftransfer: 'Quick Self Transfer',
    currencyexchange: 'Currency Exchange',
    supplierpaymenttracker: 'Supplier Payment Tracker',
    branchfinder: 'Branch Finder',
    cashflowoverview: 'Cash Flow Overview',
    taxcomplianceoverview: 'Tax Compliance Overview',
    expensepiechart: 'Expense Pie Chart',
    stockwidget : 'Stock Widget'
  };

  // Check if the widget is already in the dashboard
  useEffect(() => {
    const savedWidgets = JSON.parse(localStorage.getItem('widgets')) || [];
    const widgetExists = savedWidgets.find(widget => widget.id === id && widget.visible);
    setIsInDashboard(!!widgetExists);
  }, [id]);

  // Add widget to dashboard (set visible: true) and show "Added" before redirecting
  const addToDashboard = () => {
    const savedWidgets = JSON.parse(localStorage.getItem('widgets')) || [];
    const widgetExists = savedWidgets.find(widget => widget.id === id);

    let updatedWidgets;
    if (widgetExists) {
      // If widget exists, update its visibility to true
      updatedWidgets = savedWidgets.map(widget =>
        widget.id === id ? { ...widget, visible: true } : widget
      );
    } else {
      // If widget doesn't exist, add it to the list
      const newWidget = { id, title: widgetTitleMap[id], visible: true };
      updatedWidgets = [...savedWidgets, newWidget];
    }

    // Save updated widgets to localStorage
    localStorage.setItem('widgets', JSON.stringify(updatedWidgets));

    // Re-check the state of the widgets to ensure it's now in the dashboard
    setIsInDashboard(true); // Set the widget as being in the dashboard

    // Redirect to the main dashboard (root) after a short delay (e.g., 3 seconds)
    setTimeout(() => {
      navigate('/');
    }, 3000); // Delay of 3 seconds
  };

  // Widget mapping based on the id
  const renderWidgetContent = (widgetId) => {
    switch (widgetId) {
      case 'accountsummary':
        return <AccountSummaryWidgetContent isMaximized={true} />;
      case 'quickselftransfer':
        return <QuickTransferWidget isMaximized={true} />;
      case 'currencyexchange':
        return <CurrencyExchangeWidget isMaximized={true} />;
      case 'cashflowoverview':
        return <CashFlowWidget isMaximized={true} />;
      case 'branchfinder':
        return <BranchFinderContent isMaximized={true} />;
      case 'supplierpaymenttracker':
        return <SupplierPaymentTrackerWidget isMaximized={true} />;
      case 'taxcomplianceoverview':
        return <TaxComplianceOverviewWidget isMaximized={true} />;
        case 'expensepiechart':
          return <ExpensePieChartWidget isMaximized={true} />;
        case 'stockwidget':
          return <StockWidget isMaximized={true} />;
      default:
        return <p>Unknown Widget</p>;
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <h2>{widgetTitleMap[id] || 'Unknown Widget'}</h2>
  
      {renderWidgetContent(id)}
      
      {!isInDashboard && (
        <button onClick={addToDashboard} className="add-to-dashboard-button">
          Add to Dashboard
        </button>
      )}
  
      {isInDashboard && (
        <button className="added-to-dashboard-button">
          Added to Dashboard
        </button>
      )}
    </div>
  );
};

export default WidgetMaximized;
