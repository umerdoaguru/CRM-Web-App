import React, { useState } from 'react';
import Overview from './Overview2';
import PaymentsGraph from './PaymentsGraph';
import DevicesGraph from './DevicesGraph';
import LeadsReport from './LeadsReport';
import ToDoList from './Todo';
import Sider from '../components/Sider';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for hamburger and close

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen overflow-hidden">
            {/* Sidebar */}
            <div 
                className={`fixed top-0 left-0 z-40 h-full w-64 bg-slate-100 transition-transform transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-hidden`}
            >
                <div className="flex items-center justify-between p-4 lg:hidden">
                    <h2 className="text-xl font-semibold">Sidebar</h2>
                    <button onClick={toggleSidebar} className="text-2xl">
                        <FaTimes />
                    </button>
                </div>
                <Sider />
            </div>

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
    );
};

export default Dashboard;
