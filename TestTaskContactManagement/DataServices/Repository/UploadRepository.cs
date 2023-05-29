using DataServices.Data;
using DataServices.IRepository;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository
{
    public class UploadRepository : IUploadRepository
    {
        private readonly AppDbContext _context;
        public UploadRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task SaveData(List<Contact> contacts)
        {
            _context.Contacts.RemoveRange(_context.Contacts);
            await _context.SaveChangesAsync();

            _context.Contacts.AddRange(contacts);
            await _context.SaveChangesAsync();
        }
    }
}
