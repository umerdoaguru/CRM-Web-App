import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GiMicroscopeLens, GiMicroscope } from "react-icons/gi";
import { LiaXRaySolid } from "react-icons/lia";
import { FaHistory } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BsFileEarmarkPerson, BsHourglass, BsHouse } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import Logout from "./Logout";


const Sider = () => {
  const location = useLocation();
  const getSidebarClass = (path) => {
    // return location.pathname === path ? "bg-blue-800 shadow-lg" : "";
  };

  return (
    <div className="fixed min-h-screen  mt-[0rem] bg-[#01060c]  overflow-hidden">
      <div className="flex flex-col items-center pt-2">
        <ul className="flex flex-col items-center space-y-4 w-full">
          <li className={`w-full ${getSidebarClass("/")}`}>
            <Link
              to="/"
              className="flex flex-col items-center py-3"
            >
              <i className="text-2xl text-white bi bi-house-door-fill"></i>
              <BsHouse className="text-white text-2xl" />
              <h3 className="hidden sm:inline text-white text-sm lg:text-base">
                Dashboard
              </h3>
            </Link>
          </li>

          <hr className="w-full border-gray-400" />

          <li className={`w-full ${getSidebarClass("/")}`}>
            <Link
              to="/"
              className="flex flex-col items-center py-3"
            >
              <FaHistory className="text-white text-2xl" />
              <h3 className="hidden sm:inline text-white text-sm lg:text-base">
              Leads
              </h3>
            </Link>
          </li>

          <hr className="w-full border-gray-400" />

          <li className={`w-full ${getSidebarClass("/")}`}>
            <Link
              to="/"
              className="flex flex-col items-center py-3"
            >
              <TbReportAnalytics className="text-white text-2xl" />
              <h3 className="hidden sm:inline text-white text-sm lg:text-base">
              Task Management
              </h3>
            </Link>
          </li>

          <hr className="w-full border-gray-400" />

          <li className={`w-full ${getSidebarClass("/")}`}>
            <Link
              to="/"
              className="flex flex-col items-center py-3"
            >
              <RiSecurePaymentLine className="text-white text-2xl" />
              <h3 className="hidden sm:inline text-white text-sm lg:text-base">
              Reporting
              </h3>
            </Link>
          </li>

          <hr className="w-full border-gray-400" />

          <li className={`w-full ${getSidebarClass("/")}`}>
            <Link
              to="/"
              className="flex flex-col items-center py-3"
            >
              <BsFileEarmarkPerson className="text-white text-2xl" />
              <h3 className="hidden sm:inline text-white text-sm lg:text-base">
              Data Export
              </h3>
            </Link>
          </li>

          <hr className="w-full border-gray-400" />
          <li className={`w-full ${getSidebarClass("/")}`}>
            <Link
              to="/"
              className="flex flex-col items-center py-3"
            >
              <BsFileEarmarkPerson className="text-white text-2xl" />
              <h3 className="hidden sm:inline text-white text-sm lg:text-base">
              Quotation & Invoice 
              </h3>
            </Link>
          </li>

          <hr className="w-full border-gray-400" />
{/* 
          <li className="w-full">
            <div className="flex flex-col items-center py-3">
              <i className="text-2xl text-white bi bi-power"></i>
              <Logout />
            </div>
          </li>

          <hr className="w-full border-gray-400" /> */}
        </ul>
      </div>
    </div>
  );
};

export default Sider;
