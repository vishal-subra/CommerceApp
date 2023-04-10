import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View , Image } from 'react-native';
import icons from './icons';

const Counter = ({ onValueChange }) => {
    const [value, setValue] = useState(1);
    useEffect(() => {
        onValueChange(value);
    }, [onValueChange, value]);

    const onCount = type => {
        let result = value;
        if (type === 'plus') {
            result = value + 1;
        }
        if (type === 'minus') {
            if (value > 1) {
                result = value - 1;
            }
        }
        setValue(result);
        onValueChange(result);
    };

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => onCount('minus')}>
                <Image source={icons.button_min} style={styles.iconImage} />
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 10 }}>{value}</Text>
            <TouchableOpacity onPress={() => onCount('plus')}>
                <Image source={icons.button_plus} style={styles.iconImage} />
            </TouchableOpacity>
        </View>
    );
};

export default Counter;

const styles = StyleSheet.create({
    iconImage: {
        width: 24,
        height: 24,
    },
});

