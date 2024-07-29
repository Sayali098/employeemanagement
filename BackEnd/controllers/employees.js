 import  Employee from '../Models/EmployeeModel.js';
 import multer from 'multer';
import path from 'path';
 


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });




 export const  createEmployee=async(req,res)=>{
   
        const {  name, email, mobile, designation, gender, course } = req.body;
        const image = req.file.path; 
        try {
          const newEmployee = new Employee({ image, name, email, mobile, designation, gender, course: JSON.parse(course)});
          const employee = await newEmployee.save();
          res.json(employee);
        } catch (err) {
          res.status(500).send('Server error');
        }
    };

    export { upload };


    export  const getEmployees = async (req, res) => {
        try {
          const employees = await Employee.find();
          res.json(employees);
        } catch (err) {
          res.status(500).send('Server error');
        }
      };

      
   export const getEmployeeId= async (req, res) => {
        try {
          const employee = await Employee.findById(req.params.id);
          if (!employee) return res.status(404).json({ message: 'Employee not found' });
          res.json(employee);
        } catch (error) {
          res.status(500).json({ message: 'Server error' });
        }
      };

 

      

      export const updateEmployee = async (req, res) => {
        const { id } = req.params;
        const { name, email, mobile, designation, gender, course } = req.body;
        const updateFields = { name, email, mobile, designation, gender, course };
        
        if (req.file) {
          updateFields.image = req.file.path;
        }
        
        try {
          const employee = await Employee.findByIdAndUpdate(id, updateFields, { new: true });
          if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
          }
          res.json(employee);
        } catch (err) {
          console.error('Error updating employee:', err);
          res.status(500).send('Server error');
        }
      };      

      export const deleteEmployee = async (req, res) => {
        const { id } = req.params;
        try {
          await Employee.findByIdAndDelete(id);
          res.json({ msg: 'Employee deleted' });
        } catch (err) {
          res.status(500).send('Server error');
        }
      };