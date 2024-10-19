import React from 'react';
import { useParams } from 'react-router-dom';
import AccountSummaryWidgetContent from './AccountSummaryWidgetContent';
import QuickTransferWidget from './QuickTransferWidget';
import CurrencyExchangeWidget from './CurrencyExchangeWidget';
import CashFlowWidget from './CashFlowWidget';
import BranchFinderContent from './BranchFinderContent';
import SupplierPaymentTrackerWidget from './SupplierPaymentTrackerWidget';

const WidgetMaximized = () => {
  const { id } = useParams(); // Get the widget ID from the route params

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
      default:
        return <p>Unknown Widget</p>;
    }
  };

  return (
    <div>
      <h2>Maximized Widget - {id}</h2>
      {renderWidgetContent(id)}
    </div>
  );
};

export default WidgetMaximized;
