using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prices.Models
{
    public class Item
    {
        #region Private fields
        private string item_id;
        private string receipt_id;
        private string item_title;
        private double price;
        private double discount_dollar;
        private double discount_percent;
        private string item_description;
        private string user_id;
        private string item_image;
        private string id_type;
        private List<Tag> tags;

        #endregion

        #region Properties
        public string Item_id { get => item_id; set => item_id = value; }
        public string Receipt_id { get => receipt_id; set => receipt_id = value; }
        public string Item_title { get => item_title; set => item_title = value; }
        public double Price { get => price; set => price = value; }
        public double Discount_dollar { get => discount_dollar; set => discount_dollar = value; }
        public double Discount_percent { get => discount_percent; set => discount_percent = value; }
        public string Item_Description { get => item_description; set => item_description = value; }
        public string User_id { get => user_id; set => user_id = value; }
        public string Id_type { get => id_type; set => id_type = value; }
        public List<Tag> Tags { get => tags; set => tags = value; }
        public string Item_image { get => item_image; set => item_image = value; }

        #endregion
        
    }
}