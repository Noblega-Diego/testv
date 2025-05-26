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
import { blogs } from '@/mocks/blogs';
import { ArrowLeft, Heart, Share2 } from 'lucide-react-native';

export default function BlogDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [liked, setLiked] = React.useState(false);
  
  const blog = blogs.find(b => b.id === id);
  
  if (!blog) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Artículo no encontrado</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backLink}>Volver al blog</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  // Generate a longer content for the blog post
  const fullContent = `
    ${blog.description}
    
    La salud y el bienestar de nuestras mascotas es una prioridad para cualquier dueño responsable. Asegurarse de que reciban los cuidados adecuados desde temprana edad establece las bases para una vida larga y saludable.
    
    Es importante recordar que cada mascota es única y puede tener necesidades específicas según su raza, tamaño y personalidad. Consultar regularmente con un veterinario de confianza es fundamental para mantener al día sus vacunas y realizar chequeos preventivos.
    
    La alimentación balanceada, el ejercicio regular y la estimulación mental son pilares fundamentales para el desarrollo óptimo de tu compañero. No subestimes la importancia de establecer rutinas y límites claros desde el principio.
    
    Recuerda que el vínculo que estableces con tu mascota se fortalece a través del tiempo compartido, el cariño y la atención que le brindas diariamente. Este lazo especial beneficia tanto a la mascota como al dueño, creando una relación de confianza y amor mutuo.
  `;
  
  const relatedBlogs = blogs.filter(b => b.id !== id && b.category === blog.category).slice(0, 2);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: blog.image }} style={styles.headerImage} />
        
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{blog.category}</Text>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>{blog.title}</Text>
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, liked && styles.likedButton]}
              onPress={() => setLiked(!liked)}
              activeOpacity={0.8}
            >
              <Heart 
                size={18} 
                color={liked ? Colors.background : Colors.primary}
                fill={liked ? Colors.primary : 'transparent'}
              />
              <Text 
                style={[styles.actionText, liked && styles.likedText]}
              >
                Me gusta
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              activeOpacity={0.8}
            >
              <Share2 size={18} color={Colors.primary} />
              <Text style={styles.actionText}>Compartir</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.blogContent}>{fullContent}</Text>
          
          {relatedBlogs.length > 0 && (
            <View style={styles.relatedSection}>
              <Text style={styles.relatedTitle}>Artículos relacionados</Text>
              
              {relatedBlogs.map((relatedBlog) => (
                <TouchableOpacity 
                  key={relatedBlog.id}
                  style={styles.relatedItem}
                  onPress={() => {
                    router.push(`/blog/${relatedBlog.id}`);
                  }}
                  activeOpacity={0.8}
                >
                  <Image 
                    source={{ uri: relatedBlog.image }} 
                    style={styles.relatedImage} 
                  />
                  <View style={styles.relatedContent}>
                    <Text style={styles.relatedItemTitle}>{relatedBlog.title}</Text>
                    <Text 
                      style={styles.relatedItemDescription}
                      numberOfLines={2}
                    >
                      {relatedBlog.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
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
  container: {
    flex: 1,
  },
  headerImage: {
    width: '100%',
    height: 250,
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
  title: {
    ...Typography.heading1,
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  likedButton: {
    backgroundColor: Colors.primary,
  },
  actionText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  likedText: {
    color: Colors.background,
  },
  blogContent: {
    ...Typography.body,
    lineHeight: 24,
    marginBottom: 24,
  },
  relatedSection: {
    marginTop: 16,
  },
  relatedTitle: {
    ...Typography.heading3,
    marginBottom: 16,
  },
  relatedItem: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  relatedImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  relatedContent: {
    flex: 1,
    padding: 12,
  },
  relatedItemTitle: {
    ...Typography.body,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  relatedItemDescription: {
    ...Typography.bodySmall,
    color: Colors.textLight,
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