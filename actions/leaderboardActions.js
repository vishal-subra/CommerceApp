import { firebase, auth, db } from '../firebase.js'
import {
    LEADERBOARD_GET_SUCCESS, LEADERBOARD_GET_REQUEST,
    LEADERBOARD_GET_FAIL, RATING_ADD_REQUEST,
    RATING_ADD_SUCCESS, RATING_ADD_FAIL,
    RATING_UPDATE_REQUEST, RATING_UPDATE_SUCCESS,
    RATING_UPDATE_FAIL
} from "../constants/leaderboardConstants";
import { collection, addDoc, doc, onSnapshot, getDocs, query, where, deleteDoc, writeBatch, increment } from "firebase/firestore";
// import notifyMessage from '../ulti/notification.js';

const Batch = writeBatch(db);
const getLeaderboard = () => async (dispatch) => {
    dispatch({ type: LEADERBOARD_GET_REQUEST });
    try {
        const q = query(collection(db, "users"), where("type", "==", "user"));
        const querySnapshot = await getDocs(q);

        let data = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push({ ...doc.data(), cart_id: doc.id })

        });
        dispatch({ type: LEADERBOARD_GET_SUCCESS, payload: { data: data } });

    } catch (e) {
        console.error("Error adding document: ", e);
        dispatch({ type: LEADERBOARD_GET_FAIL, payload: e });
    }
}


const addRating = (item, transaction_id, rating) => async (dispatch) => {
    const Batch = writeBatch(db);
    dispatch({ type: RATING_ADD_REQUEST });
    try {
        item.forEach(a => {
            Batch.update(doc(db, "product", a.product_id), { rating: increment(rating) });
            Batch.update(doc(db, "product", a.product_id), { numRating: increment(1) });
            Batch.update(doc(db, "users", a.vendorId), { point: increment(rating) });
        })

        Batch.update(doc(db, "transaction", transaction_id), { status: 4 });

        await Batch.commit();
        dispatch({ type: RATING_ADD_SUCCESS, payload: {} });

    } catch (e) {
        console.error("Error adding document: ", e);
        dispatch({ type: RATING_ADD_FAIL, payload: e });
    }
}


const updatePoint = (userId, point) => async (dispatch) => {
    const Batch = writeBatch(db);
    dispatch({ type: RATING_UPDATE_REQUEST });
    try {

        Batch.update(doc(db, "users", userId), { point: increment(point || 1) });
        await Batch.commit();
        dispatch({ type: RATING_UPDATE_SUCCESS, payload: {} });

    } catch (e) {
        console.error("Error adding document: ", e);
        dispatch({ type: RATING_UPDATE_FAIL, payload: e });
    }
}



export { getLeaderboard, addRating,updatePoint };