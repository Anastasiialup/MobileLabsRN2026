import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';

export default function ProfileScreen() {
    const [form, setForm] = useState({ email: '', name: '', surname: '', pass: '' });
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Стан для перевірки входу

    const handleRegister = () => {
        if (!form.email || !form.pass || !form.name) {
            Alert.alert('Упс!', 'Будь ласка, заповніть обов\'язкові поля');
            return;
        }
        setIsLoggedIn(true); // "Входимо" в систему
    };

    const handleLogout = () => {
        setForm({ email: '', name: '', surname: '', pass: '' }); // Очищуємо поля
        setIsLoggedIn(false); // Виходимо
    };

    // Якщо користувач зареєструвався, показуємо Привітання
    if (isLoggedIn) {
        return (
            <View style={styles.container}>
                <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1BHmkkElaGT_183JzIYArEjP-O59DQotKoQ&s' }} style={styles.logo} />
                <View style={styles.welcomeCard}>
                    <Text style={styles.header}>Привіт, {form.name}!</Text>
                    <Text style={styles.welcomeText}>Ваша пошта: {form.email}</Text>
                    <Text style={styles.welcomeText}>Гарного перегляду! ✨</Text>

                    <TouchableOpacity style={[styles.btn, {backgroundColor: '#db7093', marginTop: 30}]} onPress={handleLogout}>
                        <Text style={styles.btnText}>Вийти (Logout)</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Якщо ще не зареєстрований — показуємо Форму
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1BHmkkElaGT_183JzIYArEjP-O59DQotKoQ&s' }} style={styles.logo} />
            <Text style={styles.header}>Створити аккаунт</Text>

            <TextInput
                style={styles.input}
                placeholder="Ім'я"
                placeholderTextColor="#db7093"
                value={form.name}
                onChangeText={(t) => setForm({...form, name: t})}
            />
            <TextInput
                style={styles.input}
                placeholder="Прізвище"
                placeholderTextColor="#db7093"
                value={form.surname}
                onChangeText={(t) => setForm({...form, surname: t})}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor="#db7093"
                value={form.email}
                onChangeText={(t) => setForm({...form, email: t})}
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry
                placeholderTextColor="#db7093"
                value={form.pass}
                onChangeText={(t) => setForm({...form, pass: t})}
            />

            <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                <Text style={styles.btnText}>Зареєструватися</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, alignItems: 'center', backgroundColor: '#ffe4ec', flexGrow: 1, justifyContent: 'center' },
    welcomeCard: { backgroundColor: '#fff', padding: 30, borderRadius: 20, width: '100%', alignItems: 'center', elevation: 5 },
    logo: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
    header: { fontSize: 26, fontWeight: 'bold', color: '#db7093', marginBottom: 15, textAlign: 'center' },
    welcomeText: { fontSize: 18, color: '#555', marginBottom: 10, textAlign: 'center' },
    input: { width: '100%', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 12, borderBottomWidth: 2, borderBottomColor: '#ffb6c1' },
    btn: { backgroundColor: '#ff69b4', width: '100%', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
    btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
