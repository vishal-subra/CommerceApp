import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import theme, { COLORS, SIZES, FONTS } from './theme';

const BoxItemCategories = ({ text, color, icon, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={icon} style={{
                height: 60,
                width: 60,
                backgroundColor: color,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10
            }} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

export default BoxItemCategories;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 17,
    },
    wrapperImg: {
        height: 60,
        width: 60,
        //   backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    text: {
        marginTop: 10,
        color: COLORS.darkGreen,
        fontSize: 14,
    },
    iconImage: {
        borderRadius: 10,
        width: 24,
        height: 24,
    },
});