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
        { field: 'icon', headerName: 'Icon' },
        { field: 'name', headerName: 'Name' },
        { field: 'email', headerName: 'Email' },
    
    ];
    // add classes to each column
    columns = columns.map((column, index) => {
        column.cellClassName = `colIndex-${index + 1}`;
        column.headerClassName = `colIndex-${index + 1}`;
        return column;
    });

    const rows = [
        { id: 1, name: 'Frutilla', email: 'frutilla@fruta.com', icon: '🍓' },
        { id: 2, name: 'Sandía', email: 'sandía@fruta.com', icon: '🍉' },
        { id: 3, name: 'Plátano', email: 'plátano@fruta.com', icon: '🍌' },
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
