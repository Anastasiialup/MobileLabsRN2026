import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
    // Отримуємо саму новину та повний список даних (якщо передали)
    const { item, fullData } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({ title: item.title });
    }, [navigation, item]);

    // Функція для переходу до наступної новини
    const goToNext = () => {
        if (!fullData) return;
        const currentIndex = fullData.findIndex(i => i.id === item.id);
        const nextIndex = currentIndex + 1;

        if (nextIndex < fullData.length) {
            // push створює новий екран у стеку поверх поточного
            navigation.push('DetailsScreen', {
                item: fullData[nextIndex],
                fullData: fullData
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={styles.content}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>

                    <View style={styles.navButtons}>
                        {/* Кнопка Назад */}
                        <TouchableOpacity
                            style={[styles.btn, styles.backBtn]}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.btnText}>← Назад</Text>
                        </TouchableOpacity>

                        {/* Кнопка Наступна */}
                        <TouchableOpacity
                            style={[styles.btn, styles.nextBtn]}
                            onPress={goToNext}
                        >
                            <Text style={styles.btnText}>Наступна →</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    image: { width: '100%', height: 250 },
    content: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#db7093', marginBottom: 15 },
    description: { fontSize: 18, lineHeight: 26, color: '#444', marginBottom: 30 },
    navButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ffe4ec',
        paddingTop: 20
    },
    btn: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        minWidth: 120,
        alignItems: 'center'
    },
    backBtn: { backgroundColor: '#f0f0f0' },
    nextBtn: { backgroundColor: '#db7093' },
    btnText: { fontWeight: 'bold', color: '#fff' },
});
