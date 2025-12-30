import { Link } from "react-router-dom";
export const SignInPage = () => {
    return (
        <div>
            <h1 style={{ fontSize: "2rem" }}>Sign In Page</h1>
            <Link to="/" style={{color: "blue"}}>Return to Main page</Link>
        </div>
    );
};