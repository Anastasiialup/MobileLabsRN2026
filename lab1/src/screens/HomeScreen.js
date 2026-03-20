import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
    const [news, setNews] = useState([
        { id: '1', title: 'Старт лаби', date: '20.03', text: 'Початок розробки нашого крутого додатка.' },
        // ... додай ще пару стартових
    ]);

    const loadMoreNews = () => {
        const newItems = Array.from({ length: 5 }).map((_, i) => ({
            id: Math.random().toString(),
            title: `Новина №${news.length + i + 1}`,
            date: 'Сьогодні',
            text: 'Це автоматично згенерований текст для нескінченного скролу...'
        }));
        setNews([...news, ...newItems]);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={news}
                onEndReached={loadMoreNews}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('NewsDetail', { item })}
                    >
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.date}>{item.date}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff0f5' },
    card: { backgroundColor: '#fff', margin: 10, padding: 15, borderRadius: 15, elevation: 3 },
    title: { fontFamily: 'Montserrat_700Bold', fontSize: 18, color: '#d63384' },
    date: { fontFamily: 'Montserrat_400Regular', color: '#888' }
});
