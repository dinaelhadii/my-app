import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import {Feather} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import HomeStack from './HomeStack';
import Profile from '../screens/Profile';
import Wishlist from '../screens/Wishlist';
import Cart from '../screens/Cart';

const Tab = createBottomTabNavigator();

function NavBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStack} 
        options={{
          title: 'Home',
          tabBarIcon: () => (<Feather name='home' size={24} color='black' />)
        }}
        />
        <Tab.Screen 
        name="Wunschliste" 
        component={Wishlist} 
        options={{
          tabBarIcon: () => (<Feather name='heart' size={24} color='black' />)
        }}
        />
      <Tab.Screen 
        name="Warenkorb" 
        component={Cart}
        options={{
          tabBarIcon: () => (<Feather name='shopping-cart' size={24} color='black' />)
        }}
        />
        <Tab.Screen 
        name="Profil" 
        component={Profile} 
        options={{
          tabBarIcon: () => (<Ionicons name="ios-person-outline" size={24} color="black" />)
        }}
        />
    </Tab.Navigator>
  );
}

export default NavBar;