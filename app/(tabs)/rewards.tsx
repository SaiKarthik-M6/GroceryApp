import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const MAX_WIDTH = 480;

const offers = [
  {
    title: '🔥 Flash Deal',
    desc: 'Buy 2 Get 1 Free on Snacks',
    color: '#d69e2e',
    bg: '#fef5e7',
  },
  {
    title: '🌱 Eco Bonus',
    desc: '2x points on sustainable products',
    color: '#38b2ac',
    bg: '#e6fffa',
  },
];

const activity = [
  {
    points: '+50 points - Grocery Purchase',
    time: '2 hours ago',
  },
  {
    points: '+100 points - Eco Warrior Bonus',
    time: '1 day ago',
  },
];

export default function Rewards() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton} accessibilityLabel="Go back">
              <Ionicons name="arrow-back" size={24} color="#181111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Rewards Dashboard</Text>
            <View style={{ width: 32 }} />
          </View>

          {/* Rewards Banner */}
          <View style={styles.bannerBox}>
            <Text style={styles.bannerTitle}>Your Rewards</Text>
            <View style={styles.pointsBadge}><Text style={styles.pointsBadgeText}>2,450 Points</Text></View>
            <Text style={styles.nextReward}>Next Reward: 550 points to go! 🎯</Text>
          </View>

          {/* Active Offers */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Active Offers</Text>
            {offers.map((offer, idx) => (
              <View key={idx} style={[styles.offerBox, { backgroundColor: offer.bg }]}> 
                <Text style={[styles.offerTitle, { color: offer.color }]}>{offer.title}</Text>
                <Text style={styles.offerDesc}>{offer.desc}</Text>
              </View>
            ))}
          </View>

          {/* Recent Activity */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Recent Activity</Text>
            {activity.map((a, idx) => (
              <View key={idx} style={[styles.activityRow, idx < activity.length - 1 && styles.activityBorder]}> 
                <Text style={styles.activityPoints}>{a.points}</Text>
                <Text style={styles.activityTime}>{a.time}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      {/* Bottom Navigation */}
       
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 32,
    paddingTop: 0,
  },
  innerContainer: {
    width: '100%',
    maxWidth: MAX_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181111',
  },
  bannerBox: {
    backgroundColor: '#f4f0f0',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 24,
    marginHorizontal: 0,
    marginBottom: 18,
    marginTop: 8,
    width: '100%',
    maxWidth: MAX_WIDTH - 32,
    alignSelf: 'center',
  },
  bannerTitle: {
    color: '#667eea',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pointsBadge: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  pointsBadgeText: {
    color: '#181111',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.2,
  },
  nextReward: {
    color: '#181111',
    fontSize: 15,
    marginTop: 2,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 18,
    marginBottom: 18,
    marginHorizontal: 0,
    width: '100%',
    maxWidth: MAX_WIDTH - 32,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#2d3748',
  },
  offerBox: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  offerTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  offerDesc: {
    fontSize: 12,
    color: '#181111',
  },
  activityRow: {
    paddingVertical: 8,
  },
  activityBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  activityPoints: {
    fontSize: 12,
    color: '#181111',
  },
  activityTime: {
    fontSize: 12,
    color: '#64748b',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f4f0f0',
    backgroundColor: '#fff',
    paddingBottom: 8,
    paddingTop: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  navItemActive: {
    borderRadius: 16,
    backgroundColor: '#f4f0f0',
  },
  navLabelInactive: {
    color: '#886364',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  navLabelActive: {
    color: '#181111',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
});
