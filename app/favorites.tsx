import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const MAX_WIDTH = 480;

// Shopping lists with items
const shoppingLists = [
  {
    id: 1,
    name: 'Weekly Groceries',
    itemCount: 12,
    lastUpdated: '2024-01-15',
    color: '#0a5718',
    items: [
      { id: 1, name: 'Organic Apples', price: 2.99, priceUnit: 'lb', quantity: 2, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdBiQE0Hss2_IgLejmveW2Ry3deWSBQyw8fp12SlA3Vz3l3jYysLHkwnRyRHHvivVf00fwvBchnzl7i60y9efSJxqmPZAe9vIV3pcIjdrhvnssdMSg-1jpAp5Njw0oC_EJCLOE1neMT8nsSeD29r-9zQO80Zd6_Jlhzglij8mrmH8-oZjftRVE9BRt1K5Wfnvq4YzNeTkYKDL1skzeVBvcvNJP8S5GTdZaNd8PVsVq-KnDeDAPRzyN448jlOydtSyeNTPR2HBqqJ03' },
      { id: 2, name: 'Fresh Bananas', price: 0.59, priceUnit: 'lb', quantity: 3, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtygoOlSIxqQYw_HngdIIC7lqay65UNuVZlvCX9khP5bqaxY2EAPYZhitiQJJyBeoL6yK6CLYtXA2u9qdkTbDyV_d7MNOumfJVJ1U0mu5SyPic_SnQ2_Je0gCuKdvt7XIiLHUfVJy7viJfURLFQPR4BQLkoHkaPY6dVmMV5_lnKuCvSMFP3w6_OHpqoa6OtmTx3PagEVw0nnURDSAbyfQQJWts-Im-1iUd-UIGDGAb0_lqiYoMVJaCpVUV3Vol9y5GdC2aw17DeGcL' },
      { id: 3, name: 'Whole Milk', price: 3.49, priceUnit: 'gal', quantity: 1, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNQzDh32yIQyPgHOR9BCOHbotC0PehkXbyrrp94vfk42o1_XNESJu11ZLznI0XM2eQx4mICVVWRmXyTYPOT-1Marec8xE3c4F-pIQkytPSa3AxuhQr4rKOZkswAHy7pvzk05f92k_sc3rJPLHTKy2rYrvI4CRseTfHEL6MkAM8TRMPZ8Nz3IdCUHkUHa5w59SZ_BA7aob63nIH9JagHu2HbVNURn7LMniXIcvVo4YM0ZzywsaVOBRjP_EYBrAZwlEYH7vKCIk2VlPY' }
    ]
  },
  {
    id: 2,
    name: 'Party Shopping',
    itemCount: 8,
    lastUpdated: '2024-01-14',
    color: '#d69e2e',
    items: [
      { id: 4, name: 'Cheddar Cheese', price: 5.99, priceUnit: 'lb', quantity: 2, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxkFWfSWqFVVLe9NeoIDycStEFlEXSi8_PFM3WkHd322F11p-hOd0y6_7Kxe7Gckr4i44kULJqnHEty2O-wTrxspjJ6qJDpl1wAzO2Y5zpOPgJW6-B9ua05vrp3O7yRnzUfupwm1b8IvC2_IanOYy0yQix0awMQ9En84K1xNUCaio5CKiE1Xmbfxn2XW0AEio8kdsatFpY2mgYcDV94W2o-xbS43eO84c_k2sYfGzlacxJemtCIg9bzAtjzKxqrR2Akxs-RwasxOEA' },
      { id: 5, name: 'Ground Beef', price: 6.99, priceUnit: 'lb', quantity: 3, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByDLyTdN7eamcsTe4B-WSgEfdcUJC8g4aGUvDVa_Fjw_UN2bTAz9L41v_KNDaBzJjJtzq4Dja0VzLav9laa9cNkLS6el78ksioiM3zDn9T6LXWMEt_Pv1rod-VQnCli-Kjpp1k7T-8oj3iDk1CvUEqdVuf-TXZk_aqByYmLL_C-3bv8hXMHpvZ8FVqdj-Sptsthj_cT3dEU_QAoEShgt8i3wU9NPDNcMcl3S4CNAVfz-9x4LFpV4ocJw9eacUjYpTLUElnkQxs3aSE' }
    ]
  },
  {
    id: 3,
    name: 'Pantry Essentials',
    itemCount: 15,
    lastUpdated: '2024-01-10',
    color: '#667eea',
    items: [
      { id: 6, name: 'Artisan Bread', price: 3.99, priceUnit: 'loaf', quantity: 2, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwNeYsLpWsobNf-kDLfds9YMnEU_U0AXEIV423nuKm02zlr0vSWSOax7SG3LlcpGFr0gYwIrGllwvKN7hoOEQuy-utrqsjMUdgY7D26NzhyIb5dR9krdV_a30hOw3DfUf7TRLDWWKE_PN-L84EhZL2BurBhvjThflviIeYEBEYa0_DQYYW0PezqFnao7PGaBWEjlbg7MgMLhVgUIklIhN5ZSeSE85LCXNcQveyzw3yP-czICbxrLschEysJ1zp6a0Z01DuqEqkSKi9' },
      { id: 7, name: 'Free-Range Eggs', price: 4.99, priceUnit: 'dozen', quantity: 1, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh0r7IwspA1oEnqSb7d-XVX-wLdf4dSxpksHQlSjvf8iipu96L5z9Ls9RoeUF3kI_PRfoK9vrgBe3BNBnIZw1EdQJENQPth7oM-MqQdBIXLVd51gJuQ25WQ6P86pOWoPOba15qw98Ia9yuNW_e5_WRMkFjQW-suicCS-smYMq3ox5W_3JyVjhhyuKZIN3syg4ketoNqKxMynxF8FERWJy-vs5KvnIa_ccYeFXmA9Qhen18y7erR1H_Ywat7_PbBINa0bIcSh2ZqI1a' }
    ]
  },
  {
    id: 4,
    name: 'Healthy Meals',
    itemCount: 6,
    lastUpdated: '2024-01-12',
    color: '#38b2ac',
    items: [
      { id: 8, name: 'Avocados', price: 1.99, priceUnit: 'each', quantity: 4, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpPmPydwivBPTAmkIP8KyGNyZzbcA5sYNuvJ6g9XJaK4Qo2IhA5GbjUaxoR8qaVXPUtrUqtT6qFgTbWsCJRlqcnjb1GXpq502QwDuKymICg7bYnhtEKih88VV5znpIxjYRLjs8dUC2qQSK0K5-vy2liWO-jtbT877xKNu5lnTQkHSWmi2UCoRY4iq1bdjqBp5rjyYpUX5GNpYiHBxnEf1POhBNgrWSsqTXuPBV2nMyUUN47jVyBt0lnzZu5XkQr-QIG69-9wOG6UN8' }
    ]
  }
];

export default function Favorites() {
  const router = useRouter();
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());

  const addToCart = (productId: number, productName: string) => {
    console.log('Added product', productId, 'to cart');
    setAddedItems(prev => new Set(prev).add(productId));
    
    Alert.alert(
      'Added to Cart!',
      `${productName} has been added to your shopping cart.`,
      [
        { text: 'Continue Shopping', style: 'default' },
        { text: 'View Cart', onPress: () => router.push('/cart') }
      ]
    );
  };

  const addListToCart = (listId: number) => {
    const list = shoppingLists.find(l => l.id === listId);
    if (!list) return;
    
    const allIds = list.items.map(item => item.id);
    setAddedItems(prev => new Set([...prev, ...allIds]));
    
    Alert.alert(
      'Added List to Cart!',
      `All ${list.items.length} items from "${list.name}" have been added to your cart.`,
      [
        { text: 'Continue Shopping', style: 'default' },
        { text: 'View Cart', onPress: () => router.push('/cart') }
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getSelectedList = () => {
    return shoppingLists.find(list => list.id === selectedList);
  };

  if (selectedList) {
    const list = getSelectedList();
    if (!list) return null;

    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setSelectedList(null)}
            >
              <Ionicons name="arrow-back" size={24} color="#181111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{list.name}</Text>
            <TouchableOpacity 
              style={styles.cartButton}
              onPress={() => router.push('/cart')}
            >
              <FontAwesome name="shopping-cart" size={24} color="#181111" />
            </TouchableOpacity>
          </View>

          {/* List Info */}
          <View style={styles.listInfo}>
            <View style={[styles.listColorIndicator, { backgroundColor: list.color }]} />
            <View style={styles.listDetails}>
              <Text style={styles.listItemCount}>{list.itemCount} items</Text>
              <Text style={styles.listLastUpdated}>Updated {formatDate(list.lastUpdated)}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.addListButton, { backgroundColor: list.color }]}
              onPress={() => addListToCart(list.id)}
            >
              <Ionicons name="add-circle" size={20} color="white" />
              <Text style={styles.addListButtonText}>Add All</Text>
            </TouchableOpacity>
          </View>

          {/* Items in List */}
          <View style={styles.itemsContainer}>
            {list.items.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemImageContainer}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
                </View>
                
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}/{item.priceUnit}</Text>
                  <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                </View>
                
                <TouchableOpacity 
                  style={[
                    styles.addToCartButton, 
                    addedItems.has(item.id) && styles.addedToCartButton
                  ]}
                  onPress={() => addToCart(item.id, item.name)}
                  disabled={addedItems.has(item.id)}
                >
                  {addedItems.has(item.id) ? (
                    <>
                      <Ionicons name="checkmark" size={16} color="white" />
                      <Text style={styles.addToCartButtonText}>Added</Text>
                    </>
                  ) : (
                    <>
                      <Ionicons name="add" size={16} color="white" />
                      <Text style={styles.addToCartButtonText}>Add</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shopping Lists</Text>
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => router.push('/cart')}
          >
            <FontAwesome name="shopping-cart" size={24} color="#181111" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.createListButton}
            onPress={() => Alert.alert('Create List', 'Create new list feature coming soon!')}
          >
            <Ionicons name="add-circle" size={20} color="white" />
            <Text style={styles.createListButtonText}>Create New List</Text>
          </TouchableOpacity>
        </View>

        {/* Lists Grid */}
        <View style={styles.listsContainer}>
          {shoppingLists.map((list) => (
            <TouchableOpacity
              key={list.id}
              style={styles.listCard}
              onPress={() => setSelectedList(list.id)}
              activeOpacity={0.8}
            >
              <View style={[styles.listHeader, { backgroundColor: list.color }]}>
                <Text style={styles.listName}>{list.name}</Text>
                <Text style={styles.listItemCount}>{list.itemCount} items</Text>
              </View>
              
              <View style={styles.listFooter}>
                <Text style={styles.listLastUpdated}>Updated {formatDate(list.lastUpdated)}</Text>
                <TouchableOpacity 
                  style={[styles.addListButton, { backgroundColor: list.color }]}
                  onPress={(e) => {
                    e.stopPropagation();
                    addListToCart(list.id);
                  }}
                >
                  <Ionicons name="add" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State */}
        {shoppingLists.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="list-outline" size={64} color="#886364" />
            <Text style={styles.emptyStateTitle}>No Shopping Lists</Text>
            <Text style={styles.emptyStateText}>
              Create your first shopping list to get started!
            </Text>
            <TouchableOpacity 
              style={styles.createListButton}
              onPress={() => Alert.alert('Create List', 'Create new list feature coming soon!')}
            >
              <Text style={styles.createListButtonText}>Create First List</Text>
            </TouchableOpacity>
          </View>
        )}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181111',
  },
  cartButton: {
    padding: 8,
    borderRadius: 20,
  },
  quickActions: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  createListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a5718',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
  },
  createListButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  listsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  listCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  listHeader: {
    padding: 16,
  },
  listName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  listItemCount: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  listFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f8f9fa',
  },
  listLastUpdated: {
    fontSize: 12,
    color: '#886364',
  },
  addListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  addListButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  listInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  listColorIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  listDetails: {
    flex: 1,
  },
  itemsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  itemImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181111',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a5718',
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: 12,
    color: '#886364',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a5718',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  addedToCartButton: {
    backgroundColor: '#886364',
  },
  addToCartButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181111',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#886364',
    textAlign: 'center',
    marginBottom: 24,
  },
}); 