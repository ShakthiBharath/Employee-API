using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class UpdateEmployeeDto
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
        public decimal Salary { get; set; }

    }
}
