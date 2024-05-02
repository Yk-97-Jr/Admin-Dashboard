import React from 'react'
import Header from '../../Components/Header'
import { Box, useTheme } from '@mui/material'
import {DataGrid, GridToolbar} from '@mui/x-data-grid'
import { mockDataInvoices } from '../../data/mockData'
import { tokens } from '../../Theme'

const InvoicesBills = () => {
    const theme = useTheme()
    const color = tokens(theme.palette.mode)
    
    const columns = [
        {field: 'id', headerName: 'ID'},
        {field: 'name', headerName: 'Name', flex: .5, cellClassName: 'name-column-cell'},
        {field: 'email', headerName: 'Email', flex: .5},
        {field: 'cost', headerName: 'Cost'},
        {field: 'phone', headerName: 'Phone', flex: .5, headerAlign: 'center', align: 'center'},
        {field: 'date', headerName: 'Date'},
    ]
    return (
        <div className='ml-2 mt-5'>
            <div>
                <Header title={'INVOICES'} subtitle={'Invoices and bills'}/>
            </div>

            <div className='w-full mt-8 flex items-center justify-center'>
                <div className='w-[85%] rounded-lg overflow-hidden'>
                    <Box
                    width={'100%'}
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: 'none',
                            backgroundColor: color.primary[400]
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: 'none'
                        },
                        "& .name-column-cell": {
                            color: color.greenAccent[400]
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: color.blueAccent[700],
                            borderBottom: 'none'
                        },
                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor: color.blueAccent[700],
                            borderTop: 'none'
                        },
                        "& .MuiDataGrid-virtualScrollbar": {
                            backgroundColor: color.primary[400],
                        },
                        "& .MuiCheckbox-root": {
                            color: color.greenAccent[500]
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${color.grey[100]} !important`,
                            marginBottom: '1rem'
                        }
                    }}>
                        <DataGrid
                        checkboxSelection 
                        components={{Toolbar: GridToolbar}}
                        rows={mockDataInvoices}
                        columns={columns}/>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default InvoicesBills