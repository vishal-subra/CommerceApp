import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { SIZES, COLORS, BoxRelatedItems, Button, Counter, Gap, Header } from '../component'
import { FlatList } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../assets/colors/colors'
import PrimaryButton from '../component/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, cartDelete, deleteCart } from '../actions/cartActions';
import { addTransaction } from '../actions/transactionsActions';
import { useIsFocused } from "@react-navigation/native";
import notifyMessage from '../ulti/notification.js';

const CartScreen = ({ route, navigation }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error, login } = userSignin;

    const userProfile = useSelector(state => state.userProfile);
    const { data:userData} = userProfile;
    const userCart = useSelector(state => state.userCart);
    const { data, status } = userCart;
    const cartDelete = useSelector((state) => state.cartDelete);

    console.log(userInfo)

    useEffect(() => {
        let mounted = true;
        // if (userInfo && login) {
        //     if (mounted) {
        //         console.log("asd")
        dispatch(getCart(userInfo.id))
        //     }

        return () => mounted = false;

    }, [isFocused]);

    useEffect(() => {
        setAddress(userData.address)
        // return () => mounted = false;

    }, []);


    const checkOut = () => {

        if (data.cart.length <= 0) {
            notifyMessage('Cart is Empty!')
            return
        }

        if (!address) {
            notifyMessage('Address is Empty!')
            return
        }

        navigation.navigate('PaymentScreen', {
            item: data.cart,
            total: data.total,
            id: userInfo.id,
            deliveryAddress: address
        })
        // dispatch(addTransaction(data.cart, data.total, userInfo.id))
        // .then(dispatch(deleteCart(data.cart))).then( dispatch(getCart(userInfo.id)));
        // dispatch(getCart(userInfo.id))
    }



    const CartCard = ({ item }) => {
        console.log(item)

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



    return (
        <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>

            <TextInput
                defaultValue={'dqwdqwdqw'}
                label="Please Enter your Delivery Address"
                value={address}
                placeholder="Your Address"
                onChangeText={value => setAddress(value)}
                style={styles.TextInputs}
            />

            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={data.cart}
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
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>RM{data.total}</Text>
                        </View>
                        <View style={styles.btnParentSection}>
                            <TouchableOpacity onPress={checkOut} style={styles.buttonContainer}  >
                                <Text style={styles.buttonText}>Checkout Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default CartScreen

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
        backgroundColor: "#de3b04",
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
