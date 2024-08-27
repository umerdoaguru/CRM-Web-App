import React from 'react';

const todos = [
    { title: 'UIdeck Yearly Meetings', time: '10:00 AM - 3:00 PM', date: '18 February, 2025', status: 'Completed' },
    { title: '2025 Dribble Meet Up', time: '09:30 AM - 12:00 AM', date: '14 February, 2025', status: 'Upcoming' },
    { title: '2025 Linkedin Meet Up', time: '10:30 AM - 11:00 PM', date: '18 February, 2025', status: 'Canceled' },
    // Add more tasks as needed
];

const ToDoList = () => {
    return (
        <div className="p-4 mt-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">To Do List</h3>
            <ul>
                {todos.map((todo, idx) => (
                    <li key={idx} className="py-2">
                        <div className="flex justify-between">
                            <span>{todo.title}</span>
                            <span>{todo.status}</span>
                        </div>
                        <p className="text-sm text-gray-500">{todo.time} - {todo.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
