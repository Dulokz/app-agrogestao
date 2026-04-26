export const mockData = {
  user: {
    name: 'João Produtor',
    farm: 'Fazenda Boa Esperança',
  },
  // Dados para o Dashboard (Regime de Competência)
  summary: {
    month: 'Fevereiro 2026', // Mês atual
    lastClosedMonth: 'Janeiro 2026', // Último mês fechado
    revenue: 145000.00,
    expenses: 82300.00,
    balance: 62700.00,
  },
  // Dados para a Tela de Previsão de IR
  taxYear: {
    year: 2026,
    months: [
      { month: 'Janeiro', revenue: 100000.00, expenses: 80000.00, result: 20000.00 },
      { month: 'Fevereiro', revenue: 200000.00, expenses: 100000.00, result: 100000.00 },
      { month: 'Março (Aberto)', revenue: 45000.00, expenses: 32000.00, result: 13000.00 },
    ],
    totalResult: 133000.00,
    estimatedTax: 26600.00, // Exemplo: 20% sobre o resultado (ajustável)
  },
  recentTransactions: [
    { id: '1', date: '15/03', description: 'Venda de Soja', value: 120000.00, type: 'revenue' },
    { id: '2', date: '12/03', description: 'Manutenção Trator', value: -5400.00, type: 'expense' },
    { id: '3', date: '10/03', description: 'Compra de Sementes', value: -18000.00, type: 'expense' },
    { id: '4', date: '05/03', description: 'Venda de Milho', value: 25000.00, type: 'revenue' },
    { id: '5', date: '01/03', description: 'Combustível (Diesel)', value: -3200.00, type: 'expense' },
  ]
};
