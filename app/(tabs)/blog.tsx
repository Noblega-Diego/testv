import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  SafeAreaView,
  TextInput
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { BlogCard } from '@/components/BlogCard';
import { blogs } from '@/mocks/blogs';
import { Search } from 'lucide-react-native';

export default function BlogScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const categories = [...new Set(blogs.map(blog => blog.category))];
  
  const filteredBlogs = searchQuery 
    ? blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : blogs;

  const handleBlogPress = (blogId: string) => {
    router.push(`/blog/${blogId}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Blog Animals</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar artículos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.textLight}
          />
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          <View style={[styles.categoryPill, styles.categoryPillActive]}>
            <Text style={styles.categoryPillTextActive}>Todos</Text>
          </View>
          
          {categories.map((category, index) => (
            <View key={index} style={styles.categoryPill}>
              <Text style={styles.categoryPillText}>{category}</Text>
            </View>
          ))}
        </ScrollView>
        
        <View style={styles.blogGrid}>
          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              category={blog.category}
              onPress={() => handleBlogPress(blog.id)}
            />
          ))}
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
    padding: 16,
  },
  title: {
    ...Typography.heading1,
    marginBottom: 16,
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
    ...Typography.bodySmall,
    color: Colors.background,
    fontWeight: 'bold',
  },
  blogGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});