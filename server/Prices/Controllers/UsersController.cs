using Prices.BLL.Repository_Interfaces;
using Prices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Prices.Controllers
{
    public class UsersController : ApiController
    {
        IUserRepository repo;
        public UsersController(IUserRepository ir) => repo = ir;
        
        // GET api/<controller>
        public IEnumerable<User> Get()
        {
            return repo.GetAllUsers();
            //return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(string id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
            User user = new User()
            {
                User_id = "admin@admin.com",
                First_name = "admin",
                Last_name = "admin",
                Password = "admin",
                Birthdate = new DateTime(2000, 01, 01),
                Gender = true,
                State = "israel",
                City = "ashdot yaacov ichud",
            };
            repo.AddUser(user);
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }

        // LOGIN
        public User Login(string id, string password)
        {
            return repo.Login(id, password);
        }
    }
}