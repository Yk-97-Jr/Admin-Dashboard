import React from 'react'
import Header from '../../Components/Header'
import { useTheme } from '@emotion/react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { mockDataTeam } from '../../data/mockData'
import { tokens } from '../../Theme'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { Box, Typography } from '@mui/material'

const Team = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const columns = [
        {field: 'id', headerName: 'ID'},
        {field: 'name', headerName: 'Name', flex: .5, cellClassName: 'name-column--cell' },
        {field: 'age', headerName: 'Age', type: 'number', headerAlign: 'left', align: 'left'},
        {field: 'email', headerName: 'Email', flex: 0.5},
        {field: 'phone', headerName: 'Phone Number', flex: 0},
        {field: 'access', headerName: 'Access Level', flex: .5, headerAlign: 'center',
        renderCell: ({ row: {access}}) => {
            return (
                <Box
                width='60%'
                m='0 auto'
                p='5px'
                display='flex'
                justifyContent='center' 
                borderRadius='5px'
                backgroundColor={access === 'admin' ? colors.greenAccent[600] : access === 'manager' ? colors.greenAccent[700] : colors.greenAccent[800]}>
                    {access === 'admin' && <AdminPanelSettingsOutlinedIcon/>}
                    {access === 'manager' && <GppGoodOutlinedIcon/>}
                    {access === 'user' && <LockOpenOutlinedIcon/>}

                    <Typography color={colors.grey[100]} sx={{ml: '5px'}}>
                        {access}
                    </Typography>
                </Box>
            )
        }}
    ]

    return (
        <div className='ml-2 mt-5'>
            <div className='flex items-center justify-between'>
                <Header title={"TEAM"} subtitle={'Managing the team members'}/>
            </div>

            <div className='w-full mt-8 flex items-center justify-center'>
                <div className='w-[90%] max-h-[45rem] flex justify-center rounded-lg overflow-y-auto scrollbar-none'>
                    <Box 
                    width={'100%'}
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: 'none',
                            backgroundColor: colors.primary[400]
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: 'none',
                        },
                        "& .name-column--cell": {
                            color: colors.greenAccent[400]
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: 'none',
                        },
                        "& MuiDataGrid-virtualScroller": {
                            borderTop: 'none',
                            backgroundColor: colors.blueAccent[700]
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: 'none',
                            backgroundColor: colors.blueAccent[700],
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[500]} !important`,
                        },
                        "& .MuiButton-text": {
                            color: `${colors.grey[100]} !important`,
                            marginBottom: '1rem'
                        },
                    }}>
                        <DataGrid 
                        components={{Toolbar: GridToolbar}}
                        checkboxSelection
                        rows={mockDataTeam}
                        columns={columns}/>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Team