import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = () => {
  return (
    <View style={styles.headerStyle}>
      <Icon name="ios-close" size={35} color='#FFFFFF'/>
      <Text style={{ fontSize: 18 ,color: 'white' }}>Shopping Cart</Text>
      <Text style={{ color: 'white' }}>Empty</Text>
    </View>
  );
};

const styles = {
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 56,
    paddingright: 4,
    paddingleft: 4,
    backgroundColor: '#0FA956',
  }
};

export default Header;
