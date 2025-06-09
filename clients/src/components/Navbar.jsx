import { Menu, School } from "lucide-react";
// import Link  from "react-router-dom";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import { Input } from "./ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { DarkMode } from '@/DarkMode';
import DarkMode from "../pages/DarkMode.jsx";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Label } from "./ui/label.jsx";
import { Separator } from "./ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/feachers/api/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

export const Navbar = () => {
  // const user = true; // Replace with actual user authentication logic
  const [userLogOut, { data, isSuccess }] = useLogoutUserMutation();
  // const {data:dataLoadUser  } = useLoadUserQuery();
  const { user } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await userLogOut();
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged out successfully");
      navigate("/login");
    }
    
  }, [isSuccess]);

  // const user = dataLoadUser?.user;
  console.log(user);

  console.log(data);
  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <School size={"30"} />

          <h1 className="hidden md:block font-extrabold text-2xl">
            E-Learning
          </h1>
        </div>

        <div className="flex items-center  gap-8 px-4 h-full">
          {
            user ? (

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={user.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>

                    <DropdownMenuItem>
                      <span> <Link to="My-learning">My Learning</Link> </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span><Link to='edit-profile'>Edit Profile</Link></span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <span >Log Out</span>
                    </DropdownMenuItem>

                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />

                  {/* <LogOut /> */}
                  {
                    user.role === "instructer"  &&  (
                      <>
                      <Link to="/instructer/dashboard" className="flex items-center gap-2">
                        <User size={16} />
                        <DropdownMenuItem className="bg-blue-600 text-amber-50 hover:bg-white hover:text-blue-600">
                          <span >Dashboard</span>
                        </DropdownMenuItem>
                      </Link>
                      </>
                    )
                  }

                </DropdownMenuContent>
              </DropdownMenu>

            ) : (
              <div className="">
                <button variant="outline " className=" cursor-pointer  mr-3  p-1 px-6 rounded-2xl  text-white bg-black " onClick={() => navigate("/login")}  >Login</button>
                <button className="cursor-pointer" onClick={() => navigate("/login")}>SignUp</button>
              </div>
            )
          }
          <DarkMode />
        </div>
      </div>

      {/* Mobile device  */}

      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-learning</h1>
        <MobileNavbar />
      </div>
    </div>
  );
};

// export default Navbar;

const MobileNavbar = () => {
  const role = "instructer"

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-6">
          <SheetTitle> <a>E-Learning</a></SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2  " />
        <nav className="flex flex-col ml-6 space-y-4">
          <Link to="My-learning">My Learning</Link>
          <Link to='edit-profile'>Edit Profile</Link>
          <p  >  Log out</p>
        </nav>

        {role === "instructer" && (

          <SheetFooter>

            <SheetClose asChild>
              <Button type="submit">Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};