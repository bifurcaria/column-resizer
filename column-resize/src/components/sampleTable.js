import { React, useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useColumnResizer from '@/hooks/useColumnResizer';

const SampleTable = () => {
    const [loading, setLoading] = useState(true);
    const resizedColumnWidths = useColumnResizer(loading);

    useEffect(() => {
        setLoading(false);
    }, [])


    let columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name' },
        { field: 'email', headerName: 'Email' },
        { field: 'age', headerName: 'Age' },
    ];
    // add classes to each column
    columns = columns.map((column, index) => {
        column.cellClassName = `colIndex-${index + 1}`;
        column.headerClassName = `colIndex-${index + 1}`;
        return column;
    });

    const rows = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', age: 25 },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', age: 30 },
        { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', age: 35 },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                sx={{
                    '.MuiDataGrid-iconSeparator': {
                        '& path:hover': { cursor: 'col-resize', strokeWidth: '3px' },
                    },
                    ...{ ...resizedColumnWidths }
                }} />
        </div>
    );
};

export default SampleTable;
