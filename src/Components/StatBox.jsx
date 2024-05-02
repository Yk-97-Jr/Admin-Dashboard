import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../Theme'
import ProgressCircle from './ProgressCircle'

const StatBox = ({title, subtitle, icon, progress, increase}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    return (
        <Box width='100%' m='0 30px'>
            <Box display='flex' justifyContent='space-between'>
                <Box 
                sx={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'start', 
                    justifyContent: 'space-between'
                }}>
                    {icon}

                    <Typography
                    variant='h4'
                    fontWeight='bold'
                    sx={{color: colors.grey[100]}}>
                        {title}
                    </Typography>

                    <Typography 
                    variant='h5' sx={{color: colors.greenAccent[400]}}>
                        {subtitle}
                    </Typography>
                </Box>

                <Box 
                sx={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    gap: '13px',
                }}>
                    <ProgressCircle progress={progress} size='65'/>

                    <Typography variant='h5' fontWeight='bold' sx={{color: colors.greenAccent[600], fontSize: '1.1rem'}}>
                        {increase}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default StatBox