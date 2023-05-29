using DataServices.IRepository;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Text;

namespace TestTaskContactManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UploadContactController : ControllerBase
    {
        private readonly IUploadRepository _uploadRepository;

        public UploadContactController(IUploadRepository uploadRepository)
        {
            _uploadRepository = uploadRepository;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            using (var reader = new StreamReader(file.OpenReadStream(), Encoding.UTF8))
            {
                var csvData = new List<Contact>();
                while (!reader.EndOfStream)
                {
                    var line = await reader.ReadLineAsync();
                    var values = line.Split(';');

                    if (values.Length != 5)
                    {
                        return BadRequest("Invalid CSV format.");
                    }

                    if (!DateTime.TryParseExact(values[1], "dd.MM.yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime dateOfBirth))
                    {
                        return BadRequest("Invalid Date of Birth format.");
                    }

                    dateOfBirth = dateOfBirth.Date;

                    if (!bool.TryParse(values[2], out bool married))
                    {
                        return BadRequest("Invalid Married format.");
                    }

                    if (!decimal.TryParse(values[4], out decimal salary))
                    {
                        return BadRequest("Invalid Salary format.");
                    }

                    var contact = new Contact
                    {
                        
                        Name = values[0],
                        DateOfBirth = dateOfBirth,
                        Married = married,
                        Phone = values[3],
                        Salary = salary
                    };

                    csvData.Add(contact);
                }

                await _uploadRepository.SaveData(csvData);

                return Ok("CSV file uploaded and processed successfully.");
            }
        }
    }
}
