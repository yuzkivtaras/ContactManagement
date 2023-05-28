using Entities.Models;

namespace DataServices.IRepository
{
    public interface IContactRepository
    {
        Task<IEnumerable<Contact>> GetAll();
    }
}
