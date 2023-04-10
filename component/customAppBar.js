import * as React from 'react'
import { Appbar, Colors } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { updateProfile } from '../actions/userActions'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function CustomAppBar({ route, navigation, back, logout, type, onEditClick, title }) {

  const dispatch = useDispatch();
  const handleLogout = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        navigation.replace('SigninScreen');
    }).catch((error) => {
        // An error happened.
    });
}

  const submitEdit = () => {

    
    dispatch(updateProfile(route.params.name,route.params.image,route.params.id,route.params.phone,route.params.address,route.params.card,route.params.card_expire,route.params.cvv))
  }



  return (
    <Appbar.Header style={styles.appBar}>
      <Appbar.BackAction onPress={navigation.goBack} /> 
      <Appbar.Content title={title||'Herb & Gro'} titleStyle={{ color: 'white' }} />
      {type !== 'edit' ?<Appbar.Action icon="message" onPress={() => navigation.navigate('ChatbotScreen')} /> : null}
      {type !== 'edit' ? <Appbar.Action icon="cart" onPress={() => navigation.navigate('CartScreen')} /> : null}
      {type !== 'edit' ? <Appbar.Action icon="logout" onPress={handleLogout} /> : null}
      {type == 'edit' ? <Appbar.Content title="Edit" onPress={() => submitEdit()}
        titleStyle={{ alignSelf: 'flex-end' }} /> : null}

    </Appbar.Header>
  );

}


export default CustomAppBar

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: '#de3b04',
  },
});