import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WishlistScreen from '../screens/WishlistScreen';
import WarenkorbScreen from '../screens/WarenkorbScreen';

const Tab = createBottomTabNavigator();

function NavBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Warenkorb" component={WarenkorbScreen} />
      <Tab.Screen name="Wunschliste" component={WishlistScreen} />
    </Tab.Navigator>
  );
}

export default NavBar;