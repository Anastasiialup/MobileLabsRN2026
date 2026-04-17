import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        // Регулярний вираз для перевірки email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name.trim() || !email.trim() || !password.trim()) {
            Alert.alert('Помилка', 'Заповніть всі поля 🎀');
            return;
        }
        if (!emailRegex.test(email)) {
            Alert.alert('Помилка', 'Введіть коректний Email (напр. user@mail.com)');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Помилка', 'Пароль має бути не менше 6 символів');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Помилка', 'Паролі не збігаються');
            return;
        }

        register(email, password, name);
        router.replace('/');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎀 Створити акаунт</Text>
            <TextInput style={styles.input} placeholder="Ім'я" value={name} onChangeText={setName} />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput style={styles.input} placeholder="Пароль" value={password} onChangeText={setPassword} secureTextEntry />
            <TextInput style={styles.input} placeholder="Підтвердити пароль" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Зареєструватися</Text>
            </TouchableOpacity>

            <Link href="/login" style={styles.link}>
                <Text style={{color: '#db7093'}}>Вже є акаунт? Увійти</Text>
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
