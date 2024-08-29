import React from 'react';

const todos = [
    { title: 'UIdeck Yearly Meetings', time: '10:00 AM - 3:00 PM', date: '18 February, 2025', status: 'Completed' },
    { title: '2025 Dribble Meet Up', time: '09:30 AM - 12:00 AM', date: '14 February, 2025', status: 'Upcoming' },
    { title: '2025 Linkedin Meet Up', time: '10:30 AM - 11:00 PM', date: '18 February, 2025', status: 'Canceled' },
    // Add more tasks as needed
];

const statusStyles = {
    Completed: 'bg-green-100 text-green-600',
    Upcoming: 'bg-blue-100 text-blue-600',
    Canceled: 'bg-red-100 text-red-600',
};

const ToDoList = () => {
    return (
        <div className="p-4 mt-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">To Do List</h3>
            <ul className="divide-y divide-gray-200">
                {todos.map((todo, idx) => (
                    <li key={idx} className="px-4 py-3 transition duration-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                            <span className="font-medium">{todo.title}</span>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[todo.status]}`}>
                                {todo.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500">{todo.time} - {todo.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
