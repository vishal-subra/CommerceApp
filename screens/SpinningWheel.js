import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import colors from '../assets/colors/colors'
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";
import WheelOfFortune from 'react-native-wheel-of-fortune'
import { Button } from 'react-native-elements'
import { updatePoint } from '../actions/leaderboardActions';

const SpiningWheelScreen = ({ route, navigation }) => {
    const isFocused = useIsFocused();
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    let inputRef = useRef(null);

    const updateUserPoint=(value)=>{
        dispatch(updatePoint(userInfo.id,value)).then(navigation.pop(2))
    }


    return (
        <SafeAreaView style={{ backgroundColor: '#AE0000', flex: 1 }}>
            <WheelOfFortune
                options={{
                    rewards: [
                        '10',
                        '20',
                        '30',
                        '40',
                        '50',
                        '60',
                        '70',
                        '90',
                        '100',
                    ],
                    knobSize: 50,
                    borderWidth: 5,
                    borderColor: '#000',
                    innerRadius: 50,
                    duration: 4000,
                    backgroundColor: 'transparent',
                    textAngle: 'horizontal',
                    knobSource: require('../assets/images/knob.png'),
                    onRef: ref => (inputRef = ref),
                }}
                // onRef: ref => (inputRef.current = ref),
                getWinner={(value, index) => {
                    updateUserPoint(value)
                }}
                ref={ref => (inputRef = ref)}
            />
            {/* <Button title="Press me" onPress={() => { inputRef._onPress() }} /> */}

            <View style={styles.btnParentSection}>
                <TouchableOpacity
                    onPress={() => { inputRef._onPress() }}
                    style={styles.buttonContainer}  >
                    <Text style={styles.buttonText}>Spin!!</Text>
                </TouchableOpacity>
            </View>
            {/* <Button
                onPress={() => { inputRef._onPress() }}
                buttonStyle={{ witdh:200,borderRadius: 12, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#0FA956", }}
                title='Spin!!' /> */}
        </SafeAreaView>
    );
};

export default SpiningWheelScreen

const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    CartImage: {
        width: 210,
        height: 125,
        resizeMode: 'cover',

    },
    TextInputs: {
        marginTop: 3,
        marginBottom: 20,
    },
    cartCard: {
        height: 100,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: colors.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        width: 80,
        height: 30,
        backgroundColor: colors.primary,
        borderRadius: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#0FA956",
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    btnParentSection: {
        alignItems: 'center',
        marginTop: 20
    },
});
