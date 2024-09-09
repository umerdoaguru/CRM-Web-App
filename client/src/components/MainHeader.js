import React from "react";
import Logout from "./Logout";
import UserLogin from "./UserLogin";

function MainHeader() {
  return (
    <>
    <div className="w-full ">
    
        <nav className="bg-white border-gray-200 dark:bg-gray-800">
          <div className="flex p-1  items-center  justify-between bg-slate-100">
            <a href="#" className="flex items-center mx-2">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              CRM GURU 
            </a>
            <div className="flex items-center lg:order-2 mx-3">
             <div className=" mx-4">
            <UserLogin/></div>
           
              <div className="">
              <Logout/></div>
              

            </div>
          
          </div>
        </nav>
     
</div>
  
    </>
  );
}

export default MainHeader;
