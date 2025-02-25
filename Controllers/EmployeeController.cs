using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using WebApplication1.Data;
using WebApplication1.Models;
using WebApplication1.Models.Entities;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiControllerAttribute]
    public class EmployeeController : Controller
    {
        public ApplicationDbContext dbContext;

        public EmployeeController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            try
            {
                return Ok(dbContext.Employees.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching employees.", error = ex.Message });
            }

        }
        [HttpGet]
        [Route("{id:Guid}")]
        public IActionResult GetEmployeeById(Guid id)
        {
            try
            {
                var employee = dbContext.Employees.Find(id);
                if (employee == null)
                {
                    return NotFound();
                }
                return Ok(employee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching employee details.", error = ex.Message });
            }
        }
        [HttpPost]
        public IActionResult AddEmployee(AddEmployeeDto addEmployeeDto)
             {
            try
            {
                // ✅ Validate Inputs (Same as before)
                if (string.IsNullOrWhiteSpace(addEmployeeDto.FirstName) ||
                    string.IsNullOrWhiteSpace(addEmployeeDto.LastName) ||
                    string.IsNullOrWhiteSpace(addEmployeeDto.Email) ||
                    string.IsNullOrWhiteSpace(addEmployeeDto.PhoneNumber) ||
                    addEmployeeDto.HireDate == default)
                {
                    return BadRequest(new { message = "All fields are required." });
                }

                if (!Regex.IsMatch(addEmployeeDto.FirstName, @"^[A-Za-z]+$") ||
                    !Regex.IsMatch(addEmployeeDto.LastName, @"^[A-Za-z]+$"))
                {
                    return BadRequest(new { message = "First and Last Name should contain only letters." });
                }

                if (!Regex.IsMatch(addEmployeeDto.Email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
                {
                    return BadRequest(new { message = "Invalid email format." });
                }

                if (dbContext.Employees.Any(e => e.Email == addEmployeeDto.Email))
                {
                    return BadRequest(new { message = "Email already exists. Please use a unique email." });
                }

                if (!Regex.IsMatch(addEmployeeDto.PhoneNumber, @"^\d{10}$"))
                {
                    return BadRequest(new { message = "Phone number must be exactly 10 digits." });
                }

                if (dbContext.Employees.Any(e => e.PhoneNumber == addEmployeeDto.PhoneNumber))
                {
                    return BadRequest(new { message = "Phone number already exists. Please use a unique phone number." });
                }

                if (addEmployeeDto.Salary <= 0)
                {
                    return BadRequest(new { message = "Salary must be greater than zero." });
                }

                if (addEmployeeDto.HireDate> DateOnly.FromDateTime(DateTime.UtcNow))
                {
                    return BadRequest(new { message = "Hire date cannot be in the future." });
                }

                if (!dbContext.Set<Department>().Any(d => d.DepartmentId == addEmployeeDto.DepartmentID))
                {
                    return BadRequest(new { message = "Invalid Department ID." });
                }

                var employeeEntity = new Employee
                {
                    FirstName = addEmployeeDto.FirstName,
                    LastName = addEmployeeDto.LastName,
                    Email = addEmployeeDto.Email,
                    PhoneNumber = addEmployeeDto.PhoneNumber,
                    HireDate = addEmployeeDto.HireDate,
                    JobTitle = addEmployeeDto.JobTitle,
                    DepartmentID = addEmployeeDto.DepartmentID,
                    Salary = addEmployeeDto.Salary,
                };

                dbContext.Employees.Add(employeeEntity);
                dbContext.SaveChanges();
                return CreatedAtAction(nameof(GetEmployeeById), new { id = employeeEntity.id }, employeeEntity);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while adding employee.", error = ex.Message });
            }
        }
        [HttpPut]
        [Route("{id:Guid}")]
        public IActionResult UpdateEmployee(Guid id, UpdateEmployeeDto updateEmployeeDto)
        {

            try
            {
                var employee = dbContext.Employees.Find(id);
                if (employee == null)
                {
                    return NotFound();
                }

                // ✅ Validate Inputs (Same as before)
                if (string.IsNullOrWhiteSpace(updateEmployeeDto.FirstName) ||
                    string.IsNullOrWhiteSpace(updateEmployeeDto.LastName) ||
                    string.IsNullOrWhiteSpace(updateEmployeeDto.Email) ||
                    string.IsNullOrWhiteSpace(updateEmployeeDto.PhoneNumber) ||
                    updateEmployeeDto.HireDate == default)
                {
                    return BadRequest(new { message = "All fields are required." });
                }

                if (!Regex.IsMatch(updateEmployeeDto.FirstName, @"^[A-Za-z]+$") ||
                    !Regex.IsMatch(updateEmployeeDto.LastName, @"^[A-Za-z]+$"))
                {
                    return BadRequest(new { message = "First and Last Name should contain only letters." });
                }

                if (!Regex.IsMatch(updateEmployeeDto.Email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
                {
                    return BadRequest(new { message = "Invalid email format." });
                }

                if (dbContext.Employees.Any(e => e.Email == updateEmployeeDto.Email && e.id != id))
                {
                    return BadRequest(new { message = "Email already exists. Please use a unique email." });
                }

                if (!Regex.IsMatch(updateEmployeeDto.PhoneNumber, @"^\d{10}$"))
                {
                    return BadRequest(new { message = "Phone number must be exactly 10 digits." });
                }

                if (dbContext.Employees.Any(e => e.PhoneNumber == updateEmployeeDto.PhoneNumber && e.id != id))
                {
                    return BadRequest(new { message = "Phone number already exists. Please use a unique phone number." });
                }

                if (updateEmployeeDto.Salary <= 0)
                {
                    return BadRequest(new { message = "Salary must be greater than zero." });
                }

                if (updateEmployeeDto.HireDate > DateOnly.FromDateTime(DateTime.UtcNow))
                {
                    return BadRequest(new { message = "Hire date cannot be in the future." });
                }

                if (!dbContext.Set<Department>().Any(d => d.DepartmentId == updateEmployeeDto.DepartmentID))
                {
                    return BadRequest(new { message = "Invalid Department ID." });
                }

                if (!dbContext.Set<Department>().Any(d => d.DepartmentId == updateEmployeeDto.DepartmentID))
                {
                    return BadRequest(new { message = "Invalid Department ID." });
                }

                employee.FirstName = updateEmployeeDto.FirstName;
                employee.LastName = updateEmployeeDto.LastName;
                employee.Email = updateEmployeeDto.Email;
                employee.PhoneNumber = updateEmployeeDto.PhoneNumber;
                employee.HireDate = updateEmployeeDto.HireDate;
                employee.JobTitle = updateEmployeeDto.JobTitle;
                employee.DepartmentID = updateEmployeeDto.DepartmentID;
                employee.Salary = updateEmployeeDto.Salary;

                dbContext.SaveChanges();
                return Ok(employee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating employee.", error = ex.Message });
            }


        }
        [HttpDelete]
        [Route("{id:Guid}")]
        public IActionResult DeleteEmployee(Guid id)
        {

            var employee = dbContext.Employees.Find(id);

            if (employee == null)
            {
                return NotFound();
            }
            dbContext.Employees.Remove(employee);
            dbContext.SaveChanges();
            return Ok();
        }



    }
}
