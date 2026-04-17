import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function AppLayout() {
    const { isAuthenticated, loading } = useAuth();

    // Поки йде завантаження (перевірка сесії), показуємо спінер
    if (loading) {
        return <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size="large" /></View>;
    }

    // Якщо НЕ авторизований — викидаємо на логін
    if (!isAuthenticated) {
        return <Redirect href="/login" />;
    }

    // Якщо авторизований — показуємо додаток (index.js у папці (app))
    return <Stack screenOptions={{ headerShown: false }} />;
}
