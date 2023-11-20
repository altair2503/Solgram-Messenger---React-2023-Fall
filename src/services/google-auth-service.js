import { signInWithPopup, GoogleAuthProvider, } from "firebase/auth";
import {auth, provider, db} from "../database/firebase";
import { doc, setDoc } from "firebase/firestore";
import {User} from "../models/user-model"
import {ifUserExist} from "./user-service";

export const LogInWithGoogle = ()=>{
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(result.user);
            await addUserToFirestore(result);
            localStorage.setItem("user", result.user.uid)
        }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    }).finally(() => window.location.reload());
}

const  addUserToFirestore = async (result) => {
    const newUser = new User(result.user.uid, result.user.displayName, result.user.photoURL);
    if(await ifUserExist(newUser.uid)){
        return;
    }
    await setDoc(doc(db, "users", newUser.uid), {
        uid: newUser.uid,
        name: newUser.name,
        img: newUser.img,
        chats: []
    });
}



