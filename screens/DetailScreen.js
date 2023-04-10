import React, { useState } from 'react'
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, TouchableOpacity } from 'react-native'
import {  SIZES, COLORS, BoxRelatedItems, Button, Counter, Gap, Header } from '../component'
import { IL_Cauliflawer_PNG, IL_Grapes_PNG, IL_Greentea_PNG, IL_Tomato_PNG } from '../assets/images/Illustrations'
import { addCart } from '../actions/cartActions';
import { useSelector, useDispatch } from 'react-redux';
import notifyMessage from '../ulti/notification.js';

const DetailScreen = ({ route, navigation }) => {

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const dataParams = route.params;
  const bgColor = route.params.bgColor;
  const isDarkMode = useColorScheme() === 'dark';
  const [totalItem, setTotalItem] = useState(1);
  const dispatch = useDispatch();
  
  const checkOut = () => {
    dispatch(addCart(dataParams, userInfo.id, totalItem));
    // dispatch(deleteCart(data.cart)).then( dispatch(getCart(userInfo.id)));
    // dispatch(getCart(userInfo.id))
  }
  console.log(dataParams.image)

  const dataRelatedItems = [
    {
      name: 'Grapes',
      icon: IL_Grapes_PNG,
      bgColor: 'rgba(227,206,243,0.5)',
      price: 1.53,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: 'Tometo',
      icon: IL_Tomato_PNG,
      bgColor: 'rgba(255, 234, 232, 0.5)',
      price: 1.53,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      name: 'Drinks',
      icon: IL_Greentea_PNG,
      bgColor: 'rgba(187, 208, 136, 0.5)',
      price: 1.53,
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];

  const onCounterChange = value => {
    setTotalItem(value);
  };


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#FFFFFF)',
    }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View>
        {/* header */}
        {/* <Header onPress={() => navigation.goBack()} /> */}
        {/* image */}
        <View style={styles.wrapperImg}>
          <Image source={{uri:dataParams.image}} style={styles.image} />

        </View>
        {/* content */}
        <View style={styles.content}>
          {/* top content */}
          <View style={styles.wrapperTopContent}>
            <View style={styles.rowTopContent}>
              <Text style={styles.name}>{dataParams.name}</Text>
              <Counter onValueChange={onCounterChange} />
            </View>
            <Text style={styles.price}>{dataParams.price} / {dataParams.unitvalue} {dataParams.unit}</Text>
          </View>
          {/* description */}
          <Text style={styles.desc}>{dataParams.description}</Text>
          {/* related items */}
          <View style={styles.wrapperRelatedItems}>
            <Text style={styles.titleRelatedItems}>Related Items</Text>
            {/* scrollview */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.wrapperBoxRelatedItems}>
                {/* boxrelateditems */}
                {/* {dataRelatedItems.map((item, index) => {
                  return (
                    <BoxRelatedItems
                      key={index}
                      image={item.icon}
                      name={item.name}
                      price={item.price}
                      bgColor={item.bgColor}
                    />
                  );
                })} */}
              </View>
            </ScrollView>
          </View>
          {/* button add to cart */}
          <Gap height={0} />
          <View style={styles.btnParentSection}>
            <TouchableOpacity onPress={() =>  checkOut()} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>

    </SafeAreaView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  wrapperImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 350,
    width: 350,
    resizeMode: 'contain',
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 30,
    paddingTop: 34,
  },
  wrapperTopContent: {
    marginBottom: 28,
    paddingHorizontal: 20,
  },
  rowTopContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 20,
  },
  price: {
    fontSize: 14,
    color: COLORS.black,
  },
  desc: {
    paddingHorizontal: 20,
  },
  wrapperRelatedItems: {
    marginTop: 25,
  },
  titleRelatedItems: {
    fontSize: 14,
    color: COLORS.primary,
    paddingHorizontal: 20,
  },
  wrapperBoxRelatedItems: {
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 20,
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
