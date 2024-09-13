import React, { useState } from 'react';
import Overview from './Overview2';
import PaymentsGraph from './PaymentsGraph';
import DevicesGraph from './DevicesGraph';
import LeadsReport from './LeadsReport';
import ToDoList from './Todo';
import Sider from '../components/Sider';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for hamburger and close
import MainHeader from './../components/MainHeader';



const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        
        <>
        <MainHeader/>
        <Sider/>
         <div className="flex min-h-screen overflow-hidden">
          
        

            {/* Main Content */}
            <div className="flex-1 max-w-full p-4 bg-gray-100 lg:ml-64">
                {/* Hamburger Menu Button for Mobile */}
                <div className="p-4 lg:hidden">
                    <button onClick={toggleSidebar} className="text-2xl">
                        <FaBars />
                    </button>
                </div>
                
                {/* Adjust grid layout for different screen sizes */}
                <div>
                    <Overview />
                </div>
                <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
                    <PaymentsGraph />
                    <DevicesGraph />
                </div>
                <LeadsReport />
                <ToDoList />
            </div>
        </div>
        </>
       
    );
};

export default Dashboard;
