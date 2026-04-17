import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { products } from '../../../data/products';

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const product = products.find((p) => p.id === id);

    if (!product) return <Text>Товар не знайдено</Text>;

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{ title: product.name, headerShown: true }} />
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
                <Text style={styles.desc}>{product.description}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    image: { width: '100%', height: 300 },
    info: { padding: 20 },
    name: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
    price: { fontSize: 22, color: '#db7093', fontWeight: 'bold', marginBottom: 15 },
    desc: { fontSize: 16, color: '#666', lineHeight: 24 }
});
