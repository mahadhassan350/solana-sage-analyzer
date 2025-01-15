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

const TransactionsList = () => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['recent-transactions'],
    queryFn: async () => {
      // This would be replaced with actual Moralis API calls
      return [
        { hash: '0x1234...5678', type: 'Transfer', amount: '100 SOL', time: '2 mins ago' },
        { hash: '0x8765...4321', type: 'Swap', amount: '50 SOL', time: '5 mins ago' },
      ];
    }
  });

  if (isLoading) {
    return <div>Loading transactions...</div>;
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
        {transactions?.map((tx, index) => (
          <TableRow key={index}>
            <TableCell className="font-mono">{tx.hash}</TableCell>
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