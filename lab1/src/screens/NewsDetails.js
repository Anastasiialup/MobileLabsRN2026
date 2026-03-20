import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function NewsDetails({ route, navigation }) {
    const { item, allNews } = route.params;
    const currentIndex = allNews.findIndex(n => n.id === item.id);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.content}>{item.content}</Text>

            <View style={styles.btnRow}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
                    <Text style={styles.btnText}>Назад</Text>
                </TouchableOpacity>

                {currentIndex < allNews.length - 1 && (
                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: '#ff69b4' }]}
                        onPress={() => navigation.push('Details', { item: allNews[currentIndex + 1], allNews })}
                    >
                        <Text style={styles.btnText}>Наступна</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffe4ec', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#db7093' },
    date: { color: '#888', marginVertical: 10 },
    content: { fontSize: 16, lineHeight: 24, color: '#333' },
    btnRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
    btn: { backgroundColor: '#db7093', padding: 12, borderRadius: 10, minWidth: 100, alignItems: 'center' },
    btnText: { color: '#fff', fontWeight: 'bold' }
});
