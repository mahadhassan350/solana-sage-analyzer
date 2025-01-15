import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoralisService } from '@/services/moralis';
import { useToast } from "@/hooks/use-toast";

const DEMO_WALLET = "DemoWalletAddressHere"; // Replace with actual demo wallet
const NETWORK = "mainnet";

const TransactionsList = () => {
  const { toast } = useToast();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['recent-transactions'],
    queryFn: async () => {
      try {
        const swaps = await MoralisService.getSwapsByWallet(NETWORK, DEMO_WALLET);
        return swaps.map((swap: any) => ({
          hash: swap.signature,
          type: 'Swap',
          amount: `${swap.amount_in} ${swap.token_in_symbol} → ${swap.amount_out} ${swap.token_out_symbol}`,
          time: new Date(swap.block_timestamp).toLocaleString()
        }));
      } catch (error) {
        console.error('Error fetching transactions:', error);
        toast({
          title: "Error fetching transactions",
          description: "Please ensure your Moralis API key is set correctly",
          variant: "destructive"
        });
        return [];
      }
    }
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading transactions...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Hash</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions?.map((tx: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-mono">{tx.hash.substring(0, 8)}...{tx.hash.substring(-8)}</TableCell>
            <TableCell>{tx.type}</TableCell>
            <TableCell>{tx.amount}</TableCell>
            <TableCell>{tx.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionsList;