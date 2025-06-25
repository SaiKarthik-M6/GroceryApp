import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const MAX_WIDTH = 480; // for tablets/large screens

export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          {/* Header with Back Button and Title */}
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
              accessibilityLabel="Go back"
            >
              <Ionicons name="arrow-back" size={24} color="#181111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity
              onPress={() => {/* Implement edit profile navigation */}}
              style={styles.editButton}
              accessibilityLabel="Edit profile"
            >
              <Feather name="edit-2" size={20} color="#181111" />
            </TouchableOpacity>
          </View>

          {/* Profile Picture and Info */}
          <View style={styles.profileSection}>
            <Image
              source={require('../../assets/images/pf.avif')}
              style={styles.avatar}
            />
            <Text style={styles.profileName}>John Walker</Text>
            <Text style={styles.profileSub}>Member since 2024</Text>
          </View>

          {/* Rewards Section */}
          <Text style={styles.sectionHeader}>Rewards</Text>
          <TouchableOpacity style={styles.infoRow} activeOpacity={0.7}>
            <View style={styles.iconCircle}>
              <Ionicons name="star" size={24} color="#181111" />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Points balance</Text>
              <Text style={styles.infoSub}>1,250 points</Text>
            </View>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {/* Implement redeem navigation */}}
            >
              <Text style={styles.actionButtonText}>Redeem</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow} activeOpacity={0.7}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="card-giftcard" size={24} color="#181111" />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Redemptions</Text>
              <Text style={styles.infoSub}>10 redemptions</Text>
            </View>
          </TouchableOpacity>

          {/* Purchase History Section */}
          <Text style={styles.sectionHeader}>Purchase History</Text>
          <TouchableOpacity
            style={styles.infoRow}
            activeOpacity={0.7}
            onPress={() => router.push('/purchaseHistory')}
          >
            <View style={styles.iconCircle}>
              <Feather name="file-text" size={24} color="#181111" />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Order #12345</Text>
              <Text style={styles.infoSub}>12 items</Text>
            </View>
            <Feather name="chevron-right" size={22} color="#886364" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infoRow}
            activeOpacity={0.7}
            onPress={() => router.push('/purchaseHistory')}
          >
            <View style={styles.iconCircle}>
              <Feather name="file-text" size={24} color="#181111" />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Order #67890</Text>
              <Text style={styles.infoSub}>8 items</Text>
            </View>
            <Feather name="chevron-right" size={22} color="#886364" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    maxWidth: 480,
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  editButton: {
    padding: 8,
    borderRadius: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 16,
    width: '100%',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
    backgroundColor: '#f4f0f0',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#181111',
    textAlign: 'center',
  },
  profileSub: {
    color: '#886364',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181111',
    paddingTop: 18,
    paddingBottom: 8,
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  iconCircle: {
    backgroundColor: '#f4f0f0',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  infoText: {
    flex: 1,
    justifyContent: 'center',
  },
  infoTitle: {
    color: '#181111',
    fontSize: 16,
    fontWeight: '500',
  },
  infoSub: {
    color: '#886364',
    fontSize: 14,
    marginTop: 2,
  },
  actionButton: {
    backgroundColor: '#f4f0f0',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginLeft: 10,
    alignSelf: 'center',
  },
  actionButtonText: {
    color: '#181111',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
