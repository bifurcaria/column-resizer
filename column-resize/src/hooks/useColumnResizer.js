import { useState, useEffect, useRef } from 'react';

// ** This hook is used to resize the columns of the DataGrid component
// It requires setting classes to the columns in the parent component
// This can be achieved by using cellClassName and headerClassName props of the DataGrid component
// The classes should be in the format: colIndex-0, colIndex-1, colIndex-2, etc.

const useColumnResizer = (loading, initialValues = {}) => {

  const [minWidths, setMinWidths] = useState(initialValues)
  const isResizing = useRef(-1);
  const separatorRef = useRef(null);

  const defaultMinWidth = 100;
  const defaultMaxWidth = 800;

  const adjustWidthColumn = (index, width) => {
    const minWidth = defaultMinWidth;
    const maxWidth = defaultMaxWidth;

    let newWidth =
      width > maxWidth ? maxWidth : width < minWidth ? minWidth : width;

    const columnElements = document.querySelectorAll(`[colindex="${index}"]`);

    if (width < maxWidth && width > minWidth) {
      columnElements.forEach((element) => {
        element.style.maxWidth = "none";
        element.style.minWidth = "none";
        element.style.width = newWidth + 'px';
      });

      setMinWidths((prevMinWidths) => {
        return {
          ...prevMinWidths,
          [`.colIndex-${index}`]: { minWidth: `${newWidth}px !important` },
        };
      });
    }


    return adjustWidthColumn;
  }


  const handleDivClick = (event) => {
    separatorRef.current = event.srcElement.parentElement.parentNode.parentElement
    const index = event.srcElement.parentElement.parentNode.parentElement.attributes[3] ? event.srcElement.parentElement.parentNode.parentElement.attributes[3].nodeValue : 0
    isResizing.current = index;
    setCursorDocument(true);
  };

  const handleMouseMove = (event) => {
    if (isResizing.current >= 0) {
      const width = event.clientX - separatorRef.current.getBoundingClientRect().left;
      adjustWidthColumn(isResizing.current, width);
    }

  };

  const saveColumnWidthsLocalStorage = (columnWidths) => {
    const columnWidthsString = JSON.stringify(columnWidths);
    localStorage.setItem('columnWidths', columnWidthsString);
  };

  const getColumnWidths = () => {
    const columnWidths = {};
    const columns = document.querySelectorAll('.MuiDataGrid-columnHeader');
    columns.forEach((column) => {
      const index = column.attributes[3].nodeValue;
      const width = column.getBoundingClientRect().width;
      columnWidths[`.colIndex-${index}`] = { minWidth: `${width}px !important` }
    });

    return columnWidths;
  };

  const handleMouseUp = (event) => {
    if (isResizing.current >= 0) {
      const columnWidths = getColumnWidths();
      saveColumnWidthsLocalStorage(columnWidths);
    }
    isResizing.current = -1;
    separatorRef.current = null;
    setCursorDocument(false);
  };

  const setCursorDocument = (isResizing) => {
    document.body.style.cursor = isResizing ? "col-resize" : "auto";
  };

  useEffect(() => {
    if (!loading) {
      const separators = document.querySelectorAll('.MuiDataGrid-columnSeparator path')

      if (separators) {
        separators.forEach((div) => {
          div.addEventListener('mousedown', handleDivClick);
        });
      }
    }

    return () => {
      const separators = document.querySelectorAll('.MuiDataGrid-columnSeparator path');
      separators.forEach((div) => {
        div.removeEventListener('click', handleDivClick);
      });
    }

  }, [loading]);

  useEffect(() => {
    document.onmousemove = handleMouseMove
    document.onmouseup = handleMouseUp

    return () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }, []);

  useEffect(() => {
    const columnWidthsString = localStorage.getItem('columnWidths');
    const columnWidths = JSON.parse(columnWidthsString);
    if (columnWidths) {
      setMinWidths(columnWidths);
    }
  }, []);

  return minWidths;

}

export default useColumnResizer;