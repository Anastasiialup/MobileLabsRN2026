import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View, Text } from 'react-native'; // ДОДАНО View та Text
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Імпорт провайдера гри
import { GameProvider, GameContext } from './src/context/GameContext';

// Імпорт екранів
import GameScreen from './src/screens/GameScreen';
import ChallengesScreen from './src/screens/ChallengesScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

// Теми
const lightTheme = {
    bg: '#fff5f8',
    card: '#ffffff',
    text: '#333333',
    primary: '#db7093',
    secondary: '#ffe4ec'
};

const darkTheme = {
    bg: '#2d1b24',
    card: '#3d2631',
    text: '#ffffff',
    primary: '#ffb6c1',
    secondary: '#4a2d3a'
};

function NavigationContent() {
    const { isDarkTheme } = React.useContext(GameContext);
    const theme = isDarkTheme ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <NavigationContainer>
                <StatusBar
                    barStyle={isDarkTheme ? "light-content" : "dark-content"}
                    backgroundColor={theme.bg}
                />
                <Tab.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: theme.bg,
                            elevation: 0,
                            shadowOpacity: 0,
                            borderBottomWidth: 1,
                            borderBottomColor: theme.secondary
                        },
                        headerTintColor: theme.primary,
                        headerTitleStyle: { fontWeight: 'bold' },
                        tabBarStyle: {
                            backgroundColor: theme.bg,
                            borderTopWidth: 1,
                            borderTopColor: theme.secondary,
                            height: 60,
                            paddingBottom: 8
                        },
                        tabBarActiveTintColor: theme.primary,
                        tabBarInactiveTintColor: '#888',
                    }}
                >
                    <Tab.Screen
                        name="Клікер"
                        component={GameScreen}
                        options={{
                            title: '🎀 Clicker',
                            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🎀</Text>
                        }}
                    />
                    <Tab.Screen
                        name="Завдання"
                        component={ChallengesScreen}
                        options={{
                            title: '📝 Challenges',
                            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📝</Text>
                        }}
                    />
                    <Tab.Screen
                        name="Налаштування"
                        component={SettingsScreen}
                        options={{
                            title: '⚙️ Settings',
                            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>⚙️</Text>
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
}

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <GameProvider>
                    <NavigationContent />
                </GameProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
