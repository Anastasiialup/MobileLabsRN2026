import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

export default function GalleryScreen() {
    const [images, setImages] = useState(Array.from({ length: 10 }, (_, i) => `https://picsum.photos/400/400?random=${i}`));

    const loadMore = () => {
        const more = Array.from({ length: 10 }, (_, i) => `https://picsum.photos/400/400?random=${Math.random()}`);
        setImages([...images, ...more]);
    };

    return (
        <View style={{ backgroundColor: '#ffe4ec', flex: 1 }}>
            <FlatList
                data={images}
                numColumns={2}
                keyExtractor={(item, i) => i.toString()}
                onEndReached={loadMore}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.img} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    img: { width: '47%', height: 180, margin: '1.5%', borderRadius: 15 }
});
