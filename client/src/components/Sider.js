import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BsFileEarmarkPerson, BsHouse, BsEye, BsPerson } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineManageAccounts } from "react-icons/md";
import Logout from "./Logout";

const Sider = () => {
  const location = useLocation();
  const getSidebarClass = (path) => {
    return location.pathname === path
      ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white"
      : "text-gray-400";
  };

  return (
    <div className="fixed inset-y-0 left-0 w-20 sm:w-28 lg:w-48 bg-[#0B1120] shadow-xl flex flex-col items-center py-2 lg:py-4 space-y-2 lg:space-y-4">
      {/* Profile Section */}
      <div className="flex flex-col items-center w-full mb-4 space-y-2 lg:mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full">
          <BsPerson className="text-2xl text-white" />
        </div>
        <Link
          to="/edit-profile"
          className="text-xs font-medium text-white lg:text-sm hover:underline"
        >
          Edit Profile
        </Link>
      </div>

      <ul className="flex flex-col items-center w-full lg:items-start">
        <hr className="w-3/4 border-gray-600 lg:w-full" />

        {/* Menu Items */}
        <li className={`w-full ${getSidebarClass("/")}`}>
          <Link
            to="/"
            className="flex items-center justify-center px-2 py-3 transition-colors duration-300 lg:justify-start hover:bg-gradient-to-r from-indigo-500 to-blue-400"
          >
            <BsHouse className="text-xl sm:text-2xl" />
            <span className="hidden ml-2 text-xs lg:text-sm lg:inline">
              Dashboard
            </span>
          </Link>
        </li>

        <hr className="w-3/4 border-gray-600 lg:w-full" />

        <li className={`w-full ${getSidebarClass("/leads")}`}>
          <Link
            to="/leads"
            className="flex items-center justify-center px-2 py-3 transition-colors duration-300 lg:justify-start hover:bg-gradient-to-r from-indigo-500 to-blue-400"
          >
            <FaHistory className="text-xl sm:text-2xl" />
            <span className="hidden ml-2 text-xs lg:text-sm lg:inline">
              Leads
            </span>
          </Link>
        </li>

        <hr className="w-3/4 border-gray-600 lg:w-full" />

        <li className={`w-full ${getSidebarClass("/tasks")}`}>
          <Link
            to="/tasks"
            className="flex items-center justify-center px-2 py-3 transition-colors duration-300 lg:justify-start hover:bg-gradient-to-r from-indigo-500 to-blue-400"
          >
            <TbReportAnalytics className="text-xl sm:text-2xl" />
            <span className="hidden ml-2 text-xs lg:text-sm lg:inline">
              Task Management
            </span>
          </Link>
        </li>

        <hr className="w-3/4 border-gray-600 lg:w-full" />

        <li className={`w-full ${getSidebarClass("/reporting")}`}>
          <Link
            to="/reporting"
            className="flex items-center justify-center px-2 py-3 transition-colors duration-300 lg:justify-start hover:bg-gradient-to-r from-indigo-500 to-blue-400"
          >
            <RiSecurePaymentLine className="text-xl sm:text-2xl" />
            <span className="hidden ml-2 text-xs lg:text-sm lg:inline">
              Reporting
            </span>
          </Link>
        </li>

        <hr className="w-3/4 border-gray-600 lg:w-full" />

        <li className={`w-full ${getSidebarClass("/data-export")}`}>
          <Link
            to="/data-export"
            className="flex items-center justify-center px-2 py-3 transition-colors duration-300 lg:justify-start hover:bg-gradient-to-r from-indigo-500 to-blue-400"
          >
            <BsFileEarmarkPerson className="text-xl sm:text-2xl" />
            <span className="hidden ml-2 text-xs lg:text-sm lg:inline">
              Data Export
            </span>
          </Link>
        </li>

        <hr className="w-3/4 border-gray-600 lg:w-full" />

        <li className={`w-full ${getSidebarClass("/invoices")}`}>
          <Link
            to="/invoices"
            className="flex items-center justify-center px-2 py-3 transition-colors duration-300 lg:justify-start hover:bg-gradient-to-r from-indigo-500 to-blue-400"
          >
            <BsFileEarmarkPerson className="text-xl sm:text-2xl" />
            <span className="hidden ml-2 text-xs lg:text-sm lg:inline">
              Quotation & Invoice
            </span>
          </Link>
        </li>

        <hr className="w-3/4 border-gray-600 lg:w-full" />

        <li className={`w-full ${getSidebarClass("/employee-management")}`}>
          <Link
            to="/employee-management"
            className="flex items-center justify-center px-2 py-3 transition-colors duration-300 lg:justify-start hover:bg-gradient-to-r from-indigo-500 to-blue-400"
          >
            <MdOutlineManageAccounts className="text-xl sm:text-2xl" />
            <span className="hidden ml-2 text-xs lg:text-sm lg:inline">
              Employee Management
            </span>
          </Link>
        </li>

        <hr className="w-3/4 border-gray-600 lg:w-full" />

        <li className={`w-full ${getSidebarClass("/overview")}`}>
          <Link
            to="/overview"
            className="flex items-center justify-center px-2 py-3 transition-colors duration-300 lg:justify-start hover:bg-gradient-to-r from-indigo-500 to-blue-400"
          >
            <BsEye className="text-xl sm:text-2xl" />
            <span className="hidden ml-2 text-xs lg:text-sm lg:inline">
              Organization Management
            </span>
          </Link>
        </li>
        

        <hr className="w-3/4 border-gray-600 lg:w-full" />

        {/* Logout Button */}
        <li className="w-full">
          <div className="flex items-center justify-center px-2 py-3 transition-colors duration-300 lg:justify-start hover:bg-blue-500">
            <Logout />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sider;
