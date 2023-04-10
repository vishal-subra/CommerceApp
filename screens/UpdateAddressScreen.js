import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, ScrollView, TextInput, View, TouchableOpacity, TouchableHighlight, Image, Button } from 'react-native'

const UpdateAddressScreen = ({ route, navigation }) => {

	const { id } = route.params
	const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [poscode, setPoscode] = useState('');
	const [address, setAddress] = useState('');

	const onChangeText = (text) => {

		navigation.setParams({ id: id, address: address + " " + city + " " + poscode + " " + state })

	}


    return (
        <View>
            <View style={styles.container}>
                <TextInput placeholder="State" style={styles.items}  onChangeText={state => setState(state)} />
            </View>
            <View style={styles.container}>
                <TextInput placeholder="City" style={styles.items}  onChangeText={city => setCity(city)} />
            </View>
            <View style={styles.container}>
                <TextInput placeholder="Pos Code" style={styles.items}  onChangeText={poscode => setPoscode(poscode)} />
            </View>
            <View style={styles.container}>
                <TextInput placeholder="House Number,Building,Street Name" multiline={true}   numberOfLines={4} style={styles.itemsFull}  onChangeText={address => onChangeText(address)} />
            </View>
            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
             
            </View>
        </View>
    )
}

export default UpdateAddressScreen


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