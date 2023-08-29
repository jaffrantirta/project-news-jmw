import React from 'react'
import { APP_NAME } from '../utils/Constant'

export default function Footer() {
    return (
        <div className='p-14 bg-primary'>
            <p className='text-center font-bold text-white text-3xl'>{APP_NAME}</p>
        </div>
    )
}
