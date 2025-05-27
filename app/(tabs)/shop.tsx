import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/mocks/products';
import { Search, Filter } from 'lucide-react-native';
import { CartIcon } from '@/components/CartIcon';

export default function ShopScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    { id: 'food', name: 'Alimentos' },
    { id: 'toys', name: 'Juguetes' },
    { id: 'accessories', name: 'Accesorios' },
    { id: 'hygiene', name: 'Higiene' },
    { id: 'medicine', name: 'Medicamentos' }
  ];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  const featuredProducts = products.filter(product => product.featured);

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Pet Shop</Text>
        <CartIcon />
      </View>
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar productos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.textLight}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          <TouchableOpacity
            style={[
              styles.categoryPill, 
              selectedCategory === null && styles.categoryPillActive
            ]}
            onPress={() => setSelectedCategory(null)}
            activeOpacity={0.8}
          >
            <Text 
              style={[
                styles.categoryPillText,
                selectedCategory === null && styles.categoryPillTextActive
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>
          
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryPill, 
                selectedCategory === category.id && styles.categoryPillActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
              activeOpacity={0.8}
            >
              <Text 
                style={[
                  styles.categoryPillText,
                  selectedCategory === category.id && styles.categoryPillTextActive
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {featuredProducts.length > 0 && !searchQuery && !selectedCategory && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Productos Destacados</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredContainer}
            >
              {featuredProducts.map((product) => (
                <View key={product.id} style={styles.featuredProductCard}>
                  <ProductCard
                    product={product}
                    onPress={() => handleProductPress(product.id)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory 
              ? categories.find(c => c.id === selectedCategory)?.name 
              : searchQuery 
                ? 'Resultados de búsqueda' 
                : 'Todos los productos'}
          </Text>
          
          <View style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <ProductCard
                  product={product}
                  onPress={() => handleProductPress(product.id)}
                />
              </View>
            ))}
          </View>
          
          {filteredProducts.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No se encontraron productos</Text>
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
    backgroundColor: Colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    ...Typography.heading1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
  },
  categoriesContainer: {
    paddingVertical: 16,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.cardBackground,
    marginRight: 8,
  },
  categoryPillActive: {
    backgroundColor: Colors.primary,
  },
  categoryPillText: {
    ...Typography.bodySmall,
    color: Colors.textLight,
  },
  categoryPillTextActive: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  featuredSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Typography.heading3,
    marginBottom: 16,
  },
  featuredContainer: {
    paddingBottom: 8,
  },
  featuredProductCard: {
    width: 200,
    marginRight: 16,
  },
  productsSection: {
    marginBottom: 24,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
  },
  emptyStateText: {
    ...Typography.body,
    color: Colors.textLight,
  },
});