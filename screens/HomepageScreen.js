import React, { useEffect, useState } from 'react'
import { View, Text, useColorScheme, SafeAreaView, StyleSheet, StatusBar, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import { FONTS, SIZES, COLORS, Button, Gap, icons, Header, BoxItemCategories, BoxItemTopProduct } from '../component'
import { IL_Cauliflawer_PNG, IL_Grapes_PNG, IL_Greentea_PNG, IL_Tomato_PNG } from '../assets/images/Illustrations'
import { getPopularProduct } from '../actions/productsActions';
import { useSelector, useDispatch } from 'react-redux';
import { SearchBar } from 'react-native-elements';


const HomepageScreen = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const product = useSelector(state => state.popularproduct);
  const [search, setSearch] = useState('');
  const [masterDataSource, setMasterDataSource] = useState([]);
  const { data ,status} = product;
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  
  const dispatch = useDispatch();


  useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(getPopularProduct())

    }
    return () => {
      mounted = false
    };

  }, []);

  useEffect(() => {
    
    if (status) {
      console.log(data)
      setFilteredDataSource(data)

    }
    return () => {
     
    };

  }, [status]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
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
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(data);
      setSearch(text);
    }
  };

  const searchFilterCategories = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = data.filter(function (item) {
        const itemData = item.category
          ? item.category.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(data);
      setSearch(text);
    }
  };

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
               containerStyle={{ marginTop: 20, borderRadius: 8, height:60}}
                onChangeText={(text) => searchFilterFunction(text)}
                onClear={(text) => searchFilterFunction('')}
                placeholder="Search Here"
                value={search}
              />
              {/* <TextInput placeholder="Search" style={styles.textInputSearch} />
              <Image source={icons.search} style={styles.searchImage} /> */}
            </View>
          </View>
          {/* categories */}
          <View>
            <Text style={styles.titleCategories}>Categories</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollViewCategories}>
                <BoxItemCategories
                icon={icons.all}
                color="white"
                text="All"
                onPress={() => setFilteredDataSource(data)}
              />
              <BoxItemCategories
                icon={icons.fruit}
                color="white"
                text="Fruits"
                onPress={() => searchFilterCategories( 'Fruits')}
              />
              <BoxItemCategories
                icon={icons.vegetables}
                color="white"
                text="Vegetables"
                onPress={() =>searchFilterCategories( 'Vegetables')}
              />
              <BoxItemCategories
                icon={icons.herbal}
                color="white"
                text="Herbals"
                onPress={() => searchFilterCategories('Herbals')}
              />
               <BoxItemCategories
                icon={icons.drink}
                color="white"
                text="Ayurvedic Herbs"
                onPress={() => searchFilterCategories('Ayurvedic Herbs')}
              />
               <BoxItemCategories
                icon={icons.gift}
                color="white"
                text="Gadgets"
                onPress={() => searchFilterCategories('Gadgets')}
              />

            </ScrollView>
          </View>
          <Gap height={24} />
          {/* top products */}
          <View>
            <View style={styles.wrapperHeadTopProducts}>
              <Text style={styles.tittleTopProducts}>Products</Text>

            </View>
            <View style={styles.sectionBoxTopProduct}>
              {filteredDataSource.map((item, index) => {
                return (
                  <BoxItemTopProduct
                    key={index}
                    bgColor={'#FFFFFF'}
                    icon={item.image}
                    text={item.name}
                    price={item.price}
                    onPress={() => navigation.navigate('Detail', item)}
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


export default HomepageScreen

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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  searchImage: {
    borderRadius: 10,
    width: 24,
    height: 24,
  },
});