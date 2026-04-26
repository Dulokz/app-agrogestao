import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../screens/DashboardScreen';
import { TaxForecastScreen } from '../screens/TaxForecastScreen'; // Nova tela
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

const Tab = createBottomTabNavigator();

const PlaceholderScreen = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
    <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.textSecondary }}>Módulo: {name}</Text>
    <Text style={{ fontSize: 14, color: theme.colors.textLight, marginTop: 8 }}>Em desenvolvimento para o Agrogestão</Text>
  </View>
);

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textLight,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
        }
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />
          ),
          title: 'Resumo'
        }}
      />
      <Tab.Screen 
        name="TaxForecast" 
        component={TaxForecastScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calculator-variant" color={color} size={size} />
          ),
          title: 'Imposto R.'
        }}
      />
      <Tab.Screen 
        name="Stock" 
        component={() => <PlaceholderScreen name="Estoque e Patrimônio" />} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="warehouse" color={color} size={size} />
          ),
          title: 'Patrimônio'
        }}
      />
      <Tab.Screen 
        name="Reports" 
        component={() => <PlaceholderScreen name="DRE / Relatórios" />} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-chart" color={color} size={size} />
          ),
          title: 'Relatórios'
        }}
      />
    </Tab.Navigator>
  );
};
