import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    RefreshControl,
    ActivityIndicator
} from 'react-native';

// 2.2 Модель данных + Генерация очень длинного текста для ScrollView
const generateData = (startIndex, count) =>
    Array.from({ length: count }).map((_, i) => ({
        id: (startIndex + i).toString(),
        title: `Новина #${startIndex + i + 1}`,
        // Генерируем очень длинный текст для проверки скролла на экране деталей
        description: `Це детальний опис новини номер ${startIndex + i + 1}. ` +
            `Тут дуже багато тексту, щоб ви могли перевірити роботу ScrollView на екрані деталей. `.repeat(15) +
            ` \n\nСекція 2: \n` + `Додатковий контент для віртуалізації та скролінгу. `.repeat(15),
        image: `https://picsum.photos/id/${(startIndex + i) % 50}/400/300`
    }));

export default function NewsScreen({ navigation }) {
    const [data, setData] = useState(generateData(0, 10)); // Начальные 10 новостей
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    // 2.3.1 Pull-to-Refresh
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setData(generateData(0, 10)); // Сбрасываем к первым 10
            setRefreshing(false);
        }, 1500);
    };

    // 2.3.2 Infinite Scroll (Подгрузка данных)
    const loadMore = () => {
        if (loadingMore) return;
        setLoadingMore(true);
        setTimeout(() => {
            const newData = generateData(data.length, 10);
            setData([...data, ...newData]);
            setLoadingMore(false);
        }, 1000);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DetailsScreen', {
                item: item,
                fullData: data // ПЕРЕДАЕМ ВЕСЬ МАССИВ для кнопок "Следующая/Назад"
            })}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text numberOfLines={2} style={styles.itemDesc}>
                    {item.description.substring(0, 60)}...
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}

                // 2.3.4 Оптимизация (ОБЯЗАТЕЛЬНО ПО МЕТОДИЧКЕ)
                initialNumToRender={8}
                maxToRenderPerBatch={10}
                windowSize={5}

                // 2.3.1 Pull-to-Refresh
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#db7093']} />
                }

                // 2.3.2 Infinite Scroll
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}

                // 2.3.3 Визуальные компоненты
                ListHeaderComponent={<Text style={styles.listHeader}>🎀 Стрічка новин</Text>}
                ListFooterComponent={loadingMore ? <ActivityIndicator color="#db7093" style={{margin: 20}} /> : <View style={{height: 20}} />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    listHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'center',
        color: '#db7093',
        backgroundColor: '#fff'
    },
    card: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    image: { width: 80, height: 80, borderRadius: 12 },
    info: { marginLeft: 15, flex: 1 },
    itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    itemDesc: { color: '#888', marginTop: 4, fontSize: 14 },
    separator: {
        height: 1,
        backgroundColor: '#ffe4ec',
        marginHorizontal: 20
    }
});
