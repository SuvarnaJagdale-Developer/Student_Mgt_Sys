using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Domain
{
   public class Student
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }
      
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Year { get; set;}
        public string Room_No { get; set;}

        public int? age { get; set; }

        public DateTime date { get; set; }

        public string Teacher_name { get; set; }

    }
}
