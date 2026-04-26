import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../theme/colors';
import { PremiumCard } from '../components/PremiumCard';
import { mockData } from '../data/mockData';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export const DashboardScreen = () => {
  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER PREMIUM */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Bem-vindo,</Text>
            <Text style={styles.producerName}>{mockData.user.name}</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons name="bell-outline" size={22} color={theme.colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { marginLeft: 12 }]}>
              <MaterialCommunityIcons name="account-outline" size={22} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* SALDO GLOBAL - GRADIENTE */}
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.mainCard}
        >
          <View style={styles.mainCardContent}>
            <View>
              <Text style={styles.mainCardTitle}>Saldo Mês Fechado ({mockData.summary.lastClosedMonth})</Text>
              <Text style={styles.mainCardValue}>{formatCurrency(mockData.summary.balance)}</Text>
            </View>
            <MaterialCommunityIcons name="wallet-outline" size={40} color="rgba(255,255,255,0.2)" />
          </View>
          <View style={styles.mainCardFooter}>
            <Text style={styles.farmName}>{mockData.user.farm}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Competência</Text>
            </View>
          </View>
        </LinearGradient>

        {/* MÉTRICAS RÁPIDAS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Métricas de Gestão</Text>
        </View>

        <View style={styles.metricsGrid}>
          <PremiumCard
            title="Receitas"
            value={formatCurrency(mockData.summary.revenue)}
            iconName="arrow-up-circle-outline"
            colorType="success"
            trend={{ value: '+12%', isUp: true }}
          />
          <PremiumCard
            title="Despesas"
            value={formatCurrency(mockData.summary.expenses)}
            iconName="arrow-down-circle-outline"
            colorType="danger"
            trend={{ value: '-5%', isUp: false }}
          />
          <PremiumCard
            title="Patrimônio"
            value="R$ 4.2M"
            iconName="office-building-marker-outline"
            colorType="info"
            subtitle="Máquinas e Terras"
          />
          <PremiumCard
            title="Estoque"
            value="850 sc"
            iconName="package-variant-closed"
            colorType="warning"
            subtitle="Soja disponível"
          />
        </View>

        {/* AÇÕES RÁPIDAS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.actionsContainer}>
          {['Lançar Nota', 'Ver DRE', 'Estoque', 'Máquinas'].map((action, idx) => (
            <TouchableOpacity key={idx} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>{action}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ÚLTIMAS TRANSAÇÕES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Movimentações Recentes</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Ver tudo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsList}>
          {mockData.recentTransactions.map((item) => (
            <TouchableOpacity key={item.id} style={styles.transactionItem}>
              <View style={[styles.transactionIcon, { backgroundColor: item.value > 0 ? theme.colors.success + '15' : theme.colors.danger + '15' }]}>
                <MaterialCommunityIcons
                  name={item.value > 0 ? 'arrow-up' : 'arrow-down'}
                  size={20}
                  color={item.value > 0 ? theme.colors.success : theme.colors.danger}
                />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>{item.description}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
              <Text style={[styles.transactionAmount, { color: item.value > 0 ? theme.colors.success : theme.colors.danger }]}>
                {item.value > 0 ? '+' : ''}{formatCurrency(item.value)}
              </Text>
              <MaterialCommunityIcons name="chevron-right" size={18} color={theme.colors.textLight} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 30 }} />
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  welcomeText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  producerName: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  mainCard: {
    marginHorizontal: 24,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  mainCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainCardTitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  mainCardValue: {
    color: theme.colors.white,
    fontSize: 28,
    fontWeight: '800',
  },
  mainCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  farmName: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  seeAll: {
    fontSize: 13,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  actionsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  actionButton: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  transactionsList: {
    marginHorizontal: 24,
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 8,
    marginBottom: 24,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  transactionDate: {
    fontSize: 12,
    color: theme.colors.textLight,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '700',
    marginRight: 8,
  }
});
