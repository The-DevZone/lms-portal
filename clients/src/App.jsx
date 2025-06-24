// import { Button } from "@/components/ui/button.jsx"
import Login from "./pages/Login"
// import { Navbar } from "./components/Navbar.jsx"
import HeroSection from "./pages/Student/HeroSection"
import MainLayOut from "./layout/MainLayOut"
import { createBrowserRouter } from "react-router-dom"
// import { Provider } from "react-redux"
import { Navigate, RouterProvider } from "react-router"
import {Courses} from "./pages/Student/Courses"
import { ThemeProvider } from "next-themes"
import MyLearning from "./pages/Student/MyLearning"
import Profile from "./pages/Student/Profile"
import { useLoadUserQuery } from "./feachers/api/authApi"
import Loader from "./components/Loader"
import { Toaster } from "sonner"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        )
      },
      {
        path: "/Login",
        element: <Login />
      },
      {
        path: "My-learning",
        element: <MyLearning />
      },
      {
        path: "edit-profile",
        element: <Profile/>
      }
    ],
  }
])
function App() {
  const {isLoading} = useLoadUserQuery();
  if (isLoading) {
    return <Loader />;
  }

  // if(!data?.user){
  //   return <Navigate to="/Login" />
  // }

  return (
    <>
      <main>
        <RouterProvider router={appRouter} />
        <Toaster />
      </main>
    </>
  )
}

export default App;
