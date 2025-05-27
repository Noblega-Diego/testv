import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Button } from '@/components/Button';
import { CartItem } from '@/components/CartItem';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react-native';

export default function CartScreen() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  
  const handleCheckout = () => {
    Alert.alert(
      'Proceder al pago',
      '¿Deseas continuar con la compra?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Continuar',
          onPress: () => {
            // Here would go the checkout logic
            Alert.alert('Compra realizada', 'Tu pedido ha sido procesado correctamente.');
            clearCart();
            router.push('/(tabs)');
          },
        },
      ]
    );
  };
  
  const handleClearCart = () => {
    Alert.alert(
      'Vaciar carrito',
      '¿Estás seguro de que deseas vaciar el carrito?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Vaciar',
          onPress: () => clearCart(),
          style: 'destructive',
        },
      ]
    );
  };
  
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

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
        
        <Text style={styles.title}>Mi Carrito</Text>
        
        {items.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClearCart}
            activeOpacity={0.8}
          >
            <Trash2 size={20} color={Colors.error} />
          </TouchableOpacity>
        )}
      </View>
      
      {items.length > 0 ? (
        <>
          <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
            
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Resumen del pedido</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{formatPrice(getTotal())}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Envío</Text>
                <Text style={styles.summaryValue}>$5.00</Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatPrice(getTotal() + 5)}</Text>
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.checkoutContainer}>
            <Button
              title="Proceder al pago"
              onPress={handleCheckout}
              style={styles.checkoutButton}
            />
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <ShoppingCart size={64} color={Colors.primaryLight} />
          <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
          <Text style={styles.emptyText}>Agrega productos de nuestra tienda para mascotas</Text>
          <Button
            title="Ir a la tienda"
            onPress={() => router.push('/(tabs)/shop')}
            style={styles.shopButton}
          />
        </View>
      )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...Typography.heading2,
  },
  clearButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  summaryContainer: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    ...Typography.heading3,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    ...Typography.body,
    color: Colors.textLight,
  },
  summaryValue: {
    ...Typography.body,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  totalLabel: {
    ...Typography.heading3,
    fontSize: 18,
  },
  totalValue: {
    ...Typography.heading3,
    fontSize: 18,
    color: Colors.primary,
  },
  checkoutContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  checkoutButton: {
    width: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    ...Typography.heading2,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  shopButton: {
    width: '80%',
  },
});