const express = require("express");
const { db } = require("../db");
const bcrypt = require("bcrypt");
const JWT = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, email,password } = req.body;

    // Validations
    const requiredFields = [name, email, password];

    if (requiredFields.some((field) => !field)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash the "password" and "cpassword"
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Check if the user already exists
    const checkUserQuery = "SELECT * FROM registered_data WHERE email = ?";

    db.query(checkUserQuery, [email], (err, result) => {
      if (err) {
        console.error("Error checking if user exists in MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        // Check if there are any rows in the result
        if (result.length > 0) {
          return res.status(400).json({
            error: "User already exists.",
          });
        } else {
          // User not found, proceed with registration
          const insertUserQuery = `
            INSERT INTO registered_data  (
              user_name, email,password
            ) VALUES (?, ?, ?)
          `;

          const insertUserParams = [name, email,hashedPassword];

          db.query(
            insertUserQuery,
            insertUserParams,
            (insertErr, insertResult) => {
              if (insertErr) {
                console.error("Error inserting user:", insertErr);
                res.status(500).json({ error: "Internal server error" });
              } else {
                console.log("User registered successfully");
                return res.status(200).json({
                  success: true,
                  message: "User registered successfully",
                });
              }
            }
          );
        }
      }
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};
const login = async (req, res) => {
  try {
     const {email, password} = req.body

     //Validation 
     if(!email || !password){
      return res.status(404).send({
        success: false,
        message: "Invaild email or password ",
      });
     }
     // check user in mysql 
     const checkUserQuery = "SELECT * FROM registered_data WHERE email =?";
     db.query(checkUserQuery,[email],async(err,results)=>{
      if(err){
        console.log("Error checking  user in mysql",err);
      }
      if(results.length===0){
        return res.status(404).send({
          success:false,
          message:"email is not  registered"
        })
      
      }
      const user = results[0];
    

      //compare  passwords
      const match = await bcrypt.compare(password,user.password);
      if(!match){
        return  res.status(404).send({
          success: false,
          message: "Invaild password ",
        });
        
        
      }
     
     //generate  token 
     const token = await JWT.sign({id: user.id}, process.env.JWT_SECRET,{ expiresIn: "7d"});

     res.status(200).send({
      success: true,
      message : "Login sucessfully",
      user:{
        id: user.user_id,
        name:user.user_name,
        email:user.email,
       
      },
      token,
     });
    });
    }

  catch (error) {
  console.log(error);
  res.status(500).send({success:false , message:"error in login ", error})
  }
};

const editProfile = async (req, res) => {
  try {
    // Extract data from request body and file
    const { user_name, email, phone, mobile, address, interested_in, bio } = req.body;
    const profile_picture = req.file ? req.file.buffer : null;

    console.log('Request Body:', req.body);
    console.log('File:', req.file);

    // Validate required fields
    if (!user_name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    // Check if the user exists
    const checkUserQuery = "SELECT * FROM user_data WHERE email = ?";
    db.query(checkUserQuery, [email], (err, result) => {
      if (err) {
        console.error("Error checking if user exists in MySQL:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.length === 0) {
        // User not found, insert a new user
        const insertUserQuery = `
          INSERT INTO user_data (user_name, email, profile_picture, phone, mobile, address, interested_in, bio)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const insertParams = [
          user_name,
          email,
          profile_picture,
          phone,
          mobile,
          address,
          interested_in,
          bio
        ];

        db.query(insertUserQuery, insertParams, (insertErr) => {
          if (insertErr) {
            console.error("Error inserting new user profile:", insertErr);
            return res.status(500).json({ error: "Internal server error" });
          } else {
            console.log("New user profile created successfully");
            return res.status(201).json({
              success: true,
              message: "New user profile created successfully"
            });
          }
        });
      } else {
        // User found, update the existing user's profile
        const updateUserQuery = `
          UPDATE user_data
          SET user_name = ?, profile_picture = ?, phone = ?, mobile = ?, address = ?, interested_in = ?, bio = ?
          WHERE email = ?
        `;

        const updateParams = [
          user_name,
          profile_picture,
          phone,
          mobile,
          address,
          interested_in,
          bio,
          email
        ];

        db.query(updateUserQuery, updateParams, (updateErr) => {
          if (updateErr) {
            console.error("Error updating user profile:", updateErr);
            return res.status(500).json({ error: "Internal server error" });
          } else {
            console.log("User profile updated successfully");
            return res.status(200).json({
              success: true,
              message: "User profile updated successfully"
            });
          }
        });
      }
    });
  } catch (error) {
    console.error("Error in editing profile:", error);
    res.status(500).json({
      success: false,
      message: "Error in editing profile",
      error: error.message,
    });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Delete user profile from the database
    const deleteUserQuery = "DELETE FROM user_data WHERE email = ?";
    db.query(deleteUserQuery, [email], (err, result) => {
      if (err) {
        console.error("Error deleting user profile from MySQL:", err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (result.affectedRows === 0) {
        // No user found with the provided email
        return res.status(404).json({ error: 'User not found' });
      }

      // Profile successfully deleted
      return res.status(200).json({ success: true, message: 'Profile deleted successfully' });
    });
  } catch (error) {
    console.error("Error in deleting profile:", error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
 
const getAllUsers = async (req, res) => {
  try {
    // Query to get all users from the user_data table
    const getAllUsersQuery = "SELECT * FROM user_data";

    // Execute the query
    db.query(getAllUsersQuery, (err, result) => {
      if (err) {
        console.error("Error fetching users from MySQL:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Return the result as a JSON response
      return res.status(200).json({
        success: true,
        data: result,
        message: "Users retrieved successfully",
      });
    });
  } catch (error) {
    console.error("Error in retrieving users:", error);
    res.status(500).json({
      success: false,
      message: "Error in retrieving users",
      error: error.message,
    });
  }
};
  module.exports = {register,login,editProfile,getAllUsers,deleteProfile};