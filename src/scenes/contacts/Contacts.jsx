import React from 'react'
import Header from '../../Components/Header'
import { Box, useTheme } from '@mui/material'
import { tokens } from '../../Theme'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { mockDataContacts } from '../../data/mockData'

const Contacts = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const columns = [
        {field: 'id', headerName: 'ID'},
        {field: 'name', headerName: 'Name', flex: 0.5, cellClassName: 'name-column-cell'},
        {field: 'age', headerName: 'Age', headerAlign: 'left', align: 'left'},
        {field: 'email', headerName: 'Email', flex: .5},
        {field: 'phone', headerName: 'Phone', },
        {field: 'address', headerName: 'Address', flex: 0.5},
        {field: 'zipCode', headerName: 'Zipcode'},
        {field: 'city', headerName: 'City'},

    ]

    return (
        <div className='ml-2 mt-5'>
            <div className='mb-8'>
                <Header title={'CONTACTS'} subtitle={"List of Contacts for Future Reference"}/>
            </div>

            <div className='w-full mt-8 flex items-center justify-center'>
                <div className='w-[90%] max-h-[46rem] flex justify-center rounded-lg overflow-hidden overflow-y-auto scrollbar-none'>
                    <Box 
                    width={'100%'}
                    height={'100%'}
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: 'none',
                            backgroundColor: colors.primary[400]
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: 'none'
                        },
                        "& .name-column-cell": {
                            color: colors.greenAccent[300]
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: 'none'
                        },
                        "& .MuiDataGrid-virtualScrollbar": {
                            backgroundColor: colors.primary[400]
                        },
                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor: colors.blueAccent[700],
                            borderTop: 'none'
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[500]} !important`,
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${colors.grey[100]} !important`,
                            marginBottom: '1rem'
                        },
                    }}>
                        <DataGrid 
                        checkboxSelection
                        rows={mockDataContacts}
                        columns={columns}
                        components={{Toolbar: GridToolbar}}/>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Contacts