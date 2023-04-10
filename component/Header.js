import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

const RenderHeader = ({props}) => {

    const ordinal_suffix_of = (i) => {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

   
    return (
        <View colors={[, '#1da2c6', '#1695b7']}
            style={{ backgroundColor: '#119abf', padding: 15, paddingTop: 35, alignItems: 'center' }}>
            <Text style={{ fontSize: 25, color: 'white', }}>Leaderboard</Text>
            <View style={{
                flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                marginBottom: 15, marginTop: 20
            }}>
                <Text style={{ color: 'white', fontSize: 25, flex: 1, textAlign: 'right', marginRight: 40 }}>
                    {props?props.fullName:""}
                </Text>
                <Image style={{ flex: .66, height: 60, width: 60, borderRadius: 60 / 2 }}
                    source={{ uri: props?props.image:"https://firebasestorage.googleapis.com/v0/b/react-native-testing-eef6a.appspot.com/o/images%2Fbase%20user.png?alt=media&token=e175640f-bb37-49fa-b2c0-f7e0a922df62" }} />
                <Text style={{ color: 'white', fontSize: 25, flex: 1, marginLeft: 40 }}>
                    {props?props.point:0}pts
                </Text>
            </View>
        </View>
    )
}

export default RenderHeader