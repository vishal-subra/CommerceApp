import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import { FONTS, SIZES, COLORS, Button, Gap } from '../component'
import {IL_GetStarted_PNG} from '../assets/images/Illustrations'


const GetStartedScreen = ({navigation}) => {
    return (
      <View style={styles.screen}>
        <Image source={IL_GetStarted_PNG} style={styles.image} />
        <View style={styles.wrapperSlogan}>
          <Text style={styles.txtSlogan}>Shop Your Daily </Text>
          <Text style={styles.txtSlogan}>Necessary</Text>
        </View>
        <Gap height={90} />
        <Button
          onPress={() => navigation.replace('Home')}
          text="Get Started"
        />
      </View>
    );
  };
  
  export default GetStartedScreen;
  
  const styles = StyleSheet.create({
    screen: {flex: 1, paddingHorizontal: 20, justifyContent: 'center'},
    image: {height: 225, width: '100%', resizeMode: 'stretch'},
    wrapperSlogan: {marginTop: 51},
    txtSlogan: {
      fontSize: 30,
      color: COLORS.green,
      textAlign: 'center',
    },
  });