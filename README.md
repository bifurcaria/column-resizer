# MUI Column resizer hook

A custom hook for resizing columns in a Material-UI table.

## Table of Contents

- [MUI Column resizer hook](#mui-column-resizer-hook)
  
  - [Table of Contents](#table-of-contents)
  - [Disclaimer](#disclaimer)
  - [Usage](#usage)

## Disclaimer
This custom hook, `useColumnResizer`, directly manipulates the DOM to achieve its functionality. It adjusts the width of DataGrid columns by selecting elements with a specific `colIndex` attribute and modifying their width. While this approach provides the desired functionality, it's important to note that direct DOM manipulation is generally not recommended in React. 

React's philosophy encourages a declarative style of programming where the DOM is updated efficiently by React itself based on state and props. Direct manipulation of the DOM can lead to unexpected results and inconsistencies in the UI, especially when React's reconciliation process is not aware of the changes made. Therefore, use this hook with caution and consider exploring other methods, such as using the paid feature or adjusting column widths via state or props, if possible.

## Usage

This custom React hook, `useColumnResizer`, is used to resize the columns of a MUI DataGrid component without using paid versions. Here's a breakdown of its usage:

1. **Importing the Hook**: The hook is imported into a component where it's needed. The hook uses `useState`, `useEffect`, and `useRef` from React.

2. **Initialization**: The hook is initialized with two parameters: `loading` and `initialValues`. `loading` is a boolean indicating whether the DataGrid is rendered yet. `initialValues` is an optional parameter that sets the initial minimum widths of the columns.

3. **State and Refs**: The hook uses `useState` to manage the state of `minWidths`, which stores the minimum widths of the columns. It uses `useRef` to create references to `isResizing` and `separatorRef`. `isResizing` is used to track which column is currently being resized (-1 indicates no column is being resized), and `separatorRef` is used to reference the separator element used for resizing.

4. **Constants**: `defaultMinWidth` and `defaultMaxWidth` are constants that define the minimum and maximum width a column can have.

5. **adjustWidthColumn Function**: This function is used to adjust the width of a column. It takes in an `index` (the index of the column to resize) and `width` (the new width). It ensures the new width is within the defined min and max widths. It then selects all elements with a `colindex` attribute equal to the provided index and adjusts their width.

6. **Classes Requirement**: The hook requires setting classes to the columns in the parent component. This can be achieved by using `cellClassName` and `headerClassName` props of the DataGrid component. The classes should be in the format: `colIndex-0`, `colIndex-1`, `colIndex-2`, etc.
