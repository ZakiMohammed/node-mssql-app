const express = require('express')
const jsonEmployees = require('../../data/employees.json')

const router = express.Router();

let employees = jsonEmployees;

// POST: api/employees/
router.post('/', (req, res) => {
    const employee = req.body;
    if (employee) {
        employee.Id = Math.max.apply(this, employees.map(i => i.Id)) + 1;
        employees.push(employee);
        res.json(employee);
    } else {
        res.status(502).json({
            message: 'Record is invalid'
        });
    }
});

// PUT: api/employees/:id
router.put('/:id', (req, res) => {
    const index = employees.findIndex(i => i.Id === parseInt(req.params.id));
    const employee = employees[index];
    if (employee) {
        employees[index] = {...employee, ...req.body};
        res.json(employees[index]);
    } else {
        res.status(404).json({
            message: 'Record not found'
        });
    }
});

// DELETE: api/employees/:id
router.delete('/:id', (req, res) => {
    const index = employees.findIndex(i => i.Id === parseInt(req.params.id));
    const employee = employees[index];
    if (index !== -1) {
        employees.splice(index, 1);
        res.json(employee);
    } else {
        res.status(404).json({
            message: 'Record not found'
        });
    }
});

// GET: api/employees/:id
router.get('/:id', (req, res) => {
    const employee = employees.find(i => i.Id == parseInt(req.params.id));
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({
            message: 'Record not found'
        });
    }
});

// GET: api/employees
router.get('/', (req, res) => {
    res.json(employees.sort((a, b) => b.Id - a.Id));
});

module.exports = router;