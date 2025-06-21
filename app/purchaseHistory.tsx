import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

export default function PurchaseHistory() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Title Row with Back Button */}
        <View style={styles.titleRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={24} color="#181111" />
          </TouchableOpacity>
          <Text style={styles.insightsTitle}>Your Shopping Insights</Text>
        </View>

        {/* Weekly Spending */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Spending</Text>
          <View style={styles.analyticsChart}>
            {[40, 60, 30, 80, 50].map((h, i) => (
              <View
                key={i}
                style={{ width: 55, height: h, borderRadius: 6, backgroundColor: '#667eea' }}
              />
            ))}
          </View>
          <Text style={styles.chartLabel}>Mon - Fri</Text>
        </View>

        {/* Smart Predictions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Smart Predictions</Text>
          <View style={[styles.predictionBox, { backgroundColor: '#fef5e7' }]}>
            <Text style={[styles.predictionTitle, { color: '#d69e2e' }]}>🥛 Low on Milk</Text>
            <Text style={styles.predictionSub}>Usually buy every 5 days</Text>
          </View>
          <View style={[styles.predictionBox, { backgroundColor: '#e6fffa' }]}>
            <Text style={[styles.predictionTitle, { color: '#38b2ac' }]}>🥑 Avocado Season</Text>
            <Text style={styles.predictionSub}>Best prices this week!</Text>
          </View>
        </View>

        {/* Sustainability Score */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sustainability Score</Text>
          <View style={styles.sustainabilityBarBg}>
            <View style={styles.sustainabilityBarFill} />
          </View>
          <Text style={styles.sustainabilityPercent}>75%</Text>
          <Text style={styles.sustainabilityMsg}>
            Great job! You're making eco-friendly choices 🌱
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 32,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#181111',
    textAlign: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    marginTop: 8,
    minHeight: 32,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  insightsTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 18,
    marginBottom: 18,
    width: CARD_WIDTH,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    alignSelf: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#181111',
  },
  analyticsChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 110,
    marginBottom: 6,
    marginTop: 8,
    width: '100%',
    paddingHorizontal: 8,
  },
  chartBar: {
    width: 22,
    borderRadius: 6,
  },
  chartLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  predictionBox: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  predictionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  predictionSub: {
    fontSize: 12,
    color: '#181111',
  },
  sustainabilityBarBg: {
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    height: 20,
    width: '100%',
    overflow: 'hidden',
    marginBottom: 8,
    marginTop: 2,
  },
  sustainabilityBarFill: {
    backgroundColor: '#38a169',
    height: 20,
    width: '75%',
    borderRadius: 10,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  sustainabilityPercent: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#38a169',
    marginBottom: 6,
    marginTop: -26,
    textAlign: 'right',
    width: '100%',
    paddingRight: 8,
  },
  sustainabilityMsg: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 8,
    textAlign: 'center',
  },
});