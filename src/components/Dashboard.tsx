import React from 'react';
import { Card } from '@/components/ui/card';
import TransactionsList from './TransactionsList';
import MarketAnalysis from './MarketAnalysis';
import BlockchainStats from './BlockchainStats';
import ChatAnalysis from './ChatAnalysis';

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6 space-y-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Solana Analytics Dashboard</h1>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <BlockchainStats />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Transaction Activity</h2>
          <TransactionsList />
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Market Analysis</h2>
          <MarketAnalysis />
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">AI Analysis</h2>
        <ChatAnalysis />
      </Card>
    </div>
  );
};

export default Dashboard;