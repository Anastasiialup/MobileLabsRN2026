import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // Приховуємо системний заголовок, щоб зробити свій дизайн
                contentStyle: { backgroundColor: '#fff5f8' }, // Ніжно-рожевий фон для всієї групи
            }}
        >
            <Stack.Screen name="login" options={{ title: 'Вхід' }} />
            <Stack.Screen name="register" options={{ title: 'Реєстрація' }} />
        </Stack>
    );
}
