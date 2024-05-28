import App from "./App";
import Register from "./components/Register"
import ErrorPage from "./components/ErrorPage";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/register",
        element: <Register />,
    },];

export default routes;