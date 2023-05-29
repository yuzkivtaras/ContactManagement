using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.IRepository
{
    public interface IUploadRepository
    {
        Task SaveData(List<Contact> contacts);
    }
}
