// import { Button } from "@/components/ui/button.jsx"
import Login from "./pages/Login"
// import { Navbar } from "./components/Navbar.jsx"
import HeroSection from "./pages/Student/HeroSection"
import MainLayOut from "./layout/MainLayOut"
import { createBrowserRouter } from "react-router-dom"
// import { Provider } from "react-redux"
import { RouterProvider } from "react-router"
import {Courses} from "./pages/Student/Courses"
import { ThemeProvider } from "next-themes"
import MyLearning from "./pages/Student/MyLearning"

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
      }
    ],
  }
])
function App() {
  return (
    <>
      <main>
        <RouterProvider router={appRouter} />
      </main>
    </>
  )
}

export default App;
