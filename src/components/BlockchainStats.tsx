import React from 'react';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Activity, DollarSign, Clock } from 'lucide-react';

const BlockchainStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['blockchain-stats'],
    queryFn: async () => {
      // This would be replaced with actual Moralis API calls
      return {
        transactions: '1.2M',
        volume: '$456.7M',
        tps: '2,345',
        latency: '0.4s'
      };
    }
  });

  const statCards = [
    { title: 'Transactions', value: stats?.transactions, icon: BarChart },
    { title: 'Volume', value: stats?.volume, icon: DollarSign },
    { title: 'TPS', value: stats?.tps, icon: Activity },
    { title: 'Latency', value: stats?.latency, icon: Clock },
  ];

  return (
    <>
      {statCards.map((stat, index) => (
        <Card key={index} className="stats-card">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-accent rounded-lg">
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <h3 className="text-2xl font-bold">
                {isLoading ? '...' : stat.value}
              </h3>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};

export default BlockchainStats;