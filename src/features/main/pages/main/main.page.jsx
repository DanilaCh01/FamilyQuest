import { Link } from "react-router-dom";
export const MainPage = () => {
    return (
        <div>
            <h1 style={{ fontSize: "2rem" }}>Main Page</h1>
            <ul style={{ padding: "10px 0" }}>
                <li style={{ margin: "10px 0", color: "blue" }}><Link to="/auth/sign-in">Go to Sign-in</Link></li>
                <li style={{ margin: "10px 0", color: "blue" }}><Link to="/auth/sign-up">Go to Sign-up</Link></li>
                <li style={{ margin: "10px 0", color: "blue" }}><Link to="/auth/forgot-password">Go to Forgot Password</Link></li>
            </ul>
        </div>
    );
};
