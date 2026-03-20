import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import NewsScreen from './src/screens/NewsScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import MySidebar from './src/components/MySidebar';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function NewsStack({ navigation }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#ffe4ec' },
                headerTintColor: '#db7093',
                // Прибрали headerLeft звідси, щоб він не застосовувався до всіх екранів
            }}
        >
            <Stack.Screen
                name="MainScreen"
                component={NewsScreen}
                options={{
                    title: 'FavNews💟',
                    // Додаємо бургер-меню ТІЛЬКИ на головний екран стрічки новин
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Text style={{ marginLeft: 15, fontSize: 28, color: '#db7093', marginRight: 15 }}>≡</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="DetailsScreen"
                component={DetailsScreen}
                // Тут нічого не пишемо про headerLeft.
                // React Navigation автоматично поставить сюди стрілочку "Назад"!
            />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={(props) => <MySidebar {...props} />}
                screenOptions={({ navigation }) => ({
                    drawerActiveTintColor: '#db7093',
                    headerTintColor: '#db7093',
                    headerStyle: { backgroundColor: '#ffe4ec' },
                    // Додаємо бургер-меню для екрану Контактів
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Text style={{ marginLeft: 15, fontSize: 28, color: '#db7093' }}>≡</Text>
                        </TouchableOpacity>
                    ),
                })}
            >
                <Drawer.Screen
                    name="Новини"
                    component={NewsStack}
                    options={{ headerShown: false }}
                />
                <Drawer.Screen
                    name="Контакти"
                    component={ContactsScreen}
                />
            </Drawer.Navigator>

            <View style={styles.devPanel}>
                <Text style={styles.devText}>Розробник: Лупашина Анастасія ВТ-22-1</Text>
            </View>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    devPanel: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 35,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ffe4ec'
    },
    devText: {
        fontSize: 12,
        color: '#db7093',
        fontWeight: 'bold'
    }
});
