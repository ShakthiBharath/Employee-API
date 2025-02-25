using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models.Entities
{
    public class Employee
    {
        [Key]
        public Guid id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public DateOnly HireDate { get; set; }
        public required string JobTitle { get; set; }
        public int DepartmentID { get; set; }


        [ForeignKey("DepartmentID")]
        public Department? Department { get; set; }
        public decimal Salary { get; set; }

    }
}
