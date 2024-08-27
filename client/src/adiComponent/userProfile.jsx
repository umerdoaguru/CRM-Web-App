import React, { useState } from 'react';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: 'User Name',
    bio: 'Insert your desired text here.',
    website: 'Website',
    twitter: 'Twitter id',
    facebook: 'Facebook id',
    instagram: 'Instagram id',
    fullName: 'PlaceholderName',
    email: 'PlaceholderEmail',
    phone: 'PlaceholderPhone',
    mobile: 'PlaceholderMobile',
    address: 'PlaceholderAddress',
    image: 'https://via.placeholder.com/150',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile saved successfully!');
    // Here, you can make an API call to save the data to a backend.
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="flex flex-col w-full h-full max-w-full p-6 bg-white rounded-lg shadow-lg lg:flex-row">
        
        {/* Left Section */}
        <div className="flex flex-col items-center lg:w-1/3">
          {/* Profile Image */}
          <img 
            src={profile.image} 
            alt="User" 
            className="object-cover w-32 h-32 mb-4 rounded-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />

          <h2 className="mb-1 text-xl font-bold text-center">
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="border-b border-gray-300 outline-none"
            />
          </h2>
          <p className="mb-4 text-center text-gray-500">
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border rounded-lg outline-none"
            />
          </p>

          {/* Buttons */}
          <div className="flex mb-6 space-x-4">
            <button className="px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700">
              Follow
            </button>
            <button className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-200">
              Message
            </button>
          </div>

          {/* Social Links */}
          <div className="text-left">
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">🌐</span> Website: 
                <input
                  type="text"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  className="ml-2 text-blue-500 border-b border-gray-300 outline-none"
                />
              </li>
              <li className="flex items-center">
                <span className="mr-2">🐦</span> Twitter: 
                <input
                  type="text"
                  name="twitter"
                  value={profile.twitter}
                  onChange={handleChange}
                  className="ml-2 text-blue-500 border-b border-gray-300 outline-none"
                />
              </li>
              <li className="flex items-center">
                <span className="mr-2">📘</span> Facebook: 
                <input
                  type="text"
                  name="facebook"
                  value={profile.facebook}
                  onChange={handleChange}
                  className="ml-2 text-blue-500 border-b border-gray-300 outline-none"
                />
              </li>
              <li className="flex items-center">
                <span className="mr-2">📸</span> Instagram: 
                <input
                  type="text"
                  name="instagram"
                  value={profile.instagram}
                  onChange={handleChange}
                  className="ml-2 text-blue-500 border-b border-gray-300 outline-none"
                />
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col space-y-6 lg:w-2/3 lg:pl-6">
          {/* User Information */}
          <div className="grid grid-cols-2 gap-4">
            {['fullName', 'email', 'phone', 'mobile', 'address'].map((field) => (
              <div className="text-left" key={field}>
                <h3 className="font-bold">{field.charAt(0).toUpperCase() + field.slice(1)}</h3>
                <input
                  type="text"
                  name={field}
                  value={profile[field]}
                  onChange={handleChange}
                  className="border-b border-gray-300 outline-none"
                />
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2 text-white bg-green-600 rounded-full hover:bg-green-700"
            >
              Save Profile
            </button>
          </div>

          {/* Edit Sections */}
          <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
            {/* Left Edit */}
            <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md">
              <h4 className="mb-2 font-bold">Edit Text Here</h4>
              {[50, 66, 75].map((percentage, index) => (
                <div className="mb-4" key={index}>
                  <p className="mb-1">Placeholder</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-full bg-blue-600 rounded-full`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Edit */}
            <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md">
              <h4 className="mb-2 font-bold">Edit Text Here</h4>
              {[33, 60, 80].map((percentage, index) => (
                <div className="mb-4" key={index}>
                  <p className="mb-1">Placeholder</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-full bg-blue-600 rounded-full`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
