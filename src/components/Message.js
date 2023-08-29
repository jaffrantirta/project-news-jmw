import React from 'react'

export default function Message({ img, message }) {
    return (
        <div className='w-full h-full flex flex-col items-center'>
            <img className='w-1/4 text-center' alt={message} src={img} />
            <p className='text-xl font-bold mt-5'>{message}</p>
        </div>
    )
}
