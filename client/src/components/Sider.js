import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BsFileEarmarkPerson, BsHouse, BsEye } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import Logout from "./Logout";

const Sider = () => {
  const location = useLocation();
  const getSidebarClass = (path) => {
    return location.pathname === path
      ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white"
      : "text-gray-400";
  };

  return (
    <div className="fixed inset-y-0 left-0 w-20 sm:w-28 lg:w-64 bg-[#0B1120] shadow-xl flex flex-col items-center py-4 lg:py-6 space-y-4 lg:space-y-6">
      <ul className="flex flex-col items-center w-full lg:items-start">
        <hr className="w-3/4 border-gray-600 lg:w-full" />

        <li className={`w-full ${getSidebarClass("/")}`}>
          <Link
            to="/"
            className="flex items-center justify-center px-4 py-4 transition-colors duration-300 lg:justify-start hover:bg-gradient-to-r from-indigo-500 to-blue-400"
          >
            <BsHouse className="text-2xl sm:text-3xl" />
            <span className="hidden ml-3 text-sm font-medium lg:inline">
              Dashboard
            </span>
          </Link>
        </li>

        <hr className="w-3/4 border-gray-600 lg:w-full" />

        <li className={`w-full ${getSidebarClass("/leads")}`}>
          <Link
            to="/leads"
            className="flex items-center justify-center px-4 py-4 transition-colors duration-300 lg:justify-start hover:bg-gradient-to-r from-indigo-500 to-blue-400"
          >
            <FaHistory className="text-2xl sm:text-3xl" />
            <span className="hidden ml-3 text-sm font-medium lg:inline">
              Leads
            </span>
          </Link>
        </li>

        <hr className="w-3/4 border-gray-600 lg:w-full" />

        <li className={`w-full ${getSidebarClass("/tasks")}`}>
          <Link
            to="/tasks"
            className="flex items-center justify-center px-4 py-4 transition-colors duration-300 lg:justify-start hover:bg-gradient-to-r from-indigo-500 to-blue-400"
          >
            <TbReportAnalytics className="text-2xl sm:text-3xl" />
            <span className="hidden ml-3 text-sm font-medium lg:inline">
              Task Management
            </span>
          </Link>
        </li>

        <hr className="w-3/4 border-gray-600 lg:w-full" />

        <li className={`w-full ${getSidebarClass("/reporting")}`}>
          <Link
            to="/reporting"
            className="flex items-center justify-center px-4 py-4 transition-colors duration-300 lg:justify-start hover:bg-gradient-to-r from-indigo-500 to-blue-400"
          >
            <RiSecurePaymentLine className="text-2xl sm:text-3xl" />
            <span className="hidden ml-3 text-sm font-medium lg:inline">
              Reporting
            </span>
          </Link>
        </li>

        <hr className="w-3/4 border-gray-600 lg:w-full" />

        <li className={`w-full ${getSidebarClass("/data-export")}`}>
          <Link
            to="/data-export"
            className="flex items-center justify-center px-4 py-4 transition-colors duration-300 lg:justify-start hover:bg-gradient-to-r from-indigo-500 to-blue-400"
          >
            <BsFileEarmarkPerson className="text-2xl sm:text-3xl" />
            <span className="hidden ml-3 text-sm font-medium lg:inline">
              Data Export
            </span>
          </Link>
        </li>

        <hr className="w-3/4 border-gray-600 lg:w-full" />

        <li className={`w-full ${getSidebarClass("/invoices")}`}>
          <Link
            to="/invoices"
            className="flex items-center justify-center px-4 py-4 transition-colors duration-300 lg:justify-start hover:bg-gradient-to-r from-indigo-500 to-blue-400"
          >
            <BsFileEarmarkPerson className="text-2xl sm:text-3xl" />
            <span className="hidden ml-3 text-sm font-medium lg:inline">
              Quotation & Invoice
            </span>
          </Link>
        </li>

        <hr className="w-3/4 border-gray-600 lg:w-full" />

        <li className={`w-full ${getSidebarClass("/overview")}`}>
          <Link
            to="/overview"
            className="flex items-center justify-center px-4 py-4 transition-colors duration-300 lg:justify-start hover:bg-gradient-to-r from-indigo-500 to-blue-400"
          >
            <BsEye className="text-2xl sm:text-3xl" />
            <span className="hidden ml-3 text-sm font-medium lg:inline">
              Overview
            </span>
          </Link>
        </li>

        <hr className="w-3/4 border-gray-600 lg:w-full" />

        <li className="w-full">
          <div className="flex items-center justify-center px-4 py-4 transition-colors duration-300 lg:justify-start hover:bg-blue-500">
            <Logout />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sider;
