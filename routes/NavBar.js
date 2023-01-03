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
          tabBarIcon: ({color}) => 
          (<Feather name ='home' size={24} color={color} />)
        }}
        />
        <Tab.Screen 
        name="Wunschliste" 
        component={Wishlist} 
        options={{
          tabBarIcon: ({color}) => (<Feather name='heart' size={24} color={color} />)
        }}
        />
      <Tab.Screen 
        name="Warenkorb" 
        component={Cart}
        options={{
          tabBarIcon: ({color}) => (<Feather name='shopping-cart' size={24} color={color} />)
        }}
        />
        <Tab.Screen 
        name="Profil" 
        component={Profile} 
        options={{
          tabBarIcon: ({color}) => (<Ionicons name="ios-person-outline" size={24} color={color} />)
        }}
        />
    </Tab.Navigator>
  );
}

export default NavBar;