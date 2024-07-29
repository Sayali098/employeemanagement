import mongoose  from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  course: { type: [String], required: true },
  createdate: { type: Date, default: Date.now },
});

const Employee = mongoose.model('Employee', EmployeeSchema);
export default Employee;