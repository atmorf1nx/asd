import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Hero from "./components/Hero";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ErrorPage from "./components/Error";

function App() {
  const user = localStorage.getItem("user");

  const router = createBrowserRouter([
    {
      path: "/home",
      element: user ? <Hero /> : <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <SignIn />,
    },
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "/hero",
      element: <Hero />,
    },
    {
      path: "/*",
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
