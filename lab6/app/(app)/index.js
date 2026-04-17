import { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { db } from '../../firebaseConfig';
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState({ name: '', age: '', city: '' });

    // Завантаження даних з Firestore (вимога 2)
    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) setProfile(docSnap.data());
            }
        };
        fetchProfile();
    }, []);

    // Збереження даних (вимога 4)
    const handleSave = async () => {
        try {
            await setDoc(doc(db, "users", user.uid), profile);
            Alert.alert("🎀 Успіх", "Дані збережено у хмарі!");
        } catch (e) {
            Alert.alert("Помилка", e.message);
        }
    };

    // Видалення акаунту (вимога 4)
    const handleDelete = () => {
        Alert.alert("Видалення", "Ви впевнені? Це видалить дані назавжди", [
            { text: "Скасувати" },
            { text: "Видалити", onPress: async () => {
                    try {
                        await deleteDoc(doc(db, "users", user.uid));
                        await user.delete();
                    } catch (e) {
                        Alert.alert("Помилка", "Для видалення потрібно зайти в акаунт повторно.");
                    }
                }}
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Мій Профіль ✨</Text>

            <Text style={styles.label}>Email: {user?.email}</Text>

            <TextInput style={styles.input} placeholder="Ім'я" value={profile.name} onChangeText={t => setProfile({...profile, name: t})} />
            <TextInput style={styles.input} placeholder="Вік" value={profile.age} onChangeText={t => setProfile({...profile, age: t})} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Місто" value={profile.city} onChangeText={t => setProfile({...profile, city: t})} />

            <TouchableOpacity style={styles.btn} onPress={handleSave}>
                <Text style={styles.btnText}>Зберегти дані</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, {backgroundColor: '#ff4d4d'}]} onPress={handleDelete}>
                <Text style={styles.btnText}>Видалити акаунт 🗑️</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={logout} style={{marginTop: 20}}>
                <Text style={{color: '#db7093', textAlign: 'center'}}>Вийти з системи</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 30, backgroundColor: '#fff5f8', justifyContent: 'center' },
    title: { fontSize: 26, fontWeight: 'bold', color: '#db7093', textAlign: 'center', marginBottom: 20 },
    label: { marginBottom: 10, color: '#666', textAlign: 'center' },
    input: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#ffb6c1' },
    btn: { backgroundColor: '#db7093', padding: 16, borderRadius: 12, marginTop: 10 },
    btnText: { color: 'white', textAlign: 'center', fontWeight: 'bold' }
});
