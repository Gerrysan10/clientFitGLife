import { Link } from "react-router-dom";

function ErrorPage() {
    return(
        <div>
            <h1>Sorry, this page does't exist!!!</h1>
            <Link to="/">Go back to the home page clicking here</Link>
        </div>
    );
}

export default ErrorPage;