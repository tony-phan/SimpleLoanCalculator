import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Error from "./components/Error";
import Automotive from "./components/automotive";
import Mortgage from "./components/mortgage";

function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            errorElement: <Error />
        },
        {
            path: "automotive",
            element: <Automotive />,
            errorElement: <Error />
        },
        {
            path: "mortgage",
            element: <Mortgage />,
            errorElement: <Error />
        }
    ]);
    return <RouterProvider router={router} />;
}

export default Router;