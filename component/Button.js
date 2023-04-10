import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import theme, { COLORS, SIZES, FONTS } from './theme';

const Button = ({onPress, text}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.green,
    height: 50,
    width: 259,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    color:COLORS.white,
    textAlign: 'center',
  },
});