import React from 'react';
import Overview from './Overview2';
import PaymentsGraph from './PaymentsGraph';
import DevicesGraph from './DevicesGraph';
import LeadsReport from './LeadsReport';
import ToDoList from './Todo';
import Sider from '../components/Sider';

const Dashboard = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="hidden w-64 min-h-screen p-4 text-white bg-gray-800 md:block">
                <Sider />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
