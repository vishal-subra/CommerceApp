import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Gap from './Gap'
import icons from './icons'
import theme, { COLORS, SIZES, FONTS } from './theme'

const BoxItemTopProduct = ({ bgColor, icon, text, price, onPress }) => {
    return (
        <TouchableOpacity style={{
            height: 160,
            width: 150,
            backgroundColor: bgColor,
            borderRadius: 12,
            marginHorizontal: 16,
            marginVertical: 40,
        }} onPress={onPress}>
            <View style={{ top: -40 }}>
                <View>
                    <Image source={{uri:icon}} style={styles.image} />
                    <Gap height={20} />
                    <Text style={styles.text}>{text}</Text>
                  
                </View>
                <Gap height={20} />
                <View style={styles.price}>
                    <Text style={styles.wrapperButtom}>RM {price}</Text>
                    <TouchableOpacity>
                        <Image source={icons.love} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default BoxItemTopProduct;

const styles = StyleSheet.create({
    text: {
        paddingLeft: 10,
        fontSize: 16,
    },
    price: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    wrapperButtom: {
        fontSize: 18,
    },  
    image: {
        height: 110,
        width: 110,
        resizeMode: 'contain',
        marginLeft: 20,
    },
    icon: {
        borderRadius: 10,
        width: 24,
        height: 24,
    }
});