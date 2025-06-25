import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
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
    price: 2.99,
    priceUnit: 'lb',
    category: 'Fruits',
    brand: 'Fresh Farms',
    isOrganic: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdBiQE0Hss2_IgLejmveW2Ry3deWSBQyw8fp12SlA3Vz3l3jYysLHkwnRyRHHvivVf00fwvBchnzl7i60y9efSJxqmPZAe9vIV3pcIjdrhvnssdMSg-1jpAp5Njw0oC_EJCLOE1neMT8nsSeD29r-9zQO80Zd6_Jlhzglij8mrmH8-oZjftRVE9BRt1K5Wfnvq4YzNeTkYKDL1skzeVBvcvNJP8S5GTdZaNd8PVsVq-KnDeDAPRzyN448jlOydtSyeNTPR2HBqqJ03'
  },
  {
    id: 2,
    name: 'Fresh Bananas',
    price: 0.59,
    priceUnit: 'lb',
    category: 'Fruits',
    brand: 'Tropical Delights',
    isOrganic: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtygoOlSIxqQYw_HngdIIC7lqay65UNuVZlvCX9khP5bqaxY2EAPYZhitiQJJyBeoL6yK6CLYtXA2u9qdkTbDyV_d7MNOumfJVJ1U0mu5SyPic_SnQ2_Je0gCuKdvt7XIiLHUfVJy7viJfURLFQPR4BQLkoHkaPY6dVmMV5_lnKuCvSMFP3w6_OHpqoa6OtmTx3PagEVw0nnURDSAbyfQQJWts-Im-1iUd-UIGDGAb0_lqiYoMVJaCpVUV3Vol9y5GdC2aw17DeGcL'
  },
  {
    id: 3,
    name: 'Whole Milk',
    price: 3.49,
    priceUnit: 'gal',
    category: 'Dairy',
    brand: 'Farm Fresh',
    isOrganic: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNQzDh32yIQyPgHOR9BCOHbotC0PehkXbyrrp94vfk42o1_XNESJu11ZLznI0XM2eQx4mICVVWRmXyTYPOT-1Marec8xE3c4F-pIQkytPSa3AxuhQr4rKOZkswAHy7pvzk05f92k_sc3rJPLHTKy2rYrvI4CRseTfHEL6MkAM8TRMPZ8Nz3IdCUHkUHa5w59SZ_BA7aob63nIH9JagHu2HbVNURn7LMniXIcvVo4YM0ZzywsaVOBRjP_EYBrAZwlEYH7vKCIk2VlPY'
  },
  {
    id: 4,
    name: 'Free-Range Eggs',
    price: 4.99,
    priceUnit: 'dozen',
    category: 'Dairy',
    brand: 'Happy Hens',
    isOrganic: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh0r7IwspA1oEnqSb7d-XVX-wLdf4dSxpksHQlSjvf8iipu96L5z9Ls9RoeUF3kI_PRfoK9vrgBe3BNBnIZw1EdQJENQPth7oM-MqQdBIXLVd51gJuQ25WQ6P86pOWoPOba15qw98Ia9yuNW_e5_WRMkFjQW-suicCS-smYMq3ox5W_3JyVjhhyuKZIN3syg4ketoNqKxMynxF8FERWJy-vs5KvnIa_ccYeFXmA9Qhen18y7erR1H_Ywat7_PbBINa0bIcSh2ZqI1a'
  },
  {
    id: 5,
    name: 'Artisan Bread',
    price: 3.99,
    priceUnit: 'loaf',
    category: 'Bakery',
    brand: 'Crust & Crumb',
    isOrganic: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwNeYsLpWsobNf-kDLfds9YMnEU_U0AXEIV423nuKm02zlr0vSWSOax7SG3LlcpGFr0gYwIrGllwvKN7hoOEQuy-utrqsjMUdgY7D26NzhyIb5dR9krdV_a30hOw3DfUf7TRLDWWKE_PN-L84EhZL2BurBhvjThflviIeYEBEYa0_DQYYW0PezqFnao7PGaBWEjlbg7MgMLhVgUIklIhN5ZSeSE85LCXNcQveyzw3yP-czICbxrLschEysJ1zp6a0Z01DuqEqkSKi9'
  },
  {
    id: 6,
    name: 'Avocados',
    price: 1.99,
    priceUnit: 'each',
    category: 'Vegetables',
    brand: 'Green Valley',
    isOrganic: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpPmPydwivBPTAmkIP8KyGNyZzbcA5sYNuvJ6g9XJaK4Qo2IhA5GbjUaxoR8qaVXPUtrUqtT6qFgTbWsCJRlqcnjb1GXpq502QwDuKymICg7bYnhtEKih88VV5znpIxjYRLjs8dUC2qQSK0K5-vy2liWO-jtbT877xKNu5lnTQkHSWmi2UCoRY4iq1bdjqBp5rjyYpUX5GNpYiHBxnEf1POhBNgrWSsqTXuPBV2nMyUUN47jVyBt0lnzZu5XkQr-QIG69-9wOG6UN8'
  },
  {
    id: 7,
    name: 'Cheddar Cheese',
    price: 5.99,
    priceUnit: 'lb',
    category: 'Dairy',
    brand: 'Cheese Masters',
    isOrganic: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxkFWfSWqFVVLe9NeoIDycStEFlEXSi8_PFM3WkHd322F11p-hOd0y6_7Kxe7Gckr4i44kULJqnHEty2O-wTrxspjJ6qJDpl1wAzO2Y5zpOPgJW6-B9ua05vrp3O7yRnzUfupwm1b8IvC2_IanOYy0yQix0awMQ9En84K1xNUCaio5CKiE1Xmbfxn2XW0AEio8kdsatFpY2mgYcDV94W2o-xbS43eO84c_k2sYfGzlacxJemtCIg9bzAtjzKxqrR2Akxs-RwasxOEA'
  },
  {
    id: 9,
    name: 'Organic Spinach',
    price: 2.49,
    priceUnit: 'bag',
    category: 'Vegetables',
    brand: 'Fresh Greens',
    isOrganic: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkvvNPy6HBrBfwrEMhXPNA1UKvygj52kyJPbRh4G6q8a_76bXAa3zNYpW7ZKhlh-G6mPEYLHLEYKnqoHhnhk5hRyCMiu5FRkA6JLz1gioXIEc833U-HZ5eMkQIhIlUyA1wYsoDz187NOhjafHDWU9Abhnf-RwWIszp3ATvoPpYllbujSxjBEm2T9xrOW5x_HKC8mNVCGzNMdjOy9gp84NeJodbchWzexmGtmCKK2gZSz7mcwf7hrpJTd6NhT3NFfXBqbkT-AKwh26J'
  },
  {
    id: 10,
    name: 'Fresh Tomatoes',
    price: 2.99,
    priceUnit: 'lb',
    category: 'Vegetables',
    brand: 'Garden Fresh',
    isOrganic: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLIanKr_n7hiP36A-bXsnNzXNNOBZAkkAxJWuFGZj5AH4pnrkc32jyo-ULlJOBdaXUJ5-EyxaJ9AFD53ZtLgfqrAeQWxhAhEp8MxAVObiFUIL4YR-qyWKz1vWotLAizlN7xVkLWhvR-JunPrNwpOEfYvZdEBmfHLCBYwEXSx6-sfIqRodqzlv8dg5x53LZxrWWBTVyuC5u70ZXzLxIYWfKLGdW-T9OEog_QmPjFkdzgx97-stMHAQH-WsPM66SCR6bLkDh3De4IaZS'
  }
];

const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery'];
const sortOptions = ['Name', 'Price: Low to High', 'Price: High to Low', 'Organic First'];

export default function Categories() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Name');
  const [showFilters, setShowFilters] = useState(false);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10 });

  // Filter and sort products based on search criteria
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search text filter
      const matchesSearch = searchText === '' || 
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchText.toLowerCase()) ||
        product.category.toLowerCase().includes(searchText.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

      // Organic filter
      const matchesOrganic = !organicOnly || product.isOrganic;

      // Price range filter
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;

      return matchesSearch && matchesCategory && matchesOrganic && matchesPrice;
    });

    // Sort products
    switch (selectedSort) {
      case 'Price: Low to High':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'Organic First':
        filtered.sort((a, b) => (b.isOrganic ? 1 : 0) - (a.isOrganic ? 1 : 0));
        break;
      default: // Name
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchText, selectedCategory, selectedSort, organicOnly, priceRange]);

  const addToCart = (productId: number) => {
    // TODO: Implement add to cart functionality
    console.log('Added product', productId, 'to cart');
  };

  const clearFilters = () => {
    setSearchText('');
    setSelectedCategory('All');
    setSelectedSort('Name');
    setOrganicOnly(false);
    setPriceRange({ min: 0, max: 10 });
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
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Ionicons name="close-circle" size={20} color="#886364" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filter Buttons */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          <TouchableOpacity 
            style={[styles.filterButton, selectedCategory !== 'All' && styles.filterButtonActive]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Text style={[styles.filterText, selectedCategory !== 'All' && styles.filterTextActive]}>
              {selectedCategory}
            </Text>
            <Ionicons name="chevron-down" size={20} color={selectedCategory !== 'All' ? '#0a5718' : '#181111'} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, selectedSort !== 'Name' && styles.filterButtonActive]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Text style={[styles.filterText, selectedSort !== 'Name' && styles.filterTextActive]}>
              {selectedSort}
            </Text>
            <Ionicons name="chevron-down" size={20} color={selectedSort !== 'Name' ? '#0a5718' : '#181111'} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, (organicOnly || priceRange.min > 0 || priceRange.max < 10) && styles.filterButtonActive]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Text style={[styles.filterText, (organicOnly || priceRange.min > 0 || priceRange.max < 10) && styles.filterTextActive]}>
              Filter
            </Text>
            <Ionicons name="chevron-down" size={20} color={(organicOnly || priceRange.min > 0 || priceRange.max < 10) ? '#0a5718' : '#0a5718'} />
          </TouchableOpacity>

          {(selectedCategory !== 'All' || selectedSort !== 'Name' || organicOnly || priceRange.min > 0 || priceRange.max < 10 || searchText.length > 0) && (
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        {/* Expanded Filters */}
        {showFilters && (
          <View style={styles.expandedFilters}>
            {/* Category Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[styles.categoryChip, selectedCategory === category && styles.categoryChipActive]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text style={[styles.categoryChipText, selectedCategory === category && styles.categoryChipTextActive]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Sort Options */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Sort By</Text>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.sortOption, selectedSort === option && styles.sortOptionActive]}
                  onPress={() => setSelectedSort(option)}
                >
                  <Text style={[styles.sortOptionText, selectedSort === option && styles.sortOptionTextActive]}>
                    {option}
                  </Text>
                  {selectedSort === option && (
                    <Ionicons name="checkmark" size={16} color="#0a5718" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Organic Filter */}
            <View style={styles.filterSection}>
              <TouchableOpacity
                style={styles.organicFilter}
                onPress={() => setOrganicOnly(!organicOnly)}
              >
                <View style={[styles.checkbox, organicOnly && styles.checkboxActive]}>
                  {organicOnly && <Ionicons name="checkmark" size={12} color="white" />}
                </View>
                <Text style={styles.organicFilterText}>Organic products only</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Search Results Count */}
        {searchText.length > 0 && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsText}>
              {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchText}"
            </Text>
          </View>
        )}

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productImageContainer}>
                  <Image 
                    source={{ uri: product.image }} 
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                  {product.isOrganic && (
                    <View style={styles.organicBadge}>
                      <Text style={styles.organicBadgeText}>Organic</Text>
                    </View>
                  )}
                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => addToCart(product.id)}
                  >
                    <Ionicons name="add" size={20} color="white" />
                  </TouchableOpacity>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productBrand}>{product.brand}</Text>
                  <Text style={styles.productPrice}>${product.price.toFixed(2)}/{product.priceUnit}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.noResults}>
              <Ionicons name="search" size={48} color="#886364" />
              <Text style={styles.noResultsTitle}>No products found</Text>
              <Text style={styles.noResultsText}>Try adjusting your search or filters</Text>
              <TouchableOpacity style={styles.clearAllButton} onPress={clearFilters}>
                <Text style={styles.clearAllButtonText}>Clear All Filters</Text>
              </TouchableOpacity>
            </View>
          )}
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
    marginLeft: 48,
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
  filterButtonActive: {
    backgroundColor: '#e6f3e6',
    borderColor: '#0a5718',
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#181111',
  },
  filterTextActive: {
    color: '#0a5718',
  },
  clearButton: {
    backgroundColor: '#f4f0f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#886364',
  },
  expandedFilters: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#f8f9fa',
  },
  filterSection: {
    marginBottom: 16,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181111',
    marginBottom: 8,
  },
  categoryChip: {
    backgroundColor: '#f4f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#0a5718',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#181111',
  },
  categoryChipTextActive: {
    color: 'white',
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 4,
  },
  sortOptionActive: {
    backgroundColor: '#e6f3e6',
    borderColor: '#0a5718',
    borderWidth: 1,
  },
  sortOptionText: {
    fontSize: 14,
    color: '#181111',
  },
  sortOptionTextActive: {
    color: '#0a5718',
    fontWeight: '600',
  },
  organicFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#886364',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#0a5718',
    borderColor: '#0a5718',
  },
  organicFilterText: {
    fontSize: 14,
    color: '#181111',
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsText: {
    fontSize: 14,
    color: '#886364',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  productCard: {
    width: (width - 44) / 2,
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
  organicBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#0a5718',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  organicBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
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
  productBrand: {
    fontSize: 12,
    color: '#886364',
  },
  productPrice: {
    fontSize: 14,
    color: '#181111',
    fontWeight: '600',
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
    width: '100%',
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181111',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: '#886364',
    textAlign: 'center',
    marginBottom: 16,
  },
  clearAllButton: {
    backgroundColor: '#0a5718',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  clearAllButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
});
