// import from react-navigation
import { createStackNavigator } from "@react-navigation/stack";

// import screen-components
import Home from '../screens/Home';
import ProductDetails from '../screens/ProductDetails';
import Reviews from "../screens/Reviews";

const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Home'
                component={Home}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name='ProductDetails'
                component={ProductDetails}
                options={{
                    headerShown: false,
                    headerTitle: {}
                }}
            />
            <Stack.Screen 
                name='Reviews'
                component={Reviews}
                options={{
                    headerShown: false,
                    headerTitle: {}
                }}
            />
        </Stack.Navigator>
    )
}

export default HomeStack;