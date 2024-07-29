
import express from 'express';
import { createEmployee, deleteEmployee, getEmployeeId, getEmployees, updateEmployee ,upload} from '../controllers/employees.js';

const router = express.Router();

router.post('/create',upload.single('image'), createEmployee);
router.get('/get',  getEmployees);
router.get('/get/:id',getEmployeeId)
router.put('/update/:id',upload.single('image'), updateEmployee);
router.delete('/delete/:id',deleteEmployee);


export default router;