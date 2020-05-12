const express = require('express')
const sql = require('mssql/msnodesqlv8')

const router = express.Router();

const config = {
    connectionString: 'Driver=SQL Server;Server=ZAKIS-MSD\\SQLSERVER2017;Database=foo_db;Trusted_Connection=true;'
};

// POST: api/employees/
router.post('/', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('Code', req.body.Code)
            .input('Salary', req.body.Salary)
            .input('Job', req.body.Job)
            .input('Department', req.body.Department)
            .input('Name', req.body.Name)
            .query(`
                INSERT INTO Employee (Code, Salary, Job, Department, Name) 
                OUTPUT inserted.Id 
                VALUES (@Code, @Salary, @Job, @Department, @Name);
            `);
        const employee = req.body;
        employee.Id = result.recordset[0].Id;
        res.json(employee);
    } catch (error) {
        res.status(500).json(error);
    }
});

// PUT: api/employees/:id
router.put('/:id', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('Id', req.params.id)
            .query(`SELECT * FROM Employee WHERE Id = @Id`);

        let employee = result.recordset.length ? result.recordset[0] : null;
        if (employee) {
            await pool.request()
                .input('Id', req.params.id)
                .input('Code', req.body.Code)
                .input('Salary', req.body.Salary)
                .input('Job', req.body.Job)
                .input('Department', req.body.Department)
                .input('Name', req.body.Name)
                .query(`
                    UPDATE Employee SET
                        Code = @Code, 
                        Salary = @Salary, 
                        Job = @Job, 
                        Department = @Department, 
                        Name = @Name
                    WHERE Id = @Id;
                `);
            
            employee = {...employee, ...req.body};

            res.json(employee);
        } else {
            res.status(404).json({
                message: 'Record not found'
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE: api/employees/:id
router.delete('/:id', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('Id', req.params.id)
            .query(`SELECT * FROM Employee WHERE Id = @Id`);
        
        let employee = result.recordset.length ? result.recordset[0] : null;
        if (employee) {
            await pool.request()
                .input('Id', req.params.id)
                .query(`DELETE FROM Employee WHERE Id = @Id;`);
            res.json(employee);
        } else {
            res.status(404).json({
                message: 'Record not found'
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET: api/employees/:id
router.get('/:id', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('Id', req.params.id)
            .query(`SELECT * FROM Employee WHERE Id = @Id`);
        const employee = result.recordset.length ? result.recordset[0] : null;

        if (employee) {
            res.json(employee);
        } else {
            res.status(404).json({
                message: 'Record not found'
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET: api/employees
router.get('/', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(`SELECT * FROM Employee ORDER BY Id DESC`);
        const employees = result.recordset;
        
        res.json(employees);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;