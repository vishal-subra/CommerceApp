import { firebase, auth, db } from '../firebase.js'
import {
    CART_STATUS_REQUEST, CART_STATUS_SUCCESS,
    CART_STATUS_FAIL, CART_UPDATE_REQUEST,
    CART_UPDATE_FAIL, CART_UPDATE_SUCCESS,
    CART_ADD_REQUEST, CART_ADD_SUCCESS,
    CART_ADD_FAIL, CART_DELETE_REQUEST,
    CART_DELETE_SUCCESS, CART_DELETE_FAIL
} from "../constants/cartConstants";
import { collection, addDoc, doc, onSnapshot, getDocs, query, where, deleteDoc, writeBatch } from "firebase/firestore";
import notifyMessage from '../ulti/notification.js';


const getCart = (id) => async (dispatch) => {
    dispatch({ type: CART_STATUS_REQUEST, payload: { id } });
    const uid = id
    try {
        const q = query(collection(db, "cart"), where("user_id", "==", uid));
        const querySnapshot = await getDocs(q);

        let data = [];
        let total = 0
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), cart_id: doc.id })
            total += doc.data().price*(doc.data().number||1)

        });
        dispatch({ type: CART_STATUS_SUCCESS, payload: { cart: data, total: total } });

    } catch (e) {
        console.error("Error adding document: ", e);
        dispatch({ type: CART_STATUS_FAIL, payload: e });
    }



}

 const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

    try {
        const q = query(collection(db, "users"), where("id", "==", "D3W4xXOC5OagCJvsnNYToIzw1jt2"));
        querySnapshot.forEach((doc) => {
        doc.data()
         console.log(doc.id, " => ", doc.data());
        });
    } catch (error) {

        console.log(error)
   }


 }


const deleteCart = (items) => async (dispatch) => {
    const Batch = writeBatch(db);
    dispatch({ type: CART_DELETE_REQUEST, payload: {items} });
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


const addCart = (items, user_id,quantity) => async (dispatch) => {
    dispatch({ type: CART_ADD_REQUEST, payload: { data,user_id } });
            const data = {...items, user_id, number:quantity};
            try {
                const docRef = await addDoc(collection(db, "cart"), data);
                console.log("cart successfully added", docRef.id);
                dispatch({ type: CART_ADD_SUCCESS, payload: data });
            } catch (e) {
                console.error("Error adding user: " + e);
                notifyMessage(e.message)
                dispatch({ type: CART_ADD_FAIL, payload: e });
            }


}


export { getCart, addCart, deleteCart };