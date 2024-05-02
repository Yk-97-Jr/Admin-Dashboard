import React from 'react'
import Header from '../../Components/Header'
import GeographyChart from '../../Components/GeographyChart'

const Geography = () => {
    return (
        <div className='ml-2 mt-5'>
            <Header title={'MAP'} subtitle={'Places from where your clients are'}/>
            
            <GeographyChart/>
        </div>
    )
}

export default Geography