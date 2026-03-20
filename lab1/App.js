import React, { useState, createRef } from 'react';
import {
    View, Text, TouchableOpacity, Modal, StyleSheet, Image,
    Pressable, StatusBar, SafeAreaView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileScreen from './src/screens/ProfileScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import NewsScreen from './src/screens/NewsScreen';
import NewsDetails from './src/screens/NewsDetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const navigationRef = createRef();

// Створюємо кастомний компонент для TabBar
function MyCustomTabBar({ state, descriptors, navigation }) {
    return (
        <View>
            {/* ПІДПИС РОЗРОБНИКА - ТЕПЕР ВІН ЗАВЖДИ НАД ІКОНКАМИ */}
            <View style={styles.developerInfo}>
                <Text style={styles.devText}>Розробник: Лупашина Анастасія ВТ-22-1</Text>
            </View>

            {/* САМА ПАНЕЛЬ З ІКОНКАМИ */}
            <View style={styles.tabContainer}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({ type: 'tabPress', target: route.key });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const icons = { 'Головна': '🏠', 'Фотогалерея': '🖼️', 'Профіль': '👤' };

                    return (
                        <TouchableOpacity key={index} onPress={onPress} style={styles.tabItem}>
                            <Text style={{ fontSize: 22 }}>{icons[route.name]}</Text>
                            <Text style={{ fontSize: 10, color: isFocused ? '#db7093' : '#888', fontWeight: isFocused ? 'bold' : 'normal' }}>
                                {route.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

function MyTabs() {
    return (
        <Tab.Navigator
            tabBar={props => <MyCustomTabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Головна" component={NewsScreen} />
            <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
            <Tab.Screen name="Профіль" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default function App() {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const navigateTo = (screenName) => {
        setMenuVisible(false);
        setTimeout(() => { navigationRef.current?.navigate(screenName); }, 100);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffe4ec' }}>
            <StatusBar backgroundColor="#ffe4ec" barStyle="dark-content" />
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: '#ffe4ec', elevation: 0 },
                        headerTintColor: '#db7093',
                        headerTitleStyle: { fontWeight: 'bold' },
                        // ПРИБРАЛИ headerLeft звідси, щоб він не дублювався на всіх екранах
                    }}
                >
                    <Stack.Screen
                        name="Main"
                        component={MyTabs}
                        options={{
                            title: ' FavNews💟',
                            // Додаємо бургер ТІЛЬКИ для головного екрана
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ marginLeft: 15 }}>
                                    <Text style={{ fontSize: 32, color: '#db7093' }}>☰</Text>
                                </TouchableOpacity>
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="Details"
                        component={NewsDetails}
                        options={{
                            title: 'Деталі'
                            // Тут headerLeft не вказуємо, тому з'явиться стрілочка Назад
                        }}
                    />
                </Stack.Navigator>

                <Modal transparent={true} visible={isMenuVisible} animationType="fade" statusBarTranslucent={true}>
                    <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
                        <View style={styles.drawer}>
                            <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
                                <View style={styles.drawerHeader}>
                                    <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1BHmkkElaGT_183JzIYArEjP-O59DQotKoQ&s' }} style={styles.drawerLogo} />
                                    <Text style={styles.drawerTitle}>FavNews💟</Text>
                                </View>
                                <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Головна')}><Text style={styles.menuText}>🏠 Головна</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Фотогалерея')}><Text style={styles.menuText}>🖼️ Фотогалерея</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Профіль')}><Text style={styles.menuText}>👤 Профіль</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.closeButton} onPress={() => setMenuVisible(false)}>
                                    <Text style={{color:'#fff', fontWeight: 'bold'}}>ЗАКРИТИ</Text>
                                </TouchableOpacity>
                            </SafeAreaView>
                        </View>
                    </Pressable>
                </Modal>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
    drawer: { width: '75%', height: '100%', backgroundColor: '#fff', padding: 20 },
    drawerHeader: { alignItems: 'center', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#ffe4ec', paddingBottom: 15 },
    drawerLogo: { width: 70, height: 70, borderRadius: 35, marginBottom: 10 },
    drawerTitle: { fontSize: 22, fontWeight: 'bold', color: '#db7093' },
    menuItem: { paddingVertical: 18, borderBottomWidth: 0.5, borderBottomColor: '#f5f5f5' },
    menuText: { fontSize: 18 },
    closeButton: { marginTop: 'auto', backgroundColor: '#db7093', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },

    // ФІКСОВАНА ПАНЕЛЬ
    developerInfo: {
        backgroundColor: '#fff',
        paddingVertical: 6,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ffe4ec',
    },
    devText: { fontSize: 13, color: '#db7093', fontWeight: 'bold' },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 60,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 5
    },
    tabItem: { alignItems: 'center', justifyContent: 'center', flex: 1 }
});
