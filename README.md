# NodeJS team up with MSSQL

Starter application to perform CRUD operation with MSSQL using NodeJS.
___

Packages Required
```
npm i express
npm i -D nodemon
npm i mssql
npm i msnodesqlv8
```

We can setup the config object using either of the following ways:
```
const config = {
    server: 'ZAKIS-MSD\\SQLSERVER2017',
    driver: 'msnodesqlv8',
    database: 'foo_db',
    options: {
        trustedConnection: true
    }
};

// Or using connectionString
const config = {
    connectionString: 'Driver=SQL Server;Server=ZAKIS-MSD\\SQLSERVER2017;Database=foo_db;Trusted_Connection=true;'
};
```

Connect to DB using sql connect() method:
```
const pool = await sql.connect(config);
```

Execute query using sql query() method:
```
const result = await pool.request()
    .input('Id', req.params.id)
    .query(`SELECT * FROM Employee WHERE Id = @Id`);
```

Get all employees record:
```
const employees = result.recordset;
```

Get single single employee record:
```
const employee = result.recordset.length ? 
    result.recordset[0] : null;
```

Insert into employee table using query() method:
```
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
```
Use `OUTPUT inserted.Id` to get the newly created auto-increment Id. For UPDATE and DELETE we can use query() method in the same way used for INSERT.

Output of INSERT/UPDATE/DELETE query() method
```
{
    "recordsets": [],
    "output": {},
    "rowsAffected": [
        1
    ]
}
```

The `rowsAffected` shows number of rows affected by the INSERT/UPDATE/DELETE command