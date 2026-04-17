import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Link, router } from 'expo-router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Отримуємо функції з нашого AuthContext
    const { login, resetPassword } = useAuth();

    // --- Функція входу (Вимога №1) ---
    const handleLogin = async () => {
        if (!email || !password) {
            return Alert.alert("Увага", "Будь ласка, заповніть усі поля.");
        }

        setLoading(true);
        try {
            console.log("Спроба входу для:", email);
            await login(email, password);
            console.log("Вхід успішний!");

            // Примусовий перехід на головну сторінку профілю
            router.replace('/');
        } catch (error) {
            console.log("Помилка Firebase:", error.code);

            let errorMessage = "Не вдалося увійти. Перевірте дані.";

            if (error.code === 'auth/invalid-credential') {
                errorMessage = "Неправильний пароль або Email.";
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = "Користувача з такою поштою не знайдено.";
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = "Забагато спроб. Спробуйте пізніше або скиньте пароль.";
            }

            Alert.alert("Помилка входу", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // --- Функція відновлення пароля (Вимога №5) ---
    const handleForgotPassword = async () => {
        if (!email) {
            return Alert.alert("Email пустий", "Введіть вашу пошту, щоб отримати посилання для зміни пароля.");
        }
        try {
            await resetPassword(email);
            Alert.alert("Успіх 📧", "Інструкцію зі зміни пароля надіслано на вашу пошту. Перевірте папку Спам.");
        } catch (error) {
            Alert.alert("Помилка", "Не вдалося надіслати лист. Перевірте правильність Email.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Вхід ✨</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Ваш Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={[styles.button, loading && { opacity: 0.7 }]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>УВІЙТИ</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={handleForgotPassword} style={styles.linkMargin}>
                    <Text style={styles.linkText}>Забули пароль?</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text>Немає акаунту? </Text>
                    <Link href="/register" asChild>
                        <TouchableOpacity>
                            <Text style={styles.boldLink}>Зареєструватися</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff5f8', // Ніжно-рожевий фон
    },
    card: {
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 20,
        elevation: 5, // Тінь для Android
        shadowColor: '#000', // Тінь для iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#db7093',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ffb6c1',
    },
    button: {
        backgroundColor: '#db7093',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    linkMargin: {
        marginTop: 20,
        alignItems: 'center',
    },
    linkText: {
        color: '#db7093',
        textDecorationLine: 'underline',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    boldLink: {
        color: '#db7093',
        fontWeight: 'bold',
    },
});
