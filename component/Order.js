import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'


const Order = ({ name, orderId, status, amount,onPress }) => {
    const fullwidth = Dimensions.get('window').width

    return (
        <Card styles={{ width: fullwidth }}>
            <Text style={{ fontSize: 16 }}>
                {name || 'User'}
            </Text>
            <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>

                <View style={{ width: "33%", height: 50, borderWidth: 1, borderColor: '#D3D3D3', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#696969' }}>
                        Order ID:
                    </Text>
                    <Text style={{ fontSize: 14, color: '#696969' }}>
                        {orderId || 'None'}
                    </Text>
                </View>
                <View style={{ width: "33%", height: 50, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#D3D3D3', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#696969' }}>
                        Amount:
                    </Text>
                    <Text style={{ fontSize: 14, color: '#696969' }}>
                        {amount || '0'}
                    </Text>
                </View>
                <View style={{ width: "33%", height: 50, borderWidth: 1, borderColor: '#D3D3D3', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#696969' }}>
                        Status:
                    </Text>
                    <Text style={{ fontSize: 14, color: '#696969' }}>
                        {status || 'Pending'}
                    </Text>
                </View>

            </View>
            <Button
                onPress={onPress}
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#0FA956", }}
                title='View Detail' />
        </Card >
    )
};


export default Order;

const styles = StyleSheet.create({
    container: {
        width: 500
    }
});