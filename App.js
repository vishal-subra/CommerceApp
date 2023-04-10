import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import CustomAppBar from './component/customAppBar'
import SigninScreen from './screens/SignInScreen'
import SplashScreen from './screens/SplashScreen'
import SignupScreen from './screens/SignUpScreen'
import HomeScreen from './screens/HomeScreen'
import HomepageScreen from './screens/HomepageScreen'
import DetailScreen from './screens/DetailScreen'
import CartScreen from './screens/CartScreen'
import ChatbotScreen from './screens/ChatbotScreen'
import AddressScreen from './screens/AddressScreen'
import CreditCardScreen from './screens/CreditCardScreen'
import GetStartedScreen from './screens/GetStartScreen'
import LeaderboardScreen from './screens/LeaderboardScreen'
import PaymentScreen from './screens/PaymentScreen'
import OrderDetailScreen from './screens/OrderDetailScreen'
import SpiningWheelScreen from './screens/SpinningWheel'
import UpdateProfileScreen from './screens/UpdateProfileScreen'
import UpdateAddressScreen from './screens/UpdateAddressScreen'
import UpdateCardScreen from './screens/UpdateCardScreen'
import UpdateNameScreen from './screens/UpdateNameScreen'
import UpdatePhoneScreen from './screens/UpdatePhoneScreen'
import VendorHomeScreen from './screens/VendorHomeScreen'
import VendorAddProductScreen from './screens/VendorAddProductScreen'
import store from './store'
import OrdersVendorScreen from './screens/OrdersVendorScreen'
import HerbaList from './screens/HerbaList'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="Splash" options={{ headerShown: false }} component={SplashScreen} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={SigninScreen} />
          <Stack.Screen name="Signup" options={{ headerShown: false }} component={SignupScreen} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
          <Stack.Screen name="Homepage" options={{ headerShown: false }} component={HomepageScreen} />
          <Stack.Screen name="ChatbotScreen"
            options={{ header: (props) => <CustomAppBar {...props} title='Live Chat' /> }}
            component={ChatbotScreen} />
          <Stack.Screen name="CartScreen"
            options={{ header: (props) => <CustomAppBar {...props} title='Cart' /> }}
            component={CartScreen} />
          <Stack.Screen name="OrderDetailScreen"
            options={{ header: (props) => <CustomAppBar {...props} title='Cart' /> }}
            component={OrderDetailScreen} />
          <Stack.Screen name="Detail"
            options={{ header: (props) => <CustomAppBar {...props} title='Detail' /> }}
            component={DetailScreen} />
          <Stack.Screen name="PaymentScreen"
            options={{ header: (props) => <CustomAppBar {...props} title='payment' /> }}
            component={PaymentScreen} />
          <Stack.Screen name="GetStart" options={{ headerShown: false }} component={GetStartedScreen} />
          <Stack.Screen name="Leaderboard" options={{ headerShown: false }} component={LeaderboardScreen} />
          <Stack.Screen name="UpdateProfile"
            options={{ header: (props) => <CustomAppBar {...props} type='edit' title='UpdateProfile' /> }}
            component={UpdateProfileScreen} />
          <Stack.Screen name="UpdateAddress"
            options={{ header: (props) => <CustomAppBar {...props} type='edit' title='Add Address' /> }}
            component={UpdateAddressScreen} />
          <Stack.Screen name="UpdateCard"
            options={{ header: (props) => <CustomAppBar {...props} type='edit' title='Credit Card' /> }}
            component={UpdateCardScreen} />

          <Stack.Screen name="OrdersVendorScreen"
            options={{ header: (props) => <CustomAppBar {...props} title='Orders' /> }}
            component={OrdersVendorScreen} />
          <Stack.Screen name="UpdateName"
            options={{ header: (props) => <CustomAppBar {...props} type='edit' title='Name' /> }}
            component={UpdateNameScreen} />
          <Stack.Screen name="UpdatePhone"
            options={{ header: (props) => <CustomAppBar {...props} type='edit' title='Phone' /> }}
            component={UpdatePhoneScreen} />
          <Stack.Screen name="SpinWheel"
            options={{ header: (props) => <CustomAppBar {...props} title='payment' /> }}
            component={SpiningWheelScreen} />
          <Stack.Screen name="Address"
            options={{ header: (props) => <CustomAppBar  {...props} type='edit' title='Address' /> }}
            component={AddressScreen} />
          <Stack.Screen name="CreditCard"
            options={{ header: (props) => <CustomAppBar  {...props} type='edit' title='CreditCard' /> }}
            component={CreditCardScreen} />

          <Stack.Screen name="Vendor"
            options={{ header: (props) => <CustomAppBar {...props} title='Admin' /> }}
            component={VendorHomeScreen} />

            <Stack.Screen name="Herbalist"
            options={{ header: (props) => <CustomAppBar {...props} title='Herbalist' /> }}
            component={HerbaList} />

          <Stack.Screen name="AddProduct" component={VendorAddProductScreen} />


        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
