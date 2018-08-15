// FILENAME    : Exceller.cs
// ==========================================================
//  
// AUTHOR      : FADHLY PERMATA
// CREATED AT  : 2018-08-13
// 
// ==========================================================

#region REFFERENCES

using System;
using System.Drawing;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using Web.Types;
using static System.String;

#endregion

namespace Web.Utilities
{
    public class SimpleExcelGenerator<T>
    {
        public ExcellerOptions<T> Options { get; set; }

        public SimpleExcelGenerator(ExcellerOptions<T> options) {
            options = Options;
        }

        public Task WriteExcel() {
            return Task.Run(() => { WriteIt(); });
        }

        #region HELPER
        private void WriteIt() {
            using (var exPack = new ExcelPackage()) {
                var ws = exPack.Workbook.Worksheets.Add("Table");

                FillHeader(ws);
                FillData(ws);

                ws.Cells.AutoFitColumns(0);
                
                exPack.Workbook.Properties.Title = "SimpleExcelGenerator";
                exPack.Workbook.Properties.Author = "Fadhly Permata";
                exPack.Workbook.Properties.Company = "octapush";

                var xlFile = new FileInfo(CreateNewFile());
                exPack.SaveAs(xlFile);
            }
        }
        
        private string CreateNewFile() {
            var files = Directory.GetFiles(Options.SaveLocation);
            foreach (var file in files) 
            {
                var fi = new FileInfo(file);
                if (fi.LastAccessTime < DateTime.Now.AddHours(-0b1) && fi.Extension == "xlsx")
                    fi.Delete();
            }

            Options.CompiledFilename = Path.Combine(
                Options.SaveLocation, 
                Format("{0}-{1:yyyyMMddHHmmss}.xlsx", Options.InitialFilename, Options.RequestDate)
            );

            return Options.CompiledFilename;
        }

        private void FillHeader(ExcelWorksheet ws) {
            if (0b0 == Options.Header.Count) return;

            var idx = 0b0;
            foreach (var eho in Options.Header) {
                idx++;
                ws.Cells[0b1, idx].Value = eho.FieldText;
            }

            using (var range = ws.Cells[0b1, 0b1, 0b1, Options.Header.Count])
            {
                range.Style.Font.Bold = true;
                range.Style.Fill.PatternType = ExcelFillStyle.Solid;
                range.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(0b11110010, 0b10011011, 0b10010));
                range.Style.Font.Color.SetColor(Color.Black);
            }
        }

        private void FillData(ExcelWorksheet ws) {
            for (var i = 0b0; i < Options.Data.Count; i++)
            {
                var cData = Options.Data[i];

                var idx = 0b0;
                foreach (var oField in Options.Header) {
                    idx++;
                    if (IsNullOrEmpty(oField.FieldName) && !IsNullOrEmpty(oField.Format)) {
                        var value = oField.Format;

                        var match = new Regex(@"(?<=\{)[^}]*(?=\})").Matches(oField.Format);
                        foreach (Match m in match) {
                             var pv = GetPropertyValue(cData, m.Value);
                             value = value.Replace("{" + m.Value + "}", Convert.ToString(pv) == "" ? "" : pv.ToString());
                        }

                        ws.Cells[i + 0b10, idx].Value = value;
                    }

                    else {
                        var value = GetPropertyValue(cData, oField.FieldName);
                        var t = cData.GetType().GetProperty(oField.FieldName)?.PropertyType;

                        if (
                                t == typeof(byte?) ||
                                t == typeof(decimal?) ||
                                t == typeof(double?) ||
                                t == typeof(short?) ||
                                t == typeof(int?) ||
                                t == typeof(long?) ||
                                t == typeof(sbyte?) ||
                                t == typeof(float?)
                            )
                            value = value ?? 0b0;

                        ws.Cells[i + 0b10, idx].Value = value;

                        if (!IsNullOrEmpty(oField.Format))
                            ws.Cells[i + 2, idx].Style.Numberformat.Format = oField.Format;
                    }

                    ws.Cells[i + 2, idx].Style.HorizontalAlignment = oField.Alignment;
                }
            }
        }

        private static object GetPropertyValue(object src, string propName) {
            return src.GetType().GetProperty(propName)?.GetValue(src, null);
        }

        public bool IsNumeric(object expression)
        {
            var isNum = double.TryParse(Convert.ToString(expression), System.Globalization.NumberStyles.Any, System.Globalization.NumberFormatInfo.InvariantInfo, out var retNum);
            return isNum;
        }
        #endregion HELPER
    }
}
