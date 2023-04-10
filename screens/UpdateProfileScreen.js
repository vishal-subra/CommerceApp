import React, { useEffect, useState, useRef } from 'react'
import {
    View, Text, StyleSheet, SafeAreaView, Image, FlatList, TextInput, ScrollView, Dimensions, TouchableOpacity
} from 'react-native'
import { Avatar, ListItem, Icon } from 'react-native-elements'
import { LinearGradient } from "expo-linear-gradient"
import * as ImagePicker from 'expo-image-picker'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile } from '../actions/userActions'
import { FONTS, SIZES, COLORS } from '../component'

const UpdateProfileScreen = ({ route, navigation }) => {

    const list = [
        {
            title: 'Fullname',
            name: route.params.name,
            navigate:'UpdateName'
        },
        {
            title: 'Phone',
            name: route.params.phone,
            navigate:'UpdatePhone'
        }
    ]

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, data, error, status } = userUpdate;
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const { id } = route.params;

    const dispatch = useDispatch();
    const firstUpdate = useRef(true);

    useEffect(() => {

        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (status) {
            navigation.pop(1)
        }
        return () => {
            //
        };

    }, [status]);

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

    const next = () => {
        if (!image && !name) {
            // notifyMessage('Please upload your profile image or enter your name.') 
        } else {
            dispatch(updateProfile(name, image, id, phone));
        }

    };

    return (
        <SafeAreaView>
            <View style={styles.body}>
                <LinearGradient
                    style={styles.header}
                    colors={['#08d4c4', '#0FA956']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                >
                    <View style={styles.ImageSections}>
                        <View>
                            <TouchableOpacity
                                onPress={pickImage}
                            >
                                <Image source={image ? { uri: image.uri } : require(`../assets/images/default_user.png`)}
                                    style={styles.images}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={{ textAlign: 'center', fontSize: 20, paddingBottom: 10, color: 'white' }} >Pick your profile picture.</Text>
                </LinearGradient>
                <View  >
                    {
                        list.map((item, i) => (
                            <ListItem  key={i} onPress={() => navigation.navigate(item.navigate, { id: id })} bottomDivider  >
                                <Icon name={item.icon}
                                    type={item.type}
                                    color={item.color} />
                                <ListItem.Content>
                                    <ListItem.Title>{item.title}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                                <ListItem.Chevron />
                            </ListItem>
                        ))
                    }
                </View>

                <View style={styles.btnParentSection}>
                    <TouchableOpacity onPress={next} style={styles.buttonContainer}  >
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default UpdateProfileScreen

const styles = StyleSheet.create({
    scrollView: {
        // backgroundColor: 'GREEN',
    },

    body: {
        backgroundColor: '#f1f1f1',
        justifyContent: 'center'
    },
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
    },
    images: {
        width: 150,
        height: 150,
        marginHorizontal: 3
    },
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
        backgroundColor: "#0FA956",
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    textInput: {
        padding: 10,
        paddingStart: 30,
        width: 300,
        height: 50,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    InputSections: {
        display: 'flex',
        flexDirection: 'column',
        // paddingHorizontal: 8,
        // paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});