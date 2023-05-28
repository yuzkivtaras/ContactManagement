using System.ComponentModel.DataAnnotations;

namespace Entities.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy,MM,dd}", ApplyFormatInEditMode = true)]
        public DateTime DateOfBirth { get; set; }
        public bool Married { get; set; }
        public string Phone { get; set; }
        public decimal Salary { get; set; }
    }
}
