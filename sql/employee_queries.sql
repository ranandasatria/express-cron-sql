-- Create table employees
CREATE TABLE IF NOT EXISTS employees (
    name VARCHAR(100),
    position VARCHAR(100),
    join_date DATE,
    release_date DATE,
    years_of_experience FLOAT,
    salary DECIMAL(10,2)
);

-- Insert defautlt employees data 
INSERT INTO employees (name, position, join_date, release_date, years_of_experience, salary) VALUES
    ('Jacky', 'Solution Architect', '2018-07-25', '2022-07-25', 8, 150.00),
    ('John', 'Assistant Manager', '2016-02-02', '2021-02-02', 12, 155.00),
    ('Alano', 'Manager', '2010-11-09', NULL, 14, 175.00),
    ('Aaron', 'Engineer', '2021-08-16', '2022-08-16', 1, 80.00),
    ('Allen', 'Engineer', '2024-06-06', NULL, 4, 75.00),
    ('Peter', 'Team Leader', '2020-01-09', NULL, 3, 85.00);

-- 1. Add employee Albert
INSERT INTO employees (name, position, join_date, years_of_experience, salary)
VALUES ('Albert', 'Engineer', '2024-01-24', 2.5, 50.00);

-- 2. Update salary for Engineer
UPDATE employees
SET salary = 85.00
WHERE position = 'Engineer';

-- 3. Total salary in 2021
SELECT SUM(salary) as total_salary_2021
FROM employees
WHERE (join_date <= '2021-12-31' AND (release_date IS NULL OR release_date >= '2021-01-01'));

-- 4. 3 employees with highest years of experience
SELECT name, position, years_of_experience
FROM employees
ORDER BY years_of_experience DESC
LIMIT 3;

-- 5. Subquery for Engineer with years of experience <= 3 tahun
SELECT name, position, years_of_experience
FROM employees
WHERE position = 'Engineer'
AND years_of_experience IN (
    SELECT years_of_experience
    FROM employees
    WHERE years_of_experience <= 3
);