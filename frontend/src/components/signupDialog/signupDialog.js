import { Link } from "react-router-dom"


const SignupDialog = () => {
    return (
        <div className="popupBox-background">
            <div className="popupBox">
                <h2>New Account</h2>
                <p>New account successfully created</p>
                <Link to="/signin"><button>SIGN IN</button></Link>
            </div>
        </div>
    )
}

export default SignupDialog