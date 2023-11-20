import { db } from "../database/firebase"
import { doc, getDoc, getDocs, onSnapshot, collection} from "firebase/firestore";
import {User} from "../models/user-model";


export async function ifUserExist(userID){
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
}

export async function getUsers() {
    let users = [];
    console.log("Reading data from getUsers");
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        users.push(new User(doc.data()['uid'], doc.data()['name'], doc.data()['img'], doc.data()['chats']))
    });
    return users;
}

export async function userLogOut(){
    localStorage.removeItem("user");
    window.location.reload();
}