import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FileManager from './src/screens/FileManager';
import FileEditor from './src/screens/FileEditor';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: { backgroundColor: '#fff5f8' },
                headerTintColor: '#db7093',
                headerShown: false,
            }}>
                <Stack.Screen name="Manager" component={FileManager} options={{ title: '🎀 Мій Провідник' }}  />
                <Stack.Screen name="Editor" component={FileEditor} options={{ title: '📝 Редактор' }} />
            </Stack.Navigator>

        </NavigationContainer>
    );
}
