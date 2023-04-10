import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme, { COLORS, SIZES, FONTS } from './theme'

const BoxRelatedItems = ({ image, name, price, bgColor }) => {
    return (
        <TouchableOpacity style={{
            height: 120,
            width: 120,
            backgroundColor: bgColor,
            borderRadius: 12,
            padding: 5,
            marginRight: 15,
        }}>
            <View style={styles.wrapperImage}>
                <Image source={image} style={styles.image} />
            </View>
            <View style={styles.wrapperDetail}>
                <View style={styles.rowDetail}>
                    <Text>{name}</Text>
                    <Text style={styles.textPrice}>${price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default BoxRelatedItems;

const styles = StyleSheet.create({
    wrapperImage: { justifyContent: 'center', alignItems: 'center', flex: 1 },
    image: { height: 50, width: 50, resizeMode: 'contain' },
    wrapperDetail: { justifyContent: 'flex-end' },
    rowDetail: {
        backgroundColor: COLORS.white,
        height: 25,
        width: '100%',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    textPrice: { fontSize: 12 },
});
