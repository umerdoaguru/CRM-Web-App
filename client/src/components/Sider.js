import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BsFileEarmarkPerson, BsHouse } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import Logout from "./Logout";

const Sider = () => {
  const location = useLocation();
  const getSidebarClass = (path) => {
    return location.pathname === path ? "bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg" : "";
  };

  return (
    <div className="fixed min-h-screen w-20 lg:w-64 bg-[#0B1120] shadow-xl">
      <div className="flex flex-col items-center py-6 space-y-6">
        <ul className="flex flex-col w-full">
          <li className={`w-full ${getSidebarClass("/")}`}>
            <Link
              to="/"
              className="flex flex-col items-center py-4 transition-colors duration-300 lg:flex-row lg:justify-start lg:px-6 hover:bg-gradient-to-r from-indigo-500 to-blue-400"
            >
              <BsHouse className="text-3xl text-white lg:mr-3" />
              <h3 className="hidden text-sm font-medium text-white sm:inline lg:text-base">
                Dashboard
              </h3>
            </Link>
          </li>

          <hr className="w-full border-gray-600" />

          <li className={`w-full ${getSidebarClass("/leads")}`}>
            <Link
              to="/leads"
              className="flex flex-col items-center py-4 transition-colors duration-300 lg:flex-row lg:justify-start lg:px-6 hover:bg-gradient-to-r from-indigo-500 to-blue-400"
            >
              <FaHistory className="text-3xl text-white lg:mr-3" />
              <h3 className="hidden text-sm font-medium text-white sm:inline lg:text-base">
                Leads
              </h3>
            </Link>
          </li>

          <hr className="w-full border-gray-600" />

          <li className={`w-full ${getSidebarClass("/tasks")}`}>
            <Link
              to="/tasks"
              className="flex flex-col items-center py-4 transition-colors duration-300 lg:flex-row lg:justify-start lg:px-6 hover:bg-gradient-to-r from-indigo-500 to-blue-400"
            >
              <TbReportAnalytics className="text-3xl text-white lg:mr-3" />
              <h3 className="hidden text-sm font-medium text-white sm:inline lg:text-base">
                Task Management
              </h3>
            </Link>
          </li>

          <hr className="w-full border-gray-600" />

          <li className={`w-full ${getSidebarClass("/reporting")}`}>
            <Link
              to="/reporting"
              className="flex flex-col items-center py-4 transition-colors duration-300 lg:flex-row lg:justify-start lg:px-6 hover:bg-gradient-to-r from-indigo-500 to-blue-400"
            >
              <RiSecurePaymentLine className="text-3xl text-white lg:mr-3" />
              <h3 className="hidden text-sm font-medium text-white sm:inline lg:text-base">
                Reporting
              </h3>
            </Link>
          </li>

          <hr className="w-full border-gray-600" />

          <li className={`w-full ${getSidebarClass("/data-export")}`}>
            <Link
              to="/data-export"
              className="flex flex-col items-center py-4 transition-colors duration-300 lg:flex-row lg:justify-start lg:px-6 hover:bg-gradient-to-r from-indigo-500 to-blue-400"
            >
              <BsFileEarmarkPerson className="text-3xl text-white lg:mr-3" />
              <h3 className="hidden text-sm font-medium text-white sm:inline lg:text-base">
                Data Export
              </h3>
            </Link>
          </li>

          <hr className="w-full border-gray-600" />

          <li className={`w-full ${getSidebarClass("/invoices")}`}>
            <Link
              to="/invoices"
              className="flex flex-col items-center py-4 transition-colors duration-300 lg:flex-row lg:justify-start lg:px-6 hover:bg-gradient-to-r from-indigo-500 to-blue-400"
            >
              <BsFileEarmarkPerson className="text-3xl text-white lg:mr-3" />
              <h3 className="hidden text-sm font-medium text-white sm:inline lg:text-base">
                Quotation & Invoice
              </h3>
            </Link>
          </li>

          <hr className="w-full border-gray-600" />

          <li className="w-full">
            <div className="flex flex-col items-center py-4 transition-colors duration-300 lg:flex-row lg:justify-start lg:px-6 hover:bg-blue-500">
              <Logout />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sider;
