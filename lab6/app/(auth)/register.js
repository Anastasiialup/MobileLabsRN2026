import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Link, router } from 'expo-router';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { register } = useAuth();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            return Alert.alert("Помилка", "Паролі не збігаються");
        }
        try {
            await register(email, password);
            router.replace('/');
        } catch (error) {
            Alert.alert("Помилка реєстрації", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Реєстрація 🎀</Text>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
            <TextInput style={styles.input} placeholder="Пароль" value={password} onChangeText={setPassword} secureTextEntry />
            <TextInput style={styles.input} placeholder="Підтвердіть пароль" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Створити акаунт</Text>
            </TouchableOpacity>

            <Link href="/login" style={{ marginTop: 15 }}>
                <Text style={{ color: '#db7093' }}>Вже є акаунт? Увійти</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#fff5f8' },
    title: { fontSize: 28, fontWeight: 'bold', color: '#db7093', marginBottom: 30, textAlign: 'center' },
    input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#ffb6c1' },
    button: { backgroundColor: '#db7093', padding: 15, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold' }
});
