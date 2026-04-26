import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../theme/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  colorType: 'success' | 'danger' | 'info' | 'warning';
  trend?: {
    value: string;
    isUp: boolean;
  };
}

export const PremiumCard = ({ title, value, subtitle, iconName, colorType, trend }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: theme.colors[colorType] + '20' }]}>
            <MaterialCommunityIcons name={iconName} size={20} color={theme.colors[colorType]} />
          </View>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.value} numberOfLines={1}>{value}</Text>
          {trend && (
            <View style={styles.trendContainer}>
              <MaterialCommunityIcons 
                name={trend.isUp ? 'trending-up' : 'trending-down'} 
                size={14} 
                color={trend.isUp ? theme.colors.success : theme.colors.danger} 
              />
              <Text style={[styles.trendText, { color: trend.isUp ? theme.colors.success : theme.colors.danger }]}>
                {trend.value}
              </Text>
            </View>
          )}
        </View>

        {subtitle && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (width - 64) / 2, // Ajuste para margens
    marginBottom: 16,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 10,
    color: theme.colors.textLight,
    marginTop: 4,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  }
});
