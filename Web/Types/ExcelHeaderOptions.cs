// FILENAME    : ExcelHeaderOptions.cs
// ==========================================================
//  
// AUTHOR      : FADHLY PERMATA
// CREATED AT  : 2018-08-13
// 
// ==========================================================

#region REFFERENCES

using OfficeOpenXml.Style;

#endregion

namespace Web.Types
{
    public class ExcelHeaderOptions
    {
        public string FieldName { get; set; }
        public string FieldText { get; set; }
        public string Format { get; set; }
        public string Suffix { get; set; }
        public string Prefix { get; set; }
        public ExcelHorizontalAlignment Alignment { get; set; }
    }
}
