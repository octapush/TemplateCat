// FILENAME    : ExcellerOptions.cs
// ==========================================================
//  
// AUTHOR      : FADHLY PERMATA
// CREATED AT  : 2018-08-13
// 
// ==========================================================

#region REFFERENCES

using System;
using System.Collections.Generic;

#endregion

namespace Web.Types
{
    public class ExcellerOptions<T>
    {
        public DateTime RequestDate { get; set; }

        public string CompiledFilename { get; set; }
        public string SaveLocation { get; set; }
        public string InitialFilename { get; set; }

        public List<ExcelHeaderOptions> Header { get; set; }
        public List<T> Data { get; set; }
    }
}
