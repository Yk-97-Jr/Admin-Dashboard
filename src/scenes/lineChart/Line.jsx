import React from 'react'
import Header from '../../Components/Header'
import LineChart from '../../Components/LineChart'

const Line = () => {
    return (
        <div className='ml-2 mt-5'>
            <Header title={'Line Chart'} subtitle={'Chart in line style'}/>

            <LineChart/>
        </div>
    )
}

export default Line