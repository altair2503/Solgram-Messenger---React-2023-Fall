import logo from './logo.svg';
import './App.css';
import SignIn from "./components/sign-in/sign-in";
import Chat from "./components/chat/chat";

function App() {
    const ifLogged = ()=> {
        return localStorage.getItem("user");
    }

    return (
        <div className="main">
            {!ifLogged() ?
                (
                <div className="sign-in">
                    <SignIn />
                </div>
                ) :
                <div>
                    <Chat />
                </div>
            }
        </div>
      );
}

export default App;
