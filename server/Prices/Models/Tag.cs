using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Prices.Models
{
    public class Tag
    {
        private int tag_id;
        private string tag_title;
        private string item_id;

        public int Tag_id { get => tag_id; set => tag_id = value; }
        public string Tag_title { get => tag_title; set => tag_title = value; }
        public string Item_id { get => item_id; set => item_id = value; }
    }
}