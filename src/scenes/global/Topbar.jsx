import { Box, IconButton, InputBase, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { colorModeContext, tokens } from '../../Theme'
import SearchIcon from '@mui/icons-material/Search'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const Topbar = () => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(colorModeContext)

    return (
        <>
            <div className='flex flex-col sm:flex-row justify-between pt-2 px-2'>
                <Box 
                display='flex' backgroundColor={colors.primary[400]} borderRadius='5px'>
                    <InputBase placeholder='search' sx={{ml: 2, flex: 1, }}/>
                    <IconButton type='button' sx={{p: 1}}>
                        <SearchIcon/>
                    </IconButton>
                </Box>

                <Box 
                display='flex' 
                sx={{ justifyContent: 'space-between', alignItems: 'center'}}>
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkModeOutlinedIcon/>
                            ) : (
                            <LightModeOutlinedIcon/>
                        )}
                    </IconButton>
                    <IconButton><PersonOutlineOutlinedIcon/></IconButton>
                    <IconButton><NotificationsActiveOutlinedIcon/></IconButton>
                    <IconButton><SettingsOutlinedIcon/></IconButton>
                </Box>
            </div>
        </>
    )
}

export default Topbar