import React from 'react'
import Header from '../../Components/Header'
import PieChart from '../../Components/PieChart'

const Pie = () => {
    return (
        <div className='ml-2 mt-5'>
            <div>
                <Header title={'Pie Chart'} subtitle={'Chart in pie style'}/>
            </div>

            <PieChart/>
        </div>
    )
}

export default Pie