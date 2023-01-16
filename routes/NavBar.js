// import from react-navigation and react-native
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

// import icons
import { Ionicons } from '@expo/vector-icons';

// import stack- and screen-components
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import Wishlist from '../screens/Wishlist';
import Cart from '../screens/Cart';
import Blog from '../screens/Blog';

const Tab = createBottomTabNavigator();

function NavBar() {

  return (
    <Tab.Navigator screenOptions={
      {headerTitleStyle: {
      fontFamily: 'nunito-bold',
      fontSize: 25
      },
      tabBarInactiveTintColor: 'black',
      tabBarActiveTintColor: 'black',
      }
      }>
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStack} 
        options={{
          tabBarLabel: 'Home',
          title: 'Home',
          tabBarIcon: ({color, focused}) => 
          (<Ionicons name ={focused ? 'ios-home' : 'ios-home-outline'} size={focused ? 32 : 28} color={color} />)
        }}
        />
        <Tab.Screen 
        name="Wunschliste" 
        component={Wishlist} 
        options={{
          tabBarIcon: ({color, focused}) => 
          (<Ionicons name={focused ? 'ios-heart' : 'ios-heart-outline'} size={focused ? 32 : 28} color={color} />)
        }}
        />
      <Tab.Screen 
        name="Warenkorb" 
        component={Cart}
        options={{
          tabBarIcon: ({color, focused}) => 
          (<Ionicons name={focused ? 'ios-cart' : 'ios-cart-outline'} size={focused ? 32 : 28} color={color} />)
        }}
        />
        <Tab.Screen 
        name="Blog" 
        component={Blog}
        options={{
          tabBarIcon: ({color, focused}) => 
          (<Ionicons name={focused ? "ios-newspaper-sharp" : "ios-newspaper-outline"} size={focused ? 32 : 28} color={color} />)
        }}
        />
        <Tab.Screen 
        name="ProfileStack" 
        component={ProfileStack} 
        options={{
          title: 'Profil',
          tabBarLabel:'Profil',
          tabBarIcon: ({color, focused}) => 
          (<Ionicons name={focused ? "ios-person" : "ios-person-outline"} size={focused ? 32 : 28} color={color} />),
        }}
        />
    </Tab.Navigator>
  );
}

export default NavBar;