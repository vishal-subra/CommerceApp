import React, { useEffect, useState } from 'react'
import { View, Text, useColorScheme, SafeAreaView, StyleSheet, StatusBar, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import { FONTS, SIZES, COLORS, Button, Gap, icons, Header, BoxItemCategories, BoxItemTopProduct } from '../component'
import { getTransaction } from '../actions/transactionsActions';
import { useSelector, useDispatch } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import Order from '../component/Order';
import { useIsFocused } from "@react-navigation/native";


const OrdersScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const isDarkMode = useColorScheme() === 'dark';
  const transaction = useSelector(state => state.transaction);
  const [search, setSearch] = useState('');
  const { data, status } = transaction;
  const userProfile = useSelector(state => state.userProfile);
  const { data: userData } = userProfile;
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const dispatch = useDispatch();

  const statusMap = new Map([
    [0, 'Pending'],
    [1, 'To be received'],
    [2, 'To be received'],
    [3, 'To be received'],
    [4, 'Completed'],
  ])


  useEffect(() => {
    let mounted = true;
    // if (mounted) {
      dispatch(getTransaction(userData.id, userData.type))
      // dispatch(getPopularProduct())
    // }
    return () => {
      mounted = false
    };

  }, [isFocused]);

  useEffect(() => {
    if (status) {
      setFilteredDataSource(data)
    }
    return () => {
    };
  }, [status,isFocused]);


  const searchFilterFunction = (text) => {
    if (text) {

      const newData = data.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(data);
      setSearch(text);
    }
  };

  const onPressDetail = (item) => {
    console.log(item.items)
    navigation.navigate('OrderDetailScreen', {
      transaction_id:item.delivery_id,
      item: item.items,
      total: item.total,
      status: item.status,
      deliveryAddress: item.deliveryAddress,
      payment: item.payment,
      userType:userData.type
    })
  }


  // item, total, status, deliveryAddress, payment


  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.flex1}>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* search */}
          <View style={{ paddingHorizontal: 30 }}>
            <View >
              <SearchBar
                platform='android'
                containerStyle={{ marginTop: 20, borderRadius: 8, height: 60 }}
                onChangeText={(text) => searchFilterFunction(text)}
                onClear={(text) => searchFilterFunction('')}
                placeholder="Type Here..."
                value={search}
              />
              {/* <TextInput placeholder="Search" style={styles.textInputSearch} />
              <Image source={icons.search} style={styles.searchImage} /> */}
            </View>
          </View>
          {/* categories */}
          <Gap height={24} />
          {/* top products */}
          <View>
            <View style={styles.wrapperHeadTopProducts}>
              <Text style={styles.tittleTopProducts}>Orders</Text>

            </View>
            <View style={styles.sectionBoxTopProduct}>
              {filteredDataSource.map((item, index) => {
                return (
                  <Order
                    amount={item.total}
                    name={userData.id.fullName}
                    status={statusMap.get(item.status)}
                    orderId={item.delivery_id}
                    onPress={() => onPressDetail(item)}
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}


export default OrdersScreen

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  wrapperSearch: {
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginTop: 20,
  },
  titleCategories: {
    fontSize: 18,
    color: COLORS.darkGreen,
    padding: 20,
  },
  scrollViewCategories: {
    paddingLeft: 20,
  },
  wrapperHeadTopProducts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  tittleTopProducts: {
    color: COLORS.darkGreen,
    fontSize: 20,
  },
  textSeeAll: {
    color: COLORS.black,
    fontSize: 12,
  },
  sectionBoxTopProduct: {
    flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'center',
  },
  searchImage: {
    borderRadius: 10,
    width: 24,
    height: 24,
  },
});