import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, ScrollView, TextInput, View, TouchableOpacity, TouchableHighlight, Image, Button } from 'react-native'
import notifyMessage from '../ulti/notification.js';


const UpdateNameScreen = ({ route, navigation }) => {
	const { id } = route.params

	const onChangeText = (text) => {

		if (!text ) {
            notifyMessage('please complete all field')
        } else {
		navigation.setParams({ id: id, name: text })
		}

	}

	return (
		<View>
			<View style={styles.container}>
				<TextInput placeholder="Name" style={styles.items} onChangeText={(text) => onChangeText(text)} />
			</View>

		</View>
	)
}

const HeaderButtonComponent = (props) => (
	<HeaderButton
		IconComponent={Ionicons}
		iconSize={23}
		color="#FFF"
		{...props}
	/>
);

UpdateNameScreen.header = (navData) => {
	return {
		headerTitle: "Home",
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
				<Item
					title="Setting"
					iconName="ios-settings-outline"
					onPress={() => navData.navigation.navigate("Setting")}
				/>
			</HeaderButtons>
		),
	};
};

export default UpdateNameScreen


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
		height: 100,
		paddingLeft: 20,
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