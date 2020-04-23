using Prices.BLL.ReceiptEntity;
using Prices.BLL.Repository_Interfaces;
using Prices.DAL.SQLConnection;
using Prices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prices.BLL.ItemEntity
{
    public class SQLItemRepository : IItemRepository
    {
        DBServices db = new DBServices();
        public Item AddItem(Item item)
        {
            throw new NotImplementedException();
        }

        public bool DeleteItem(Item item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Item> GetAllItems()
        {
            List<Item> allItams = new List<Item>();
            allItams = (List<Item>)db.SPGetAll(new Item());
            //allItams = db.SPGetAll(new Item());
            for (int i = 0; i < allItams.Count; i++)
            {
                allItams[i].Tags=(List<Tag>)db.SPGetById(new Tag(), "SelectByItemId",allItams[i].Item_id);//Add tags for each item
            }
            return allItams;
        }
        public IEnumerable<Item> GetResaults(Search<Item> search)
        {
            List<Item> results = (List<Item>)db.SPGetResaults(search);
            for (int i = 0; i < results.Count; i++)
            {
                results[i].Tags = (List<Tag>)db.SPGetById(new Tag(), "SelectByItemId", results[i].Item_id);//Add tags for each item
            }
            return results;
        }
     
        public Item GetItemById(int id)
        {
            throw new NotImplementedException();
        }

        public Item UpdateItem(int id, Item item)
        {
            throw new NotImplementedException();
        }

    }
}