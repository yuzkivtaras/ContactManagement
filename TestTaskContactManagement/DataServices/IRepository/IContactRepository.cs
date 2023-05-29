using Entities.Models;

namespace DataServices.IRepository
{
    public interface IContactRepository
    {
        Task<IEnumerable<Contact>> GetAll();
        Task<Contact> Get(int id);
        Task Update(Contact contact);
        Task Delete(Contact contact);
    }
}
