import { firebase, auth, db } from '../firebase.js'
import {
    TRANSACTION_STATUS_REQUEST, TRANSACTION_STATUS_SUCCESS,
    TRANSACTION_STATUS_FAIL, TRANSACTION_UPDATE_REQUEST,
    TRANSACTION_UPDATE_FAIL, TRANSACTION_UPDATE_SUCCESS,
    TRANSACTION_ADD_REQUEST, TRANSACTION_ADD_SUCCESS,
    TRANSACTION_ADD_FAIL, TRANSACTION_DELETE_REQUEST,
    TRANSACTION_DELETE_SUCCESS, TRANSACTION_DELETE_FAIL
} from "../constants/transactionConstants";
import { collection, addDoc, doc, onSnapshot, getDocs, query, where, deleteDoc, writeBatch ,increment} from "firebase/firestore";
import notifyMessage from '../ulti/notification.js';


const getTransaction = (id, type) => async (dispatch) => {
    dispatch({ type: TRANSACTION_STATUS_REQUEST, payload: { id } });
    const uid = id
    let search_id = type === 'user' ? 'id' : 'vendorId'
    try {
        console.log(uid)
        const q = query(collection(db, "transaction"), where(search_id, "==", uid));
        const querySnapshot = await getDocs(q);

        console.log(querySnapshot)
        let data = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data())
            data.push({ ...doc.data(), delivery_id: doc.id })

        });
        dispatch({ type: TRANSACTION_STATUS_SUCCESS, payload:  data  });

    } catch (e) {
        console.error("Error adding document: ", e);
        dispatch({ type: TRANSACTION_STATUS_FAIL, payload: e });
    }

}


// const getTransaction = (id) => async (dispatch) => {
//     dispatch({ type: TRANSACTION_STATUS_REQUEST, payload: { id } });
//     const uid = id
//     try {
//         const q = query(collection(db, "transaction"), where("id", "==", uid));
//         const querySnapshot = await getDocs(q);

//         let data = [];
//         let total = 0
//         querySnapshot.forEach((doc) => {
//             console.log(doc.data())
//             data.push({ ...doc.data(), cart_id: doc.id })
//             total += doc.data().price*(doc.data().number||1)

//         });
//         dispatch({ type: TRANSACTION_STATUS_SUCCESS, payload: { cart: data, total: total } });

//     } catch (e) {
//         console.error("Error adding document: ", e);
//         dispatch({ type: TRANSACTION_STATUS_FAIL, payload: e });
//     }



// }

// const signin = (email, password) => async (dispatch) => {
//     dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

//     try {
//         const q = query(collection(db, "users"), where("id", "==", "D3W4xXOC5OagCJvsnNYToIzw1jt2"));
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//           // doc.data() is never undefined for query doc snapshots
//           console.log(doc.id, " => ", doc.data());
//         });
//     } catch (error) {

//         console.log(error)
//     }


// }


const addTransaction = (items, total, id,deliveryAddress,payment) => async (dispatch) => {
    dispatch({ type: TRANSACTION_ADD_REQUEST, payload: { data, total, id } });

    const Batch = writeBatch(db);
    const data = {
        id: id,
        items: items,
        total: total,
        status: 0,
        deliveryAddress:deliveryAddress,
        payment:payment
    };


    let vendor = {}
    items.forEach(a => {
      
        if (vendor[a.vendorId]) {
            vendor[a.vendorId]['items'].push(a)
        } else {
            vendor[a.vendorId] = {}
            vendor[a.vendorId]['vendorId'] = a.vendorId
            vendor[a.vendorId]['total'] = total
            vendor[a.vendorId]['status'] = 0
            vendor[a.vendorId]['id'] = id
            vendor[a.vendorId]['items'] = []
            vendor[a.vendorId]['items'].push(a)
            vendor[a.vendorId]['deliveryAddress']= deliveryAddress
            vendor[a.vendorId]['payment']= payment
        }

    })

    for (let a in vendor) {
        Batch.set(doc(collection(db, "transaction")), vendor[a]);
    }

    try {

        await Batch.commit();
        dispatch({ type: TRANSACTION_ADD_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: TRANSACTION_ADD_FAIL, payload: error });
    }

    // try {
    //     const docRef = await addDoc(collection(db, "transaction"), data);
    //     console.log("Transaction successfully added", docRef.id);
    //     dispatch({ type: TRANSACTION_ADD_SUCCESS, payload: data });
    // } catch (e) {
    //     console.error("Error adding user: " + e);
    //     notifyMessage(e.message)
    //     dispatch({ type: TRANSACTION_ADD_FAIL, payload: e });
    // }


}

const updateStatus = (transaction_id, status, item) => async (dispatch) => {
    const Batch = writeBatch(db);
    dispatch({ type: TRANSACTION_UPDATE_REQUEST });
    try {
        if (status === 3) {
            item.forEach(a => {
                Batch.update(doc(db, "product", a.product_id), { sold: increment(a.number||1) });
            })
        }


        Batch.update(doc(db, "transaction", transaction_id), { status: status+1 });

        await Batch.commit();
        dispatch({ type: TRANSACTION_UPDATE_SUCCESS, payload: {} });

    } catch (e) {
        console.error("Error adding document: ", e);
        dispatch({ type: TRANSACTION_UPDATE_FAIL, payload: e });
    }
}




export { getTransaction, addTransaction, updateStatus };