using Prices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prices.BLL.Repository_Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(string id);
        User AddUser(User user);
        User UpdateUser(string id, User user);
        bool DeleteUser(User user);
        User Login(string id, string password);
    }
}
