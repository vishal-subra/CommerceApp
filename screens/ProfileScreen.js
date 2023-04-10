import React, { Component, useEffect, useState } from 'react'
import { ScrollView, Switch, StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem, Icon } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import InfoText from '../component/Profile/InfoText'
import Chevron from '../component/Profile/Chevron'
import BaseIcon from '../component/Profile/Icon'


const list = [
  {
    title: 'Profile',
    icon: 'person',
    type: 'ionicon',
    color: '#00aced',
    navigate: 'UpdateProfile'

  },
  {
    title: 'Address',
    icon: 'address-card',
    type: 'font-awesome',
    color: '#0FA956',
    navigate: 'Address'
  },
  {
    title: 'Credit Card',
    icon: 'credit-card',
    type: 'font-awesome',
    color: '#f50',
    navigate: 'CreditCard'
  },
]

const ProfileScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.userProfile);
  const { loading, data, error, login } = userProfile;
  console.log(data)

  const getImage = (image) => {
    console.log(image)
    if (image) {
      return <Avatar rounded size="large" source={{ uri: data.image }} />
    } else {
      return <Avatar rounded size="large" source={ require(`../assets/images/default_user.png`) } />
    }
  }


  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.userRow}>
        <View style={styles.userImage}>
          {getImage(data.image)}
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>{data.fullName || "User"}</Text>
          <Text style={{ color: 'gray', fontSize: 16 }}>{data.email || "Email"}</Text>
        </View>
      </View>
      <InfoText text="Account" />
      <View style={{ flex: 1 }}>
        {
          list.map((item, i) => (
            <ListItem key={i} onPress={() => navigation.navigate(item.navigate, { id: data.id, name: data.fullName, phone: data.phone })} bottomDivider  >
              <Icon name={item.icon}
                type={item.type}
                color={item.color} />
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))
        }



      </View>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
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