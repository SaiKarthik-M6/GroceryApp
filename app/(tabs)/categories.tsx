import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const MAX_WIDTH = 480;

const products = [
  {
    id: 1,
    name: 'Organic Apples',
    price: '$2.99/lb',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdBiQE0Hss2_IgLejmveW2Ry3deWSBQyw8fp12SlA3Vz3l3jYysLHkwnRyRHHvivVf00fwvBchnzl7i60y9efSJxqmPZAe9vIV3pcIjdrhvnssdMSg-1jpAp5Njw0oC_EJCLOE1neMT8nsSeD29r-9zQO80Zd6_Jlhzglij8mrmH8-oZjftRVE9BRt1K5Wfnvq4YzNeTkYKDL1skzeVBvcvNJP8S5GTdZaNd8PVsVq-KnDeDAPRzyN448jlOydtSyeNTPR2HBqqJ03'
  },
  {
    id: 2,
    name: 'Fresh Bananas',
    price: '$0.59/lb',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtygoOlSIxqQYw_HngdIIC7lqay65UNuVZlvCX9khP5bqaxY2EAPYZhitiQJJyBeoL6yK6CLYtXA2u9qdkTbDyV_d7MNOumfJVJ1U0mu5SyPic_SnQ2_Je0gCuKdvt7XIiLHUfVJy7viJfURLFQPR4BQLkoHkaPY6dVmMV5_lnKuCvSMFP3w6_OHpqoa6OtmTx3PagEVw0nnURDSAbyfQQJWts-Im-1iUd-UIGDGAb0_lqiYoMVJaCpVUV3Vol9y5GdC2aw17DeGcL'
  },
  {
    id: 3,
    name: 'Whole Milk',
    price: '$3.49/gal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNQzDh32yIQyPgHOR9BCOHbotC0PehkXbyrrp94vfk42o1_XNESJu11ZLznI0XM2eQx4mICVVWRmXyTYPOT-1Marec8xE3c4F-pIQkytPSa3AxuhQr4rKOZkswAHy7pvzk05f92k_sc3rJPLHTKy2rYrvI4CRseTfHEL6MkAM8TRMPZ8Nz3IdCUHkUHa5w59SZ_BA7aob63nIH9JagHu2HbVNURn7LMniXIcvVo4YM0ZzywsaVOBRjP_EYBrAZwlEYH7vKCIk2VlPY'
  },
  {
    id: 4,
    name: 'Free-Range Eggs',
    price: '$4.99/dozen',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh0r7IwspA1oEnqSb7d-XVX-wLdf4dSxpksHQlSjvf8iipu96L5z9Ls9RoeUF3kI_PRfoK9vrgBe3BNBnIZw1EdQJENQPth7oM-MqQdBIXLVd51gJuQ25WQ6P86pOWoPOba15qw98Ia9yuNW_e5_WRMkFjQW-suicCS-smYMq3ox5W_3JyVjhhyuKZIN3syg4ketoNqKxMynxF8FERWJy-vs5KvnIa_ccYeFXmA9Qhen18y7erR1H_Ywat7_PbBINa0bIcSh2ZqI1a'
  },
  {
    id: 5,
    name: 'Artisan Bread',
    price: '$3.99/loaf',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwNeYsLpWsobNf-kDLfds9YMnEU_U0AXEIV423nuKm02zlr0vSWSOax7SG3LlcpGFr0gYwIrGllwvKN7hoOEQuy-utrqsjMUdgY7D26NzhyIb5dR9krdV_a30hOw3DfUf7TRLDWWKE_PN-L84EhZL2BurBhvjThflviIeYEBEYa0_DQYYW0PezqFnao7PGaBWEjlbg7MgMLhVgUIklIhN5ZSeSE85LCXNcQveyzw3yP-czICbxrLschEysJ1zp6a0Z01DuqEqkSKi9'
  },
  {
    id: 6,
    name: 'Avocados',
    price: '$1.99/each',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpPmPydwivBPTAmkIP8KyGNyZzbcA5sYNuvJ6g9XJaK4Qo2IhA5GbjUaxoR8qaVXPUtrUqtT6qFgTbWsCJRlqcnjb1GXpq502QwDuKymICg7bYnhtEKih88VV5znpIxjYRLjs8dUC2qQSK0K5-vy2liWO-jtbT877xKNu5lnTQkHSWmi2UCoRY4iq1bdjqBp5rjyYpUX5GNpYiHBxnEf1POhBNgrWSsqTXuPBV2nMyUUN47jVyBt0lnzZu5XkQr-QIG69-9wOG6UN8'
  },
  {
    id: 7,
    name: 'Cheddar Cheese',
    price: '$5.99/lb',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxkFWfSWqFVVLe9NeoIDycStEFlEXSi8_PFM3WkHd322F11p-hOd0y6_7Kxe7Gckr4i44kULJqnHEty2O-wTrxspjJ6qJDpl1wAzO2Y5zpOPgJW6-B9ua05vrp3O7yRnzUfupwm1b8IvC2_IanOYy0yQix0awMQ9En84K1xNUCaio5CKiE1Xmbfxn2XW0AEio8kdsatFpY2mgYcDV94W2o-xbS43eO84c_k2sYfGzlacxJemtCIg9bzAtjzKxqrR2Akxs-RwasxOEA'
  },
  {
    id: 8,
    name: 'Ground Beef',
    price: '$6.99/lb',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByDLyTdN7eamcsTe4B-WSgEfdcUJC8g4aGUvDVa_Fjw_UN2bTAz9L41v_KNDaBzJjJtzq4Dja0VzLav9laa9cNkLS6el78ksioiM3zDn9T6LXWMEt_Pv1rod-VQnCli-Kjpp1k7T-8oj3iDk1CvUEqdVuf-TXZk_aqByYmLL_C-3bv8hXMHpvZ8FVqdj-Sptsthj_cT3dEU_QAoEShgt8i3wU9NPDNcMcl3S4CNAVfz-9x4LFpV4ocJw9eacUjYpTLUElnkQxs3aSE'
  }
];

export default function Categories() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const addToCart = (productId: number) => {
    // TODO: Implement add to cart functionality
    console.log('Added product', productId, 'to cart');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Groceries</Text>
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => router.push('/cart')}
          >
            <FontAwesome name="shopping-cart" size={24} color="#181111" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <FontAwesome name="search" size={24} color="#886364" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for products"
              placeholderTextColor="#886364"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Filter Buttons */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Category</Text>
            <Ionicons name="chevron-down" size={20} color="#181111" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Sort</Text>
            <Ionicons name="chevron-down" size={20} color="#181111" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Filter</Text>
            <Ionicons name="chevron-down" size={20} color="#181111" />
          </TouchableOpacity>
        </ScrollView>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productImageContainer}>
                <Image 
                  source={{ uri: product.image }} 
                  style={styles.productImage}
                  resizeMode="cover"
                />
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => addToCart(product.id)}
                >
                  <Ionicons name="add" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181111',
    marginLeft: 48, // Offset for cart button
  },
  cartButton: {
    width: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f0f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#181111',
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  filterContent: {
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f0f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 4,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#181111',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  productCard: {
    width: (width - 44) / 2, // 2 columns with gap
    marginBottom: 12,
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  addButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#181111',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    gap: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#181111',
  },
  productPrice: {
    fontSize: 14,
    color: '#886364',
  },
});
