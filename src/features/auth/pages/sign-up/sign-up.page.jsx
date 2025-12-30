import { Link } from "react-router-dom";
export const SignUpPage = () => {
    return (
        <div>
            <h1 style={{ fontSize: "2rem" }}>Sign Up Page</h1>
            <Link to="/" style={{color: "blue"}}>Return to Main page</Link>
        </div>
    );
};