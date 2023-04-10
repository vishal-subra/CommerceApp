import React, { useState } from 'react';
import { StyleSheet, View, Image, Picker, Text, TouchableOpacity,ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { PrimaryButton } from '../component/Button';
import { TextInput } from 'react-native-paper';
import colors from '../assets/colors/colors';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../actions/productsActions';
import notifyMessage from '../ulti/notification.js';


const VendorAddProductScreen = ({ route, navigation }) => {

    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error, login } = userSignin;
    const [image, setImage] = useState(null);
    const [unitvalue, setUnitValue] = useState('');
    const [unit, setUnit] = useState('g');
    const [name, setName] = useState('');
    const [price, setCardNumber] = useState('');
    const [category, setExpiration] = useState('Fruits');
    const [vendorname, setVendorName] = useState('');
    const [description, setDescription] = useState('none');

    const test = (s) => {
        setUnit(s)
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.cancelled) {
            setImage({ uri: result.uri });
        }
    };


    const submit = () => {
        if (!name || !category || !price || !vendorname || !unit) {
            notifyMessage('Please complete all Details')
        } else {
            dispatch(addProduct(name, category, price, vendorname, userInfo.id, image, unit, unitvalue, description));
            notifyMessage('Product Successfully Added')
        }

    }

    return (
        <ScrollView>
            <View style={styles.ImageSections}>
                <TouchableOpacity
                    onPress={pickImage} >
                    <Image source={image ? { uri: image.uri } : require(`../assets/images/dummy.jpg`)} style={styles.images} />
                </TouchableOpacity>
            </View>
            <TextInput
                label="Product name"
                value={name}
                placeholder='Product Name'
                onChangeText={name => setName(name)}
                style={styles.TextInputs}
            />
            <TextInput
                label="Price (RM)"
                value={price}
                keyboardType='numeric'
                placeholder="10"
                onChangeText={cardNumber => setCardNumber(cardNumber)}
                style={styles.TextInputs}
            />
             <TextInput
                label="Unit Value"
                value={unitvalue}
                keyboardType='numeric'
                placeholder="10"
                onChangeText={unitvalue => setUnitValue(unitvalue)}
                style={styles.TextInputs}
            />
            <Text>Unit</Text>
            <Picker
                selectedValue={unit}
                style={styles.Picker}
                onValueChange={(unitselected, itemIndex) => test(unitselected)}
            >
                <Picker.Item label="Unit" value="piece" />
                <Picker.Item label="Gram" value="g" />
                <Picker.Item label="Kilogram" value="KG" />
            </Picker>
            <Text>Category</Text>
            <Picker selectedValue={category}
                style={styles.Picker}
                onValueChange={(itemValue, itemIndex) => setExpiration(itemValue)}
            >
                <Picker.Item label="Fruits" value="Fruits" />
                <Picker.Item label="Vegetables" value="Vegetables" />
                <Picker.Item label="Herbals" value="Herbals" />
                <Picker.Item label="Ayurvedic Herbs" value="Ayurvedic Herbs" />
                <Picker.Item label="Gadgets" value="Gadgets" />
            </Picker>
            <TextInput
                label="Seller"
                value={vendorname}
                placeholder="Seller Name"
                onChangeText={vendorname => setVendorName(vendorname)}
                style={styles.TextInputs}
            />
            <TextInput
                label="Description(Optional)"
                value={description}
                placeholder="Description"
                onChangeText={description => setDescription(description)}
                style={styles.TextInputs}
            />

            <View style={styles.btnParentSection}>
                <TouchableOpacity onPress={submit} style={styles.buttonContainer}  >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>


    )
}

export default VendorAddProductScreen

const styles = StyleSheet.create({
    btnParentSection: {
        alignItems: 'center',
        marginTop: 20
    },
    btnSection: {
        width: 300,
        height: 50,
        backgroundColor: '#788eec',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 10
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
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
    images: {
        width: 160,
        height: 160,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    },
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
    },

    Coloum: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center'
    },
    TextInputs: {
        backgroundColor: 'white'
    },
    Picker: {
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 10,
        paddingTop: 10,

    },
})
