import { createContext, useContext, useState } from "react";
import * as XLSX from "xlsx-js-style";

const TableContext = createContext(null);

const isEmptyCell = (data) => data.startsWith("__EMPTY");

// eslint-disable-next-line react/prop-types
const Head = ({ data }) => {
  const { maxCols, maxRows } = useContext(TableContext);
  //다음 셀이 비어있는 셀이라면
  //이전 셀과 병합
  //현재 셀은 렌더링하지 않음
  //data => [내용, colspan]

  let colspan = 1;
  const keyList = data ? Object.keys(data) : [];

  const dataList = Array(maxCols).fill([]);
  keyList.forEach((d, idx) => {
    if (isEmptyCell(d)) {
      colspan++;
    } else {
      dataList[idx] = [d, ++colspan];
      colspan = 1;
    }
  });

  return (
    <thead>
      <tr>
        {dataList.map((d, idx) => (
          <th key={"th" + d[0] + d[1] + idx} colSpan={d[1]}>
            {d[0]}
          </th>
        ))}
      </tr>
    </thead>
  );
};
const Body = ({ data }) => {
  const { maxCols, maxRows } = useContext(TableContext);
  let colspan = 1;
  const keyList = data ? Object.keys(data) : [];
  const dataList = Array(maxCols).fill([]);
  keyList.forEach((d, idx) => {
    if (typeof data[d] == "string" && isEmptyCell(data[d])) {
      colspan++;
    } else {
      dataList[idx] = [data[d], colspan];
      colspan = 1;
    }
  });

  return (
    <tr>
      {dataList.map((k, idx) => (
        <td key={"td" + idx} colSpan={k[1]}>
          {k[0]}
        </td>
      ))}
    </tr>
  );
};
// eslint-disable-next-line react/prop-types

const XlsxSheet = ({ data, ...props }) => {
  const sheetData = XLSX.utils.sheet_to_json(data);
  const maxRows = sheetData[sheetData.length - 1]
    ? sheetData[sheetData.length - 1]["__rowNum__"]
    : 0;
  const maxCols = maxRows
    ? Math.max(
        ...sheetData.map((d) => {
          return Object.values(d).length;
        })
      )
    : 0;

  const value = {
    maxRows,
    maxCols,
  };

  const fitRowNum = (sheetData, maxRows) => {
    const newData = Array(maxRows).fill([]);
    sheetData.forEach((data) => {
      const currentRow = data["__rowNum__"];
      newData[currentRow] = data;
    });
    return newData;
  };

  const newData = fitRowNum(sheetData, maxRows);
  return (
    <TableContext.Provider value={value}>
      <table {...props}>
        <Head data={newData[0]} />
        <tbody>
          {newData.map((item, idx) => (
            <Body key={"td" + idx} data={item} />
          ))}
        </tbody>
      </table>
    </TableContext.Provider>
  );
};

export default XlsxSheet;
