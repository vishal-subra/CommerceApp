import { firebase, auth, db } from '../firebase.js'
import {
    PRODUCT_STATUS_REQUEST, PRODUCT_STATUS_SUCCESS,
    PRODUCT_STATUS_FAIL, PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_SUCCESS,
    PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_FAIL, PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
    PRODUCT_POPULAR_STATUS_REQUEST, PRODUCT_POPULAR_STATUS_SUCCESS,
    PRODUCT_POPULAR_STATUS_FAIL,PRODUCT_VENDOR_STATUS_REQUEST,
    PRODUCT_VENDOR_STATUS_SUCCESS,PRODUCT_VENDOR_STATUS_FAIL
} from "../constants/productConstants";
import {
    collection, addDoc, doc, onSnapshot,
    getDocs, query, where, deleteDoc, writeBatch
    , orderBy, limit
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    ToastAndroid,
    Platform,
    AlertIOS,
} from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob'

// const Blob = RNFetchBlob.polyfill.Blob
// const fs = RNFetchBlob.fs
// window.XMLHttpRequest = RNFetchBlob.polyfil.XMLHttpRequest
// window.Blob = Blob
const Batch = writeBatch(db);
const getProduct = (category) => async (dispatch) => {
    dispatch({ type: PRODUCT_STATUS_REQUEST, payload: { data: [] } });

    try {
        const q = query(collection(db, "product"), where("category", "==", category));
        const querySnapshot = await getDocs(q);

        let data = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push({ ...doc.data(), product_id: doc.id })


        });
        dispatch({ type: PRODUCT_STATUS_SUCCESS, payload: { data: data } });

    } catch (e) {
        console.error("Error adding document: ", e);
        dispatch({ type: PRODUCT_STATUS_FAIL, payload: e });
    }
}

const getVendorProduct = (id) => async (dispatch) => {
    dispatch({ type: PRODUCT_VENDOR_STATUS_REQUEST, payload: { data: [] } });

    try {
        const q = query(collection(db, "product"), where("vendorId", "==", id));
        const querySnapshot = await getDocs(q);

        let data = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push({ ...doc.data(), product_id: doc.id })


        });
        dispatch({ type: PRODUCT_VENDOR_STATUS_SUCCESS, payload: { data: data } });

    } catch (e) {
        console.error("Error adding document: ", e);
        dispatch({ type: PRODUCT_VENDOR_STATUS_FAIL, payload: e });
    }
}


const getPopularProduct = () => async (dispatch) => {
    dispatch({ type: PRODUCT_POPULAR_STATUS_REQUEST, payload: { data: [] } });
    try {
        const vegeQ = query(collection(db, "product"), where("category", "==", 'Vegetables'), orderBy("sold", 'desc'));
        const fruitQ = query(collection(db, "product"), where("category", "==", 'Fruits'), orderBy("sold", 'desc'));
        const herbalQ = query(collection(db, "product"), where("category", "==", 'Herbals'), orderBy("sold", 'desc'));
        const ayurvedicQ = query(collection(db, "product"), where("category", "==", 'Ayurvedic Herbs'), orderBy("sold", 'desc'));
        const gadgetQ = query(collection(db, "product"), where("category", "==", 'Gadgets'), orderBy("sold", 'desc'));
        const vegequerySnapshot = await getDocs(vegeQ);
        const fruitquerySnapshot = await getDocs(fruitQ);
        const herbalquerySnapshot = await getDocs(herbalQ);
        const ayurvedicquerySnapshot = await getDocs(ayurvedicQ);
        const gadgetquerySnapshot = await getDocs(gadgetQ);

        let data = [];
        vegequerySnapshot.forEach((doc) => {

            // doc.data() is never undefined for query doc snapshots
            data.push({ ...doc.data(), product_id: doc.id })

        });
        fruitquerySnapshot.forEach((doc) => {

            // doc.data() is never undefined for query doc snapshots
            data.push({ ...doc.data(), product_id: doc.id })

        });
        herbalquerySnapshot.forEach((doc) => {

            // doc.data() is never undefined for query doc snapshots
            data.push({ ...doc.data(), product_id: doc.id })

        });

        ayurvedicquerySnapshot.forEach((doc) => {

            // doc.data() is never undefined for query doc snapshots
            data.push({ ...doc.data(), product_id: doc.id })

        });
        gadgetquerySnapshot.forEach((doc) => {

            // doc.data() is never undefined for query doc snapshots
            data.push({ ...doc.data(), product_id: doc.id })

        });

        dispatch({ type: PRODUCT_POPULAR_STATUS_SUCCESS, payload: data  });

    } catch (e) {
        console.error("Error adding document: ", e);
        dispatch({ type: PRODUCT_POPULAR_STATUS_FAIL, payload: e });
    }
}


const deleteCart = (items) => async (dispatch) => {
    dispatch({ type: CART_DELETE_REQUEST, payload: { items } });

    try {
        items.forEach(a => {
            Batch.delete(doc(db, "cart", a.cart_id));
        })

        await Batch.commit();
        dispatch({ type: CART_DELETE_SUCCESS, payload: { cart: data, total: total } });
    } catch (error) {
        dispatch({ type: CART_DELETE_FAIL, payload: error });
    }

}


const addProduct = (name, category, price, vendorName, vendorId, image, unit, unitvalue, description) => async (dispatch) => {
    dispatch({ type: PRODUCT_ADD_REQUEST, payload: {} });

    const { uri } = image;
    const imageurl = await uploadImageAsync(uri, name)


    const data = {
        category: category,
        image: imageurl,
        name: name,
        numRating: 0,
        price: parseInt(price),
        rating: 0,
        sold: 0,
        vendorId: vendorId,
        vendorName: vendorName,
        unit: unit,
        unitvalue: unitvalue,
        description: description
    };


    try {
        const docRef = await addDoc(collection(db, "product"), data);
        console.log("Transaction successfully added", docRef.id);
        dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
    } catch (e) {
        console.error("Error adding user: " + e);
        notifyMessage(e.message)
        dispatch({ type: PRODUCT_ADD_FAIL, payload: e });
    }


}

async function uploadImageAsync(uri, name) {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    })
    console.log(blob)

    //   blob=null

    const fileRef = ref(getStorage(), name);
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it


    return await getDownloadURL(fileRef);
}


export { getProduct, addProduct, deleteCart, getPopularProduct,getVendorProduct };