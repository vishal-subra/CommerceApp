import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, ScrollView, TextInput, View } from 'react-native'

const UpdateCardScreen = ({ route, navigation }) => {

  const { id } = route.params
  const [cardInformation, setCardInformation ]= useState({})
  // const [expiration, setExpiration] = useState('');
  // const [cvv, setCvv] = useState('');

  const onChangeValue = (text,type) => {
    setCardInformation({
      ...setCardInformation,
      [type]:text
    })

  }

  useEffect(() => {
    navigation.setParams(cardInformation)
  }, [cardInformation]);


  return (
    <View>
      <View style={styles.container}>
         <TextInput
          label="Card Number"
          // value={cardNumber}
          placeholder="4242 4242 4242 4242"
          maxLength={16}
          // right={<TextInput.Icon name="credit-card" />}
          onChangeText={cardNumber => onChangeValue(cardNumber,'card')}
          style={styles.items}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          label="Expiration"
          // value={expiration}
          placeholder="MM/YY"
          maxLength={5}
          onChangeText={expiration => onChangeValue(expiration,'card_expire')}
          style={styles.items}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          label="Cvv"
          maxLength={3}
          placeholder="Cvv"
          onChangeText={cvv => onChangeValue(cvv,'cvv')}
          style={styles.items}
        /> 
      </View>
      <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>

      </View>
    </View>
  )
}

export default UpdateCardScreen

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    height: 80,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  headerTop: {
    flexDirection: 'row',
    top: 40,
    alignItems: 'center'
  },
  title: {
    width: '55%',
    marginLeft: '5%'
  },
  text: {
    fontSize: 17,
    color: '#000'
  },
  back: {
    marginLeft: '5%'
  },
  check: {
    marginLeft: '10%'
  },
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#EFEFEF'
  },
  items: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    height: 60,
    justifyContent: 'center',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF'
  },
  itemsFull: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    height: 120,
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
  },
  textLabel: {
    color: '#000000',
    fontWeight: '600'
  },
  text: {
    color: 'grey'
  },
  buttonAdd: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0FA956'
  }
})