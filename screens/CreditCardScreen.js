import React, { Component, useEffect, useState } from 'react'
import { ScrollView, Switch, StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem, Icon } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'

const list = [
    {
        title: 'Maybank',
        name: '*888',
        icon: 'american-express',
        type: 'fontisto',
        color: '#000080',
        navigate: 'UpdateCard'
    },
]


const CreditCardScreen = ({ route, navigation }) => {

    const { id } = route.params


    return (
        <ScrollView style={styles.scroll}>
            <View style={{ flex: 1 }}>
                {
                    list.map((item, i) => (
                        <ListItem key={i} onPress={() => navigation.navigate(item.navigate, { id: id })} bottomDivider  >
                            <Icon name={item.icon}
                                type={item.type}
                                color={item.color} />
                            <ListItem.Content>
                                <ListItem.Title>{item.title}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Chevron />
                        </ListItem>
                    ))
                }



            </View>

        </ScrollView>
    )
}

export default CreditCardScreen


const styles = StyleSheet.create({
    scroll: {
        backgroundColor: 'white',
    },
    userRow: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 8,
        paddingLeft: 15,
        paddingEnd: 15,
        paddingTop: 6,
    },
    userImage: {
        marginRight: 12,
    },
    listItemContainer: {
        height: 55,
        borderWidth: 0.5,
        borderColor: '#ECECEC',
        width: '100%'
    },
})