import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screens/Profile";
import Impressum from "../screens/Impressum";

const Stack = createStackNavigator();

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Profile'
                component={Profile}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Impressum'
                component={Impressum}
                options={{
                    headerShown: false,             
                }}
            />
        </Stack.Navigator>
    )
}

export default ProfileStack;