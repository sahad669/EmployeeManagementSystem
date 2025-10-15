import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const hashpass = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashpass,
    });

    const token = jwt.sign(
      { _id: newUser._id, name: newUser.name, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ success: true, message: "Registered successfully", token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Enter Email and Password" });
    }

    // ✅ populate department so employee details are available
    const user = await userModel.findOne({ email }).populate("department", "department");
    if (!user) {
      return res.status(400).json({ success: false, message: "Email Not Found Register!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Password is wrong" });
    }

    const token = jwt.sign(
      { _id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        phone: user.phone,                    
        imageurl: user.imageurl,              
        department: user.department,    
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// ================= CREATE EMPLOYEE =================
export const createEmployee = async (req, res) => {
  try {
    const { name, email, password, role, department, phone } = req.body;

    if (!name || !email || !password || !department || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required (except image)" });
    }

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    let imageurl, public_id;
    if (req.file) {
      imageurl = req.file.path;
      public_id = req.file.filename;
    }

    const newEmployee = await userModel.create({
      name,
      email,
      password: hashedPass,
      role,
      department,
      phone,
      imageurl,
      public_id,
    });

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ================= GET ALL EMPLOYEES =================
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await userModel
      .find({ role: "employee" })
      .populate("department", "department");

    if (employees.length === 0) {
      return res.status(404).json({ success: false, message: "No Employees Found", employees: [] });
    }

    res.status(200).json({ success: true, employees });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ================= EDIT EMPLOYEE =================
export const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // ✅ Only hash password if provided, otherwise keep old password
    if (!updates.password) {
      delete updates.password; // remove empty password so DB doesn't overwrite
    } else {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // Handle uploaded image if exists
    if (req.file) {
      updates.imageurl = req.file.path;
      updates.public_id = req.file.filename;
    }

    // Update employee in DB
    const updated = await userModel
      .findByIdAndUpdate(id, updates, { new: true })
      .populate("department", "department");

    if (!updated) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    res.json({ success: true, message: "Employee updated successfully", employee: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// ================= DELETE EMPLOYEE =================
export const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedEmployee = await userModel.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ================= GET EMPLOYEE BY ID =================
export const getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await userModel.findById(id).populate("department");

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
