import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { RadioButton } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather'
import colors from '../assets/colors/colors';
import { PrimaryButton } from '../component/Button';
// import CardScreen from './CardScreen';
import { Card } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCart } from '../actions/cartActions';
import { addTransaction } from '../actions/transactionsActions';
import CreditCardDisplay from 'react-native-credit-card-display';
import notifyMessage from '../ulti/notification.js';
const PaymentScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('card');
    const { item, total, id, deliveryAddress } = route.params;

    const userProfile = useSelector(state => state.userProfile);
    const { loading, data, error, login } = userProfile;



    const onPressProceed = () => {
        if (value === 'card') {
            if (data.card_expire && data.cvv && data.card) {
                dispatch(addTransaction(item, total, id, deliveryAddress,value))
                    .then(dispatch(deleteCart(item)))
                    .then(navigation.pop(2))
            } else {
                notifyMessage('Please complete your credit/debit card information at profile!')
            }
        } else {
            dispatch(addTransaction(item, total, id, deliveryAddress,value))
                .then(dispatch(deleteCart(item)))
                .then(navigation.pop(2))
        }

    }


    const creditCardView = () => {
        if (value === 'card') {
            return (
                <CreditCardDisplay
                    number={data.card || 4444444444444444}
                    cvc={data.cvv || '088'}
                    expiration={data.card_expire || '01/22'}
                    name={data.card_fullname || 'John'}
                    since={data.since || '2014'}
                />
            )
        }

    }


    return (
        <View style={styles.container}>
            <View style={styles.priceWrapper} >
                <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                    <RadioButton.Item label="Card" value="card" />
                    <RadioButton.Item label="Cash" value="cash" />
                </RadioButton.Group>

                {/* {creditCardView()} */}
            </View>
            <View style={styles.btnParentSection}>
                {creditCardView()}
                <TouchableOpacity onPress={onPressProceed} style={styles.buttonContainer}  >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PaymentScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,

        height: 500
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: '60%',
        height: 200,
        marginVertical: 10,
        flex: 1,
    },
    priceWrapper: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    btnParentSection: {
        alignItems: 'center',
        marginTop: 20
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
})
