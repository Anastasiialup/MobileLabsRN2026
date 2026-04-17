import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Увага', 'Будь ласка, введіть пошту та пароль');
            return;
        }

        const isSuccess = login(email, password);

        if (isSuccess) {
            router.replace('/');
        } else {
            Alert.alert(
                'Помилка входу',
                'Користувача не знайдено або дані невірні. Спочатку зареєструйтесь! ✨'
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎀 Вітаємо 🎀</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Увійти</Text>
            </TouchableOpacity>

            <Link href="/register" style={styles.link}>
                <Text style={{color: '#db7093'}}>Немає акаунту? Реєстрація</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#fff5f8' },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#db7093' },
    input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ffb6c1', borderRadius: 15, padding: 15, marginBottom: 15 },
    button: { backgroundColor: '#db7093', padding: 16, borderRadius: 15, marginTop: 10, elevation: 3 },
    buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
    link: { marginTop: 20, textAlign: 'center' },
});
