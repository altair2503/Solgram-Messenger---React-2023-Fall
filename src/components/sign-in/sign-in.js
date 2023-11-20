import {LogInWithGoogle} from "../../services/google-auth-service";
import "./sign-in.css"
import GoogleButton from 'react-google-button'


const SignIn = ()=> {

    return (
        <div className="sign-in-main">
            <div className="sign-in-interactive">
                <div className="sing-in-greeting">Hello stranger! Before starting you need to sign in with Google</div>
                <div className="googleSingIn">
                    <GoogleButton
                        type="light"
                        onClick={() => LogInWithGoogle()}
                    />
                </div>
            </div>
        </div>
    )
}

export default SignIn;