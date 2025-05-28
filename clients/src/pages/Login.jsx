// 7mDeyJ2TUdvnEmLt
// rohit99539953
// mongodb+srv://rohit99539953:7mDeyJ2TUdvnEmLt@cluster0.huhmgsa.mongodb.net/
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRegisterUserMutation, useLoginUserMutation } from "@/feachers/api/authApi.js";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const navigate = useNavigate();
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
      console.log("hellow");
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    console.log(action)
    if (type === "signup") {
      try {
        const responce = await registerUser(inputData).unwrap();
        console.log("signup success", responce);
      } catch (error) {
        console.log("signup error", error);
      }
    } else {
      try {
        const responce = await loginUser(inputData).unwrap();
        console.log("login success", responce);
      } catch (error) {
        console.log("login error", error);
      }
    }
  }

  useEffect(() => {
    if (registerData && registerIsSuccess) {
      toast.success(registerData.massage || "Registration successful");
    }
    if (registerError) {
      toast.error(
        registerError?.data?.message ||
        registerError?.error ||
        "Registr failed"
      );
    }
    if (loginData && loginIsSuccess) {
      toast.success(loginData.massage || "Login successful");
      navigate("/"); // Redirect to home page after successful login
    }
    if (loginError) {
      toast.error(
        loginError?.data?.message ||
        loginError?.error ||
        "Login failed"
      );
    }

  }, [loginIsLoading, loginData, registerIsLoading, registerData, registerError, loginError])


  return (
    <div className="flex items-center w-full justify-center mt-20">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription className="mb-3">
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  placeholder="Eg. John Doe"
                  onChange={(e) => changeInputHandler(e, "signup")}
                // required="true"
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="username">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  placeholder="Eg. patel@gmail.com"
                  onChange={(e) => changeInputHandler(e, "signup")}
                // required="true"
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="username">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  placeholder="Eg. xyz"
                  onChange={(e) => changeInputHandler(e, "signup")}
                // required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleRegistration("signup")}>
                Signup
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here. After signup, you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Eg.patel@gmail.com"
                // required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="Eg.xyz"
                // required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleRegistration("login")}>
                Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
