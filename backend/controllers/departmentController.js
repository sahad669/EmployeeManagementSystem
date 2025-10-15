import departmentModel from "../models/departmentModel.js";

// add department
export const addDepartment = async (req, res) => {
  const { department, description } = req.body;
  if (!department || !description) {
    return res.status(400).json({ message: "fill all the fields" });
  }
  const newDepartment = await departmentModel.create({ department, description });
  res.status(201).json({ message: "Department Created Successfully", newDepartment });
};

// get all departments
export const getAllDepartment = async (req, res) => {
  try {
    const departments = await departmentModel.find();
    res.json(departments); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// delete department
export const deleteDepartment = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteDepartment = await departmentModel.findByIdAndDelete(id);
    if (!deleteDepartment) {
      return res.status(404).json({ message: "Department Not Found" });
    }
    res.json({ message: "Department Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};