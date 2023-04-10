import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import { Divider, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../assets/colors/colors'

// import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Ionicons from 'react-native-vector-icons/Ionicons'
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux';
import { updateStatus } from '../actions/transactionsActions';

const OrderDetailScreen = ({ route ,navigation}) => {
    const { item, total, status, deliveryAddress, payment, transaction_id ,userType} = route.params;
    const dispatch = useDispatch();
    const CartCard = ({ item }) => {

        return (
            <View style={styles.cartCard}>
                <Image source={{
                    uri: item.image ||
                        `https://firebasestorage.googleapis.com/v0/b/react-native-testing-eef6a.appspot.com/o/images%2Fdefault.jfif?alt=media&token=1e308c6b-2b44-48a1-90b0-328f31c60201`
                }} style={styles.CartImage} />
                <View
                    style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>

                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>RM{item.price}    x{item.number || 1}</Text>
                </View>
                <View style={{ marginRight: 20, alignItems: 'center' }}>
                    {/* <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.number}</Text> */}
                    {/* <View style={styles.actionBtn}>
                        <Icon name="remove" size={25} color={colors.white} />
                        <Icon name="add" size={25} color={colors.white} />
                    </View> */}
                </View>
            </View>

        );
    };


    const onPressCompleted = () => {
        if (status === 3) {
            dispatch(updateStatus(transaction_id, status, item))
            .then(navigation.navigate('SpinWheel', {
                    // transaction_id:item.delivery_id,
                    // item: item.items,
                    // total: item.total,
                    // status: item.status,
                    // deliveryAddress: item.deliveryAddress,
                    // payment: item.payment,
                    // userType:userData.type
                  })
            )
        }

    }

    const onPressNext = () => {
        dispatch(updateStatus(transaction_id, status, item))
    }



    return (
        <SafeAreaView>
            {/* style={{ backgroundColor: colors.white}} */}

            <View style={{ marginTop: 5, backgroundColor: colors.white, marginBottom: 10, paddingBottom: 10 }}>
                <Text style={{ paddingLeft: 10, fontSize: 20, color: 'gray' }}>Shipping information:</Text>
                <StepIndicator
                    stepCount={4}
                    customStyles={{
                        marginTop: 5,
                        stepIndicatorSize: 20,
                        currentStepIndicatorSize: 30,
                        separatorStrokeWidth: 2,
                        currentStepStrokeWidth: 3,
                        stepStrokeCurrentColor: '#fe7013',
                        stepStrokeWidth: 3,
                        stepStrokeFinishedColor: '#fe7013',
                        stepStrokeUnFinishedColor: '#aaaaaa',
                        separatorFinishedColor: '#fe7013',
                        separatorUnFinishedColor: '#aaaaaa',
                        stepIndicatorFinishedColor: '#fe7013',
                        stepIndicatorUnFinishedColor: '#ffffff',
                        stepIndicatorCurrentColor: '#ffffff',
                        stepIndicatorLabelFontSize: 13,
                        currentStepIndicatorLabelFontSize: 13,
                        stepIndicatorLabelCurrentColor: '#fe7013',
                        stepIndicatorLabelFinishedColor: '#ffffff',
                        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
                        labelColor: '#999999',
                        labelSize: 13,
                        currentStepLabelColor: '#fe7013'
                    }}
                    currentPosition={status || 0}
                    labels={["Packaging", "Shipping", "On the Way", "Completed"]}
                />
                <Divider style={{ backgroundColor: 'gray', margin: 10 }} />


                <Ionicons style={{ paddingLeft: 10 }} name="location-outline" size={25} color={'gray'} >
                    <Text style={{ paddingLeft: 10, fontSize: 20, color: 'gray' }}>
                        <Text style={{ fontWeight: "bold" }}> Address </Text> : {deliveryAddress}</Text>
                </Ionicons>
            </View>

            <View style={{ marginTop: 5, backgroundColor: colors.white, paddingBottom: 10 }}>
                <Text style={{ paddingLeft: 10, fontSize: 20, color: 'gray' }}>Orders Details:</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 80 }}
                    data={item}
                    renderItem={({ item, index }) => <CartCard item={item} />}
                    ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
                    ListFooterComponent={() => (
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginVertical: 15,
                                }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                    Total Price
                                </Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>RM{total}</Text>
                            </View>
                        </View>
                    )}
                />
                <Divider style={{ backgroundColor: 'gray', margin: 10 }} />
                <Text style={{ paddingLeft: 10, fontSize: 20, color: 'gray' }}>
                    <Text style={{ fontWeight: "bold" }}> Payment Method </Text>: {payment || 'Card'}</Text>
            </View>

            <View style={styles.btnParentSection}>
                {userType !== 'vendor' && < TouchableOpacity onPress={onPressCompleted} disabled={status !== 3 ? true : false} style={styles.buttonContainer}  >
                    <Text style={styles.buttonText}>Order complete</Text>
                </TouchableOpacity>}

                {userType === 'vendor' && <TouchableOpacity onPress={onPressNext} disabled={status >= 3 ? true : false} style={styles.buttonContainer}  >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>}
            </View>
        </SafeAreaView >
    );
};

export default OrderDetailScreen

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
        // position:'absolute',
        bottom: 0,
        // marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 20,
        width: '95%',
        borderRadius: 12,
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
