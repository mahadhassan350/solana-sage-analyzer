import React from 'react';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Activity, DollarSign, Clock } from 'lucide-react';
import { MoralisService } from '@/services/moralis';
import { useToast } from "@/hooks/use-toast";

const DEMO_WALLET = "DemoWalletAddressHere"; // Replace with actual demo wallet
const NETWORK = "mainnet";

const BlockchainStats = () => {
  const { toast } = useToast();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['blockchain-stats'],
    queryFn: async () => {
      try {
        const [portfolio, balance] = await Promise.all([
          MoralisService.getPortfolio(NETWORK, DEMO_WALLET),
          MoralisService.getNativeBalance(NETWORK, DEMO_WALLET)
        ]);

        return {
          transactions: portfolio?.total_transactions_24h || '0',
          volume: `$${(portfolio?.total_volume_24h || 0).toFixed(2)}`,
          balance: `${(parseFloat(balance?.balance || '0') / 1e9).toFixed(2)} SOL`,
          portfolioValue: `$${(portfolio?.total_value_usd || 0).toFixed(2)}`
        };
      } catch (error) {
        console.error('Error fetching blockchain stats:', error);
        toast({
          title: "Error fetching blockchain data",
          description: "Please ensure your Moralis API key is set correctly",
          variant: "destructive"
        });
        return {
          transactions: '0',
          volume: '$0',
          balance: '0 SOL',
          portfolioValue: '$0'
        };
      }
    }
  });

  const statCards = [
    { title: 'Daily Transactions', value: stats?.transactions, icon: BarChart },
    { title: '24h Volume', value: stats?.volume, icon: DollarSign },
    { title: 'Balance', value: stats?.balance, icon: Activity },
    { title: 'Portfolio Value', value: stats?.portfolioValue, icon: Clock },
  ];

  return (
    <>
      {statCards.map((stat, index) => (
        <Card key={index} className="p-4 stats-card">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-accent rounded-lg">
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <h3 className="text-2xl font-bold font-mono">
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