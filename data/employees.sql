CREATE TABLE [dbo].[Employee](
	[Id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Code] [varchar](50) NOT NULL,
	[Name] [varchar](50) NULL,
	[Job] [varchar](50) NULL,
	[Salary] [int] NULL,
	[Department] [varchar](50) NULL
)

INSERT INTO Employee (Code,Salary,Job,Department,Name) VALUES ('CT7207',40000,'Manager','Operations','Bently Smith');
INSERT INTO Employee (Code,Salary,Job,Department,Name) VALUES ('CT7210',80000,'Director','Operations','Isla Morris');
INSERT INTO Employee (Code,Salary,Job,Department,Name) VALUES ('CT7202',15000,'Salesman','Sales','Allen Green');
INSERT INTO Employee (Code,Salary,Job,Department,Name) VALUES ('CT7208',50000,'Analyst','Research','Xavier Campbell');
INSERT INTO Employee (Code,Salary,Job,Department,Name) VALUES ('CT7209',50000,'Analyst','Research','Ethan Kumar');
INSERT INTO Employee (Code,Salary,Job,Department,Name) VALUES ('CT7201',20000,'Clerk','Accounting','John Marshal');
INSERT INTO Employee (Code,Salary,Job,Department,Name) VALUES ('CT7205',15000,'Salesman','Sales','Ethan Almaas');
INSERT INTO Employee (Code,Salary,Job,Department,Name) VALUES ('CT7211',15000,'Salesman','Sales','Natalie Robinson');
INSERT INTO Employee (Code,Salary,Job,Department,Name) VALUES ('CT7212',15000,'Salesman','Sales','Earl Rose');
INSERT INTO Employee (Code,Salary,Job,Department,Name) VALUES ('CT7206',20000,'Clerk','Accounting','Ilija Seifert');
INSERT INTO Employee (Code,Salary,Job,Department,Name) VALUES ('CT7204',20000,'Clerk','Accounting','Annette Burke');
INSERT INTO Employee (Code,Salary,Job,Department,Name) VALUES ('CT7203',15000,'Salesman','Sales','Fernando Gordon');
INSERT INTO Employee (Code,Salary,Job,Department,Name) VALUES ('CT7213',15000,'Salesman','Sales','Catherine Foster');