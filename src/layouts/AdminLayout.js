import React, { useState } from 'react'
import { SidebarComponent } from '../components'

export default function AdminLayout({ children }) {
    const [stylingSidebar, setStylingSidebar] = useState('-translate-x-96 w-0 md:-translate-x-0 md:w-1/5')
    const [stylingChild, setStylingChild] = useState('w-full')
    // eslint-disable-next-line
    const [toggle, setToggle] = useState(true)
    const handleChild = (e, from) => {
        (from === 'nav') ? handleSideBar() : (window.innerWidth >= 768) ? console.info() : handleSideBar()
    }
    const handleSideBar = () => {
        setToggle(t => {
            if (t) {
                setStylingSidebar('-translate-x-0 w-2/4 md:-translate-x-96 md:w-0')
                setStylingChild('w-2/4 overflow-hidden md:w-full')
                return false
            } else {
                setStylingSidebar('-translate-x-96 w-0 md:-translate-x-0 md:w-1/5')
                setStylingChild('w-full md:w-full')
                return true
            }
        })
    }
    return (
        <>
            <div className='flex flex-auto bg-secondary dark:bg-dark-1 w-full'>
                <div className={`transition duration-300 ${stylingSidebar}`}>
                    <SidebarComponent toggle={(e) => handleChild(e, 'side')} />
                </div>
                <div className={`${stylingChild}`}>
                    <div className='m-5'>{children}</div>
                </div>
            </div>
        </>
    )
}