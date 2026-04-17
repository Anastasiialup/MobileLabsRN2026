import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Link, Stack } from 'expo-router'; // Додано Stack для керування заголовком
import { products } from '../../data/products';
import { useAuth } from '../../context/AuthContext';

export default function Catalog() {
    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <Text style={styles.title}>Каталог товарів 🎀</Text>
                <TouchableOpacity
                    onPress={logout}
                    style={{ backgroundColor: '#db7093', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10 }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>ВИЙТИ</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <Link href={`/details/${item.id}`} asChild>
                        <TouchableOpacity style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.infoContainer}>
                                <Text style={styles.name} numberOfLines={1}>
                                    {item.name}
                                </Text>
                                <Text style={styles.price}>${item.price}</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff5f8',
        paddingHorizontal: 15
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#db7093'
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 12,
        borderRadius: 20,
        // Тіні
        elevation: 4,
        shadowColor: '#db7093',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 12,
        marginRight: 15
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4
    },
    price: {
        color: '#db7093',
        fontSize: 16,
        fontWeight: '600'
    }
});
