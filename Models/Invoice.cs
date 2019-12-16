using System;

namespace PROJECT.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public int TermId {get; set; }
        public Term Term { get; set; }
        public string InvoiceNumber { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string Rrr { get; set; }
        public Status Status { get; set; }
        public int? StudentId { get; set; }
        public Student Student { get; set; }
        public string Tuition { get; set; }
        public string ExamFee { get; set; }
        public string Games { get; set; }
        public string Medicals { get; set; }
    }
}