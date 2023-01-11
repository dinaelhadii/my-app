import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import {Feather} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import HomeStack from './HomeStack';
import Wishlist from '../screens/Wishlist';
import Cart from '../screens/Cart';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

function NavBar({ userName, route }) {

  console.log('Navbar.', route.params)

  return (
    <Tab.Navigator screenOptions={{headerTitleStyle: {
      fontFamily: 'nunito-bold',
      fontSize: 25
    }}}>
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStack} 
        options={{
          tabBarLabel: 'Home',
          title: 'Home',
          tabBarIcon: ({color, focused}) => 
          (<Feather name ='home' size={focused ? 30 : 24} color={color} />)
        }}
        userName={userName}
        />
        <Tab.Screen 
        name="Wunschliste" 
        component={Wishlist} 
        options={{
          tabBarIcon: ({color, focused}) => (<Feather name='heart' size={focused ? 30 : 24} color={color} />)
        }}
        />
      <Tab.Screen 
        name="Warenkorb" 
        component={Cart}
        options={{
          tabBarIcon: ({color, focused}) => (<Feather name={'shopping-cart'} size={focused ? 30 : 24} color={color} />)
        }}
        />
        <Tab.Screen 
        name="ProfileStack" 
        component={ProfileStack} 
        options={{
          title: 'Profil',
          tabBarLabel:'Profil',
          tabBarIcon: ({color, focused}) => (<Ionicons name={focused ? "ios-person" : "ios-person-outline"} 
          size={focused ? 30 : 24} color={color} />),
        }}
        />
    </Tab.Navigator>
  );
}

export default NavBar;