import { saveAs } from "file-saver";
import { useState } from "react";
import * as XLSX from "xlsx-js-style";

// eslint-disable-next-line react/prop-types
const FileExport = ({ data }) => {
  const [value, setValue] = useState("map");
  const exportToExcel = (e) => {
    e.preventDefault();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${value}.xlsx`);
  };

  return (
    <form onSubmit={exportToExcel}>
      <input
        type="text"
        name=""
        id=""
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Export to Excel</button>
    </form>
  );
};

export default FileExport;
