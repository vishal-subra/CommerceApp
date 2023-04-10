import React, { Component } from 'react'
import { AsyncStorage, Alert, StyleSheet, Text, ScrollView, TextInput, View, TouchableOpacity, TouchableHighlight, Image, Button } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'


const AddressScreen = ({ route, navigation }) => {

	const { id } = route.params
	
    return (
        <React.Fragment>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.buttonAdd} onPress={() => navigation.navigate('UpdateAddress', { id: id })}>
                    <Text style={{ color: '#000' }}>Add Address</Text>
                </TouchableOpacity>
            </View>
        </React.Fragment>
    )
}

export default AddressScreen

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
		marginTop: 80,
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
		flex: 1, 
		justifyContent: 'center', 
		paddingLeft: 30, 
		borderBottomWidth: 1, 
		borderTopWidth: 1, 
		borderColor: 'white',
		backgroundColor: 'white'
	}
})