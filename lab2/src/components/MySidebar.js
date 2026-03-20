import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function MySidebar(props) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            {/* 2.6 Секція профілю */}
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1BHmkkElaGT_183JzIYArEjP-O59DQotKoQ&s' }}
                    style={styles.avatar}
                />
                <View style={styles.info}>
                    <Text style={styles.name}>Лупашина Анастасія</Text>
                    <Text style={styles.group}>Група: ВТ-22-1</Text>
                </View>
            </View>

            {/* ПУНКТИ МЕНЮ (тепер їх буде видно!) */}
            <View style={styles.menuContainer}>
                <DrawerItemList {...props} />
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Лабораторна робота №2 🎀</Text>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: '#ffe4ec',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ffb6c1',
        paddingTop: 40,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 10,
    },
    info: { alignItems: 'center' },
    name: { fontSize: 18, fontWeight: 'bold', color: '#db7093' },
    group: { fontSize: 14, color: '#666', marginTop: 4 },
    menuContainer: { flex: 1, paddingTop: 10 },
    footer: { padding: 20, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#eee' },
    footerText: { fontSize: 12, color: '#bbb', fontStyle: 'italic' }
});
