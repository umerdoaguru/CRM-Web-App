import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BsFileEarmarkPerson, BsHouse, BsEye, BsPerson } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineManageAccounts } from "react-icons/md";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Import AiOutlineClose for the cross button
import styled from "styled-components";

const Sider = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar visibility

  const getSidebarClass = (path) => {
    return location.pathname === path ? "bg-blue-800 shadow-lg" : "";
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper>
      {/* Hamburger Button */}
      <button
        className="fixed sm:top-[3rem] sm:left-[1rem] z-50 text-black"
        onClick={toggleSidebar}
      >
        <AiOutlineMenu size={25} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 lg:w-40 md:w-20 bg-[#01060c] overflow-hidden transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Close (Cross) Button */}
        <button
          className="absolute top-3 right-3 text-white"
          onClick={toggleSidebar}
        >
          <AiOutlineClose size={25} />
        </button>

        <div className="flex flex-col items-center pt-10">
          <ul className="flex flex-col items-center space-y-4 w-full">
            <li className={`w-full ${getSidebarClass("/")}`}>
              <Link to="/" className="flex flex-col items-center py-3">
                <BsHouse className="text-white text-2xl lg:text-3xl" />
                <h3 className="hidden lg:inline text-white text-sm lg:text-base">
                  Dashboard
                </h3>
              </Link>
            </li>

            <hr className="w-full border-gray-400" />

            <li className={`w-full ${getSidebarClass("/leads")}`}>
              <Link to="/leads" className="flex flex-col items-center py-3">
                <FaHistory className="text-white text-2xl lg:text-3xl" />
                <h3 className="hidden lg:inline text-white text-sm lg:text-base">
                  Leads
                </h3>
              </Link>
            </li>

            <hr className="w-full border-gray-400" />

            {/* <li className={`w-full ${getSidebarClass("/task-management")}`}>
              <Link to="/task-management" className="flex flex-col items-center py-3">
                <TbReportAnalytics className="text-white text-2xl lg:text-3xl" />
                <h3 className="hidden lg:inline text-white text-sm lg:text-base">
                  Task Management
                </h3>
              </Link>
            </li> */}

            {/* <hr className="w-full border-gray-400" /> */}

            <li className={`w-full ${getSidebarClass("/reporting")}`}>
              <Link to="/reporting" className="flex flex-col items-center py-3">
                <RiSecurePaymentLine className="text-white text-2xl lg:text-3xl" />
                <h3 className="hidden lg:inline text-white text-sm lg:text-base">
                  Reporting
                </h3>
              </Link>
            </li>

            <hr className="w-full border-gray-400" />

            <li className={`w-full ${getSidebarClass("/data-export")}`}>
              <Link to="/data-export" className="flex flex-col items-center py-3">
                <BsFileEarmarkPerson className="text-white text-2xl lg:text-3xl" />
                <h3 className="hidden lg:inline text-white text-sm lg:text-base">
                  Data Export
                </h3>
              </Link>
            </li>

            <hr className="w-full border-gray-400" />

            <li className={`w-full ${getSidebarClass("/quotation-invoice")}`}>
              <Link to="/quotation-section" className="flex flex-col items-center py-3">
                <BsFileEarmarkPerson className="text-white text-2xl lg:text-3xl" />
                <h3 className="hidden lg:inline text-white text-sm lg:text-base">
                  Quotation & Invoice
                </h3>
              </Link>
            </li>

            <hr className="w-full border-gray-400" />
            <li className={`w-full ${getSidebarClass("/employee-management")}`}>
              <Link to="/employee-management" className="flex flex-col items-center py-3">
                <MdOutlineManageAccounts className="text-white text-2xl lg:text-3xl" />
                <h3 className="hidden lg:inline text-white text-sm lg:text-base">
                  My profile
                </h3>
              </Link>
            </li>

            <hr className="w-full border-gray-400" />
         

          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

export default Sider;

const Wrapper = styled.div`
 #sidebar {
    width: 8%;
    height: 100vh;
    background-color: #213555;
    position: fixed;
    margin-top: 4.8rem;

    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 10%;
    }
    @media (min-width: 1024px) and (max-width: 1280px) {
      width: 10%;
    }
  }

  .bi {
    color: white;
  }

  .link-div {
  }

  a {
    text-decoration: none;
  }

  .iconside {
    @media (min-width: 768px) and (max-width: 1020px) {
      font-size: 8px;
    }
    @media (min-width: 1024px) and (max-width: 1280px) {
      font-size: 12px;
    }
    @media (min-width: 1281px) and (max-width: 2000px) {
      font-size: 14px;
    }
  }

  .nav-dash {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .link-div {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 820px) {
      font-size: smaller;
    }
  }

  .nav-link {
    text-align: center;
    @media screen and (max-width: 820px) {
      width: auto !important;
    }
  }

  hr {
    color: white;
  }

  .active-nav {
    background-color: #003fa4;
    padding: 2;
    box-shadow: 0px 0px 16px #003fa4;
  }
`;
