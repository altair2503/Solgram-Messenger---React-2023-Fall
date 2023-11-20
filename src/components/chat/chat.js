import "./chat.css"
import {userLogOut} from "../../services/user-service";
import {useEffect, useState, useRef} from "react";
import {NewChat, sendChatMessage} from "../../services/chat-service";
import {collection, doc, onSnapshot} from "firebase/firestore";
import {db} from "../../database/firebase";
import { IoMdSend, IoIosLogOut } from "react-icons/io";



const Chat = ()=> {
    const [user, setUser] = useState("");
    const [users, setUsers] = useState([]);
    const [currentChat, setCurrenChat] = useState("");
    const [dialog, setDialog] = useState([]);
    const [message, setMessage] = useState("");
    const chatRef = useRef();

    const selectUser = async (friend) => {
       let chatID = await NewChat(user, friend);
       setCurrenChat({friend: friend, chatID: chatID});
       onSnapshot(doc(db, "chats", chatID), (doc) => {
           setDialog(doc.data()['messages']);
        });
    }

    const sendMessage = () => {
        sendChatMessage(currentChat.chatID, {text: message, senderID: user.uid})
        setMessage("")
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                onSnapshot(doc(db, "users", localStorage.getItem("user")), (doc) => {
                    setUser(doc.data());
                });
                onSnapshot(collection(db, "users"), (querySnapshot) => {
                    const result = querySnapshot.docs.map(doc => doc.data());
                    setUsers(result);
                });
            } catch (error) {
                // Handle error, e.g., log or show an error message
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [dialog]);



    return (
        <div className="chat-main">
            <div className="chat-left-side">
                <div className="chat-left-side-user">
                    <img src={user?.img} alt={`${user?.name} avatar`} className="chat-left-side-user-avatar"/>
                    <div className="chat-left-side-info">
                        <span className="chat-left-side-info-element">Chats</span>
                        <IoIosLogOut className="chat-left-side-info-element-logout" onClick={userLogOut} />
                    </div>
                </div>
                <div>
                    {users?.map((u, i) => {
                        return (
                            <div className="chat-left-side-users">
                                {u.uid === user.uid ?
                                    (<div> </div>) :
                                    (<div className="chat-left-side-user" onClick={() => selectUser(u)}>
                                        <img src={u.img} alt={`${u.name} avatar`} className="chat-left-side-user-avatar"/>
                                        <div className="chat-left-side-info">
                                            <div className="chat-left-side-info-element">{u.name}</div>
                                        </div>
                                    </div>)
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="chat-right-side">
                {currentChat ? (
                    <div>
                        <header className="chat-right-side-header">
                            <div>
                                <img src={currentChat.friend.img} className="chat-right-side-user-avatar"/>
                            </div>
                            <div className="chat-ride-side-user-info">
                                <p>
                                    <a> {currentChat?.friend?.name} </a> <br />
                                    <i> Last seen recently </i>
                                </p>
                            </div>
                        </header>
                        {/*<section className="chat-right-side-dialog">*/}
                        {/*    {dialog?.map((e, i) => {*/}
                        {/*        return (*/}
                        {/*            <div>*/}
                        {/*                {e.senderID === user.uid ?*/}
                        {/*                    <div className="bubble recipient first">*/}
                        {/*                        Sender: You<br />*/}
                        {/*                        Text: {e.text} <br />*/}
                        {/*                        Time: {e.time} <br />*/}
                        {/*                    </div>*/}
                        {/*                    :*/}
                        {/*                    <div className="bubble sender first">*/}
                        {/*                        Sender: {currentChat.friend.name}<br />*/}
                        {/*                        Text: {e.text} <br />*/}
                        {/*                        Time: {e.time} <br />*/}
                        {/*                    </div>}*/}
                        {/*            </div>*/}
                        {/*        )*/}
                        {/*    })}*/}
                        {/*</section>*/}
                        <section className="chat-right-side-dialog" ref={chatRef}>
                                {dialog?.map((e, i) => {
                                    return (
                                        e.senderID === user.uid ?
                                            <div className="bubble sender">
                                                <e> {e.text} </e> <br />
                                                <i><time>{e.time}</time></i>
                                            </div>
                                            :
                                            <div className="bubble recipient">
                                                <e> {e.text} </e> <br />
                                                <i>{e.time}</i>
                                            </div>
                                        )
                                })}
                        </section>
                        <footer className="chat-right-side-footer">
                            <input type="text"
                                   placeholder={"Write message here..."}
                                   onChange={event => setMessage(event.target.value)}
                                   value={message}
                                   onKeyDown={(e) => (e.key === 'Enter' ? sendMessage() : null)}
                                   className="chat-right-side-footer-input"
                            />
                            <IoMdSend onClick={sendMessage} className="chat-right-side-footer-send" />
                        </footer>
                    </div>
                ) : (
                    <div className="chat-right-side-select">
                        Select chat
                    </div>
                )}
            </div>
        </div>
    )
}

export default Chat;