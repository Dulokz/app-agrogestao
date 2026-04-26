import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { theme } from '../theme/colors';
import { mockData } from '../data/mockData';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const TaxForecastScreen = () => {
  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER TAX */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Previsão de I.R.</Text>
            <Text style={styles.subtitle}>Ano Calendário {mockData.taxYear.year}</Text>
          </View>
          <View style={styles.taxBadge}>
            <MaterialCommunityIcons name="calculator" size={20} color={theme.colors.primary} />
          </View>
        </View>

        {/* RESUMO DE IMPOSTO */}
        <LinearGradient
          colors={['#1E293B', '#334155']}
          style={styles.summaryCard}
        >
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryLabel}>Imposto Estimado (Hoje)</Text>
              <Text style={styles.summaryValue}>{formatCurrency(mockData.taxYear.estimatedTax)}</Text>
            </View>
            <MaterialCommunityIcons name="bank-transfer-out" size={32} color={theme.colors.accent} />
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryFooter}>
            <Text style={styles.footerText}>Resultado Acumulado:</Text>
            <Text style={styles.footerValue}>{formatCurrency(mockData.taxYear.totalResult)}</Text>
          </View>
        </LinearGradient>

        {/* TABELA DE RESULTADOS MENSAIS */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.columnHeader, { flex: 1.5 }]}>Mês</Text>
            <Text style={styles.columnHeader}>Receita</Text>
            <Text style={styles.columnHeader}>Despesa</Text>
            <Text style={[styles.columnHeader, { textAlign: 'right' }]}>Result.</Text>
          </View>

          {mockData.taxYear.months.map((item, idx) => (
            <View key={idx} style={[styles.tableRow, idx % 2 === 0 && styles.rowEven]}>
              <Text style={[styles.cellMonth, { flex: 1.5 }]}>{item.month}</Text>
              <Text style={styles.cellValue}>{item.revenue / 1000}k</Text>
              <Text style={[styles.cellValue, { color: theme.colors.danger }]}>{item.expenses / 1000}k</Text>
              <Text style={[styles.cellResult, { color: item.result >= 0 ? theme.colors.success : theme.colors.danger }]}>
                {item.result / 1000}k
              </Text>
            </View>
          ))}

          {/* TOTALIZADOR DA TABELA */}
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { flex: 1.5 }]}>TOTAL</Text>
            <Text style={styles.totalValue}>{formatCurrency(mockData.taxYear.totalResult)}</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="information-outline" size={20} color={theme.colors.textSecondary} />
          <Text style={styles.infoText}>
            Base de cálculo simplificada (20% sobre o resultado líquido). Consulte as deduções de investimento no Agrogestão Desktop.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  taxBadge: {
    width: 44,
    height: 44,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  summaryCard: {
    marginHorizontal: 24,
    padding: 24,
    borderRadius: 20,
    marginBottom: 32,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  summaryValue: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 16,
  },
  summaryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  footerValue: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  tableContainer: {
    marginHorizontal: 24,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 12,
    marginBottom: 8,
  },
  columnHeader: {
    flex: 1,
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textLight,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    alignItems: 'center',
  },
  rowEven: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },
  cellMonth: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  cellValue: {
    flex: 1,
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  cellResult: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#F1F5F9',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  infoBox: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 24,
    padding: 16,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginLeft: 10,
    lineHeight: 16,
  }
});
