import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ReportIssueScreen from "../screens/ReportIssueScreen";
import { colors } from "../theme/theme";
import RatingsScreen from "../screens/RatingsScreen";
import PollsScreen from "../screens/PollsScreen";
import SearchScreen from "../screens/SearchScreen";
import CustomDrawerContent from "./CustomDrawerContent";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer({ route }) {
  const username = route?.params?.username || "User";

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} username={username} />}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        drawerStyle: { backgroundColor: colors.surface },
        drawerActiveTintColor: colors.accent,
        drawerInactiveTintColor: colors.text,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Search" component={SearchScreen} />
      <Drawer.Screen name="Ratings" component={RatingsScreen} />
      <Drawer.Screen name="Polls" component={PollsScreen} />
      <Drawer.Screen name="Report Issue" component={ReportIssueScreen} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      primary: colors.primary,
    },
  };
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainDrawer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



