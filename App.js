import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import Authentication from "./screens/Authentication";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import CreateAudioScreen from "./screens/CreateAudioScreen";
import DetailScreen from "./screens/DetailScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "fade",
            animationTypeForReplace: "push",
          }}
        >
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="search" component={SearchScreen} />
          <Stack.Screen name="create" component={CreateAudioScreen} />
          <Stack.Screen name="detail" component={DetailScreen} />
          <Stack.Screen name="splash" component={SplashScreen} />
          <Stack.Screen name="authentication" component={Authentication} />
          <Stack.Screen name="profile" component={ProfileScreen} />
        </Stack.Navigator>
        <StatusBar
          style="light"
          animated={true}
          backgroundColor="transparent"
        />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
