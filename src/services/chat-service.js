import {doc, addDoc, updateDoc, collection, arrayUnion} from "firebase/firestore";
import {db} from "../database/firebase";
import dayjs from "dayjs";

export async function NewChat(user, friend) {
    if(user.chats?.some(chat => chat.friendUID === friend.uid)) return user.chats.filter(chat => chat.friendUID === friend.uid)[0].chat;

    const userRef = doc(db, "users", user.uid);
    const friendRef = doc(db, "users", friend.uid);

    const chatRef = await addDoc(collection(db, "chats"), {
        messages: []
    });

    user.chats.push({chat: chatRef.id, friendUID: friend.uid});
    friend.chats.push({chat: chatRef.id, friendUID: user.uid});
    await updateDoc(userRef, {
        chats: user.chats
    });
    await updateDoc(friendRef, {
        chats: friend.chats
    });
    return chatRef.id
}

export async function sendChatMessage(chatID, message){
    const chatRef = doc(db, "chats", chatID);
    await updateDoc(chatRef, {
        messages: arrayUnion({
            "text": message.text,
            "senderID": message.senderID,
            "time": dayjs(new Date()).format("HH:mm DD/MM/YYYY")
        })
    });
}