import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';

export default function NewsScreen({ navigation }) {
    const [news, setNews] = useState([
        { id: 1, title: 'Відкриття факультету', date: '20.03.2026', content: 'Сьогодні відбулося урочисте відкриття...' },
        { id: 2, title: 'Нові гранти', date: '21.03.2026', content: 'Студенти отримають нові можливості для навчання...' },
    ]);

    const loadMore = () => {
        const nextId = news.length + 1;
        const moreNews = Array.from({ length: 5 }).map((_, i) => ({
            id: nextId + i,
            title: `Новина №${nextId + i}`,
            date: '22.03.2026',
            content: 'Це додатковий текст новини, який згенерувався автоматично при скролі.'
        }));
        setNews([...news, ...moreNews]);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={news}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Details', { item, allNews: news })}
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
    container: { flex: 1, backgroundColor: '#ffe4ec' },
    card: { backgroundColor: '#fff', margin: 10, padding: 20, borderRadius: 15, elevation: 2 },
    title: { fontSize: 18, fontWeight: 'bold', color: '#db7093' },
    date: { color: '#888', marginTop: 5 }
});
