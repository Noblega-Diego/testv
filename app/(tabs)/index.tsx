import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ServiceCard } from '@/components/ServiceCard';
import { BlogCard } from '@/components/BlogCard';
import { services } from '@/mocks/services';
import { blogs } from '@/mocks/blogs';

export default function HomeScreen() {
  const router = useRouter();

  const handleOnlineAppointment = () => {
    router.push('/appointment/online');
  };

  const handleHomeVisit = () => {
    router.push('/appointment/home-visit');
  };

  const handleServicePress = (serviceId: string) => {
    router.push(`/appointment/online?service=${serviceId}`);
  };

  const handleBlogPress = (blogId: string) => {
    router.push(`/blog/${blogId}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HeroSection
          title="Mantene a tu fiel compañero sano"
          buttonText="Reservar cita"
          buttonAction={handleOnlineAppointment}
          imageUrl="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        />

        <View style={styles.appointmentOptions}>
          <TouchableOpacity 
            style={[styles.appointmentOption, styles.onlineOption]} 
            onPress={handleOnlineAppointment}
            activeOpacity={0.8}
          >
            <Text style={styles.appointmentOptionTitle}>Turno en línea</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.appointmentOption, styles.homeVisitOption]} 
            onPress={handleHomeVisit}
            activeOpacity={0.8}
          >
            <Text style={styles.appointmentOptionTitle}>Atención a domicilio</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nuestros servicios</Text>
          
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              price={service.price}
              onPress={() => handleServicePress(service.id)}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Blog de mascotas</Text>
          
          <View style={styles.blogGrid}>
            {blogs.slice(0, 4).map((blog) => (
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
          
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push('/blog')}
            activeOpacity={0.8}
          >
            <Text style={styles.viewAllButtonText}>Ver todos los artículos</Text>
          </TouchableOpacity>
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
  appointmentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  appointmentOption: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  onlineOption: {
    backgroundColor: Colors.primary,
  },
  homeVisitOption: {
    backgroundColor: Colors.secondary,
  },
  appointmentOptionTitle: {
    ...Typography.body,
    color: Colors.background,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    ...Typography.heading2,
    marginBottom: 16,
  },
  blogGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  viewAllButton: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginTop: 16,
  },
  viewAllButtonText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});