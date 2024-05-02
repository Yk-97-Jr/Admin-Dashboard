import { useTheme } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { tokens } from '../Theme'

const Header = ({ title, subtitle }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <Box>
            <Typography  className={`font-bold mb-2`}
            variant='h2'
            color={colors.grey[100]}>
                {title}
            </Typography>
            
            <Typography fontWeight='bold'
            variant='h5'
            color={colors.greenAccent[400]}>
                {subtitle}
            </Typography>
        </Box>
    )
}

export default Header