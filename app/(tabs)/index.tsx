import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const CARD_WIDTH = width * 0.6;
const CARD_SPACING = 16;


export default function Index() {
  const userName = "John";
  const currentPoints = 1250;
  const nextLevelPoints = 1500;
  const progress = (currentPoints / nextLevelPoints) * 100;

  const bannerAds = [
    'Welcome to Fresh Foods Market!',
    'Get 10% off on your first order!',
    'Free delivery on orders over $50!',
    'Check out our weekly deals!',
  ];

    // 2. State for current banner
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerAds.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [bannerAds.length]);

  const featuredCategories = [
    { name: 'Fruits', image: require('../../assets/images/categories/fruits.png') },
    { name: 'Vegetables', image: require('../../assets/images/categories/veggies.png') },
    { name: 'Dairy', image: require('../../assets/images/categories/dairy.png') },
    { name: 'Spices', image: require('../../assets/images/categories/spices.webp') },
  ];

  const carouselItems = [
    {
      title: 'Farm Fresh Deals',
      subtitle: 'Save on the freshest produce',
      image: require('../../assets/images/carousel/groceryStore.jpg'),
    },
    {
      title: 'Organic Selections',
      subtitle: 'Healthy choices for a healthy you',
      image: require('../../assets/images/carousel/grains.png'),
    },
    {
      title: 'Seasonal Harvest',
      subtitle: 'Enjoy the best of every season',
      image: require('../../assets/images/carousel/grainy.jpeg'),
    },
  ];

  const router = useRouter();

  return (
    <SafeAreaView 
      edges={['top']} 
      style={{ 
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
      }}>
        <View style={{ width: 24 }} />
        <Text style={{ 
          fontSize: 18, 
          fontWeight: 'bold',
          color: '#181111',
        }}>
          Fresh Foods Market
        </Text>
        <Link href={"/cart"}>
          <FontAwesome name="shopping-cart" size={24} color="#181111" />
        </Link>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Search Bar Section */}
        <View style={{ padding: 16 }}>
          <View style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f4f0f0',
            borderRadius: 12,
            padding: 12,
          }}>
            <FontAwesome name="search" size={24} color="#886364" />
            <TextInput
              placeholder="Search for groceries"
              style={{
                flex: 1,
                marginLeft: 8,
                fontSize: 16,
                color: '#181111',
              }}
              placeholderTextColor="#886364"
            />
          </View>
        </View>

        {/* Welcome Message + Purchase History Button */}
        <View style={{ 
  flexDirection: 'row', 
  alignItems: 'center', 
  justifyContent: 'space-between', 
  paddingHorizontal: 16, 
  marginBottom: 16 
}}>
  <Text style={{ 
    fontSize: 18,
    fontWeight: '500',
    color: '#181111',
  }}>
    Welcome, {userName}
  </Text>
  <Link href={"/purchaseHistory"}
    style={{
      backgroundColor: '#f4f0f0',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 24,
      alignItems: 'center',
      marginLeft: 12,
    }}
  >
    <Text style={{ 
      fontSize: 14,
      fontWeight: 'bold',
      color: '#181111',
    }}>
      Purchase History
    </Text>
  </Link>
</View>


        {/* Points Section */}
        <View style={{ padding: 14 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontSize: 16, color: '#181111', fontWeight: '500' }}>
              Your Points: {currentPoints.toLocaleString()}
            </Text>
          </View>
          
          <View style={{ 
            height: 8,
            backgroundColor: '#e5dcdc',
            borderRadius: 4,
            marginBottom: 8,
          }}>
            <View 
              style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: '#181111',
                borderRadius: 4,
              }}
            />
          </View>
          
          <Text style={{ fontSize: 14, color: '#886364' }}>
            Next Level: {nextLevelPoints.toLocaleString()}
          </Text>
        </View>
    
    
    
     {/* Banner Section */}
      <View
        style={{
          marginHorizontal: 0,
          marginTop: 10,
          marginBottom: 16,
          backgroundColor: '#0a5718',
          minHeight: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#ffffff', textAlign: 'center' }}>
          {bannerAds[bannerIndex]}
        </Text>
      </View>


      
<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{
    paddingHorizontal: (width - CARD_WIDTH) / 2,
    paddingLeft: 16, // controls left space
    // paddingRight: 16, // controls right space
  }}
>
  {carouselItems.map((item, idx) => (
    <View
      key={item.title}
      style={{
        width: CARD_WIDTH,
        marginRight: idx === carouselItems.length - 1 ? 0 : CARD_SPACING,
        backgroundColor: '#f4f0f0',
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      <Image
        source={item.image}
        style={{ width: '100%', height: 100 }}
        resizeMode="cover"
      />
      <View style={{ padding: 12 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#181111' }}>{item.title}</Text>
        <Text style={{ color: '#886364', fontSize: 13 }}>{item.subtitle}</Text>
      </View>
    </View>
  ))}
</ScrollView>


        {/* Featured Categories */}
        <View style={{ padding: 16 }}>
          <Text style={{ 
            fontSize: 22,
            fontWeight: 'bold',
            color: '#181111',
            marginBottom: 16,
          }}>
            Featured Categories
          </Text>
          
          <View style={{ 
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
            {featuredCategories.map((category, index) => (
              <View 
                key={index}
                style={{
                  width: (width - 48) / 2,
                  marginBottom: 16,
                  alignItems: 'center',
                }}
              >
                <Image
                  source={category.image}                  style={{
                    width: (width - 48) / 3,
                    height: (width - 48) / 3,
                    borderRadius: 12,
                    marginBottom: 8,
                    backgroundColor: '#f4f0f0',
                  }}
                  resizeMode="contain"
                />
                <Text style={{ 
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#181111',
                }}>
                  {category.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
