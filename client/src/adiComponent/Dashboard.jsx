<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 1ff02d008d05f7aba92c8e122b092480bba3cfd0
import Overview from './Overview2';
import PaymentsGraph from './PaymentsGraph';
import DevicesGraph from './DevicesGraph';
import LeadsReport from './LeadsReport';
import ToDoList from './Todo';
import Sider from '../components/Sider';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for hamburger and close
import MainHeader from './../components/MainHeader';
<<<<<<< HEAD
import Invoice from './Invoice';
import axios from 'axios';
=======
>>>>>>> 1ff02d008d05f7aba92c8e122b092480bba3cfd0



const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

<<<<<<< HEAD
    const getInvoiceData = () => {
        try {
            const response = axios.get("http://localhost:9000/api/")
        }catch (err) {

        }
    }

    useEffect(() => {
        
    }, [])

=======
>>>>>>> 1ff02d008d05f7aba92c8e122b092480bba3cfd0
    return (
        
        <>
        <MainHeader/>
        <Sider/>
         <div className="flex min-h-screen overflow-hidden">
          
<<<<<<< HEAD
            {/* Main Content */}
            <div className="flex-1 max-w-full p-4 bg-gray-100 lg:ml-40">
=======
        

            {/* Main Content */}
            <div className="flex-1 max-w-full p-4 bg-gray-100 lg:ml-64">
>>>>>>> 1ff02d008d05f7aba92c8e122b092480bba3cfd0
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
<<<<<<< HEAD
                    <Invoice />
                    <DevicesGraph />
                    
                    <PaymentsGraph />
                </div>
                <LeadsReport />
                {/* <ToDoList /> */}
=======
                    <PaymentsGraph />
                    <DevicesGraph />
                </div>
                <LeadsReport />
                <ToDoList />
>>>>>>> 1ff02d008d05f7aba92c8e122b092480bba3cfd0
            </div>
        </div>
        </>
       
    );
};

export default Dashboard;
