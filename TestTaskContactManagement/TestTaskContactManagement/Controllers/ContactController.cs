using DataServices.IRepository;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TestTaskContactManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IContactRepository _contactRepository;

        public ContactController(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Contact>> GetAllContacts()
        {
            return await _contactRepository.GetAll();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(int id, [FromBody] Contact updatedContact)
        {
            var existingContact = await _contactRepository.Get(id);
            if (existingContact == null)
            {
                return NotFound();
            }

            existingContact.Name = updatedContact.Name;
            existingContact.DateOfBirth = updatedContact.DateOfBirth;
            existingContact.Married = updatedContact.Married;
            existingContact.Phone = updatedContact.Phone;
            existingContact.Salary = updatedContact.Salary;

            await _contactRepository.Update(existingContact);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var existingContact = await _contactRepository.Get(id);
            if (existingContact == null)
            {
                return NotFound();
            }

            await _contactRepository.Delete(existingContact);

            return NoContent();
        }
    }
}
