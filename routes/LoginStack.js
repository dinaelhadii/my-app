// import from react-navigation
import { createStackNavigator } from "@react-navigation/stack";

// import screen- and route-components
import NavBar from "./NavBar";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createStackNavigator();

function LoginStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Login'
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Register'
                component={Register}
                options={{   
                    gestureEnabled: false           
                }}
            />
            <Stack.Screen 
                name='NavBar'
                component={NavBar}
                options={{
                    headerShown: false,     
                    gestureEnabled: false           
                }}
            />
        </Stack.Navigator>
    )
}

export default LoginStack;