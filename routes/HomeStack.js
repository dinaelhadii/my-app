import { createStackNavigator } from "@react-navigation/stack";

import Home from '../screens/Home';
import ProductDetails from '../screens/ProductDetails';

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
        </Stack.Navigator>
    )
}

export default HomeStack;