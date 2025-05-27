import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Button } from '@/components/Button';
import { products } from '@/mocks/products';
import { useCartStore } from '@/store/cartStore';
import { ArrowLeft, Heart, ShoppingCart, Minus, Plus } from 'lucide-react-native';
import { CartIcon } from '@/components/CartIcon';

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = React.useState(1);
  const [liked, setLiked] = React.useState(false);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Producto no encontrado</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backLink}>Volver a la tienda</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const handleAddToCart = () => {
    addItem(product, quantity);
    router.push('/cart');
  };
  
  const handleIncrease = () => {
    setQuantity(prev => Math.min(prev + 1, product.stock));
  };
  
  const handleDecrease = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };
  
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };
  
  // Find related products (same category)
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <ArrowLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        
        <CartIcon />
      </View>
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>
            {product.category === 'food' ? 'Alimentos' :
             product.category === 'toys' ? 'Juguetes' :
             product.category === 'accessories' ? 'Accesorios' :
             product.category === 'hygiene' ? 'Higiene' : 'Medicamentos'}
          </Text>
        </View>
        
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{product.name}</Text>
            <TouchableOpacity 
              style={[styles.likeButton, liked && styles.likedButton]}
              onPress={() => setLiked(!liked)}
              activeOpacity={0.8}
            >
              <Heart 
                size={20} 
                color={liked ? Colors.background : Colors.primary}
                fill={liked ? Colors.primary : 'transparent'}
              />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          
          <Text style={styles.description}>{product.description}</Text>
          
          <View style={styles.stockInfo}>
            <Text style={styles.stockLabel}>Disponibilidad:</Text>
            <Text style={[
              styles.stockValue, 
              product.stock > 0 ? styles.inStock : styles.outOfStock
            ]}>
              {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
            </Text>
          </View>
          
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Cantidad:</Text>
            
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={[styles.quantityButton, quantity <= 1 && styles.disabledButton]} 
                onPress={handleDecrease}
                disabled={quantity <= 1}
                activeOpacity={0.8}
              >
                <Minus size={18} color={quantity <= 1 ? Colors.textLight : Colors.text} />
              </TouchableOpacity>
              
              <Text style={styles.quantity}>{quantity}</Text>
              
              <TouchableOpacity 
                style={[styles.quantityButton, quantity >= product.stock && styles.disabledButton]} 
                onPress={handleIncrease}
                disabled={quantity >= product.stock}
                activeOpacity={0.8}
              >
                <Plus size={18} color={quantity >= product.stock ? Colors.textLight : Colors.text} />
              </TouchableOpacity>
            </View>
          </View>
          
          <Button
            title="Agregar al carrito"
            onPress={handleAddToCart}
            style={styles.addToCartButton}
            disabled={product.stock === 0}
          />
          
          {relatedProducts.length > 0 && (
            <View style={styles.relatedSection}>
              <Text style={styles.relatedTitle}>Productos relacionados</Text>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.relatedContainer}
              >
                {relatedProducts.map((relatedProduct) => (
                  <TouchableOpacity 
                    key={relatedProduct.id}
                    style={styles.relatedItem}
                    onPress={() => {
                      router.push(`/product/${relatedProduct.id}`);
                    }}
                    activeOpacity={0.8}
                  >
                    <Image 
                      source={{ uri: relatedProduct.image }} 
                      style={styles.relatedImage} 
                    />
                    <View style={styles.relatedContent}>
                      <Text style={styles.relatedName} numberOfLines={2}>{relatedProduct.name}</Text>
                      <Text style={styles.relatedPrice}>{formatPrice(relatedProduct.price)}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  categoryContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255, 138, 158, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  category: {
    ...Typography.caption,
    color: Colors.background,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    ...Typography.heading1,
    flex: 1,
    marginRight: 16,
  },
  likeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likedButton: {
    backgroundColor: Colors.primary,
  },
  price: {
    ...Typography.heading2,
    color: Colors.primary,
    marginBottom: 16,
  },
  description: {
    ...Typography.body,
    lineHeight: 24,
    marginBottom: 24,
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stockLabel: {
    ...Typography.body,
    fontWeight: 'bold',
    marginRight: 8,
  },
  stockValue: {
    ...Typography.body,
  },
  inStock: {
    color: Colors.success,
  },
  outOfStock: {
    color: Colors.error,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  quantityLabel: {
    ...Typography.body,
    fontWeight: 'bold',
    marginRight: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  quantity: {
    ...Typography.heading3,
    marginHorizontal: 16,
  },
  addToCartButton: {
    marginBottom: 32,
  },
  relatedSection: {
    marginTop: 16,
  },
  relatedTitle: {
    ...Typography.heading3,
    marginBottom: 16,
  },
  relatedContainer: {
    paddingBottom: 16,
  },
  relatedItem: {
    width: 160,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
  },
  relatedImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  relatedContent: {
    padding: 12,
  },
  relatedName: {
    ...Typography.bodySmall,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  relatedPrice: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  errorText: {
    ...Typography.heading2,
    textAlign: 'center',
    marginBottom: 16,
  },
  backLink: {
    ...Typography.body,
    color: Colors.primary,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});