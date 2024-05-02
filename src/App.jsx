import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { colorModeContext, useMode } from './Theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Topbar from './scenes/global/Topbar'
import Sidebar from './scenes/global/Sidebar'
import Dashboard from './scenes/dashboard/Dashboard'
import Team from './scenes/team/Team'
import Contacts from './scenes/contacts/Contacts'
import Invoices from './scenes/invoices/InvoicesBills'
import Form from './scenes/form/Form'
import Calendar from './scenes/calendar/Calendar'
import FAQ from './scenes/faq/FAQ'
import BarChart from './scenes/barChart/Bar'
import PieChart from './scenes/pieChart/Pie'
import LineChart from './scenes/lineChart/Line'
import Map from './scenes/geography/Geography'

const App = () => {

    const [theme, colorMode] = useMode();

    return (
        <colorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className='w-full h-full flex relative scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-500'>
                    <Sidebar/>
                    <main className='w-full h-full'>
                        <Topbar/>
                        <Routes>
                            <Route path='/' element={<Dashboard/>}/>
                            <Route path='/team' element={<Team/>}/>
                            <Route path='/contacts' element={<Contacts/>}/>
                            <Route path='/invoices' element={<Invoices/>}/>
                            <Route path='/form' element={<Form/>}/>
                            <Route path='/calendar' element={<Calendar/>}/>
                            <Route path='/faq' element={<FAQ/>}/>
                            <Route path='/bar' element={<BarChart/>}/>
                            <Route path='/pie' element={<PieChart/>}/>
                            <Route path='/line' element={<LineChart/>}/>
                            <Route path='/geography' element={<Map/>}/>
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </colorModeContext.Provider>
    )
}

export default App