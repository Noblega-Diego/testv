import { RorkErrorBoundary } from "../.rorkai/rork-error-boundary";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/colors";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RorkErrorBoundary><RootLayoutNav /></RorkErrorBoundary>;
}

function RootLayoutNav() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="appointment/online" 
          options={{ 
            headerShown: true,
            headerTitle: "Turno en línea",
            headerTintColor: Colors.primary,
            headerStyle: { backgroundColor: Colors.background },
          }} 
        />
        <Stack.Screen 
          name="appointment/home-visit" 
          options={{ 
            headerShown: true,
            headerTitle: "Atención a domicilio",
            headerTintColor: Colors.primary,
            headerStyle: { backgroundColor: Colors.background },
          }} 
        />
        <Stack.Screen 
          name="appointment/confirmation" 
          options={{ 
            headerShown: true,
            headerTitle: "Confirmación",
            headerTintColor: Colors.primary,
            headerStyle: { backgroundColor: Colors.background },
          }} 
        />
        <Stack.Screen 
          name="blog/[id]" 
          options={{ 
            headerShown: true,
            headerTitle: "Blog",
            headerTintColor: Colors.primary,
            headerStyle: { backgroundColor: Colors.background },
          }} 
        />
        <Stack.Screen 
          name="profile" 
          options={{ 
            headerShown: true,
            headerTitle: "Mi Perfil",
            headerTintColor: Colors.primary,
            headerStyle: { backgroundColor: Colors.background },
          }} 
        />
        <Stack.Screen 
          name="cart" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="product/[id]" 
          options={{ 
            headerShown: false,
          }} 
        />
      </Stack>
    </>
  );
}