import { Dropdown } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { APP_NAME, ERROR_MESSAGE } from '../utils/Constant'
import { show } from './../context/CategoryContext'

export default function NavbarSection() {
    const [categoriesList, setCategoriesList] = useState([])
    const navigate = useNavigate()

    const goTo = (id, name) => {
        navigate(`/search?id=${id}&name=${name}`)
    }

    useEffect(() => {
        async function getCategories() {
            const { data: categories, error } = await show()
            if (error) {
                Swal.fire(ERROR_MESSAGE, error.message, 'error')
                throw error
            }
            setCategoriesList(categories)
        }
        getCategories()
    }, [])


    return (
        <div>
            <div className='md:hidden w-full p-5 flex justify-center'>
                <Dropdown
                    label="Menu"
                    inline={true}
                >
                    {categoriesList.map((item, index) => {
                        return (
                            <Dropdown.Item key={index} onClick={() => goTo(item.id, item.name)}>
                                {item.name}
                            </Dropdown.Item>
                        )
                    })}
                </Dropdown>
            </div>
            <div className='hidden md:flex justify-evenly p-2'>
                <Link to={'/'} className='text-primary font-bold text-3xl'>{APP_NAME}</Link>
                <div className='flex gap-5'>
                    {categoriesList.map((item, index) => {
                        return (
                            <div className='hover:bg-primary font-bold hover:text-slate-100 p-3 transition-all duration-300 rounded-full' key={index}>
                                <Link to={`/search?id=${item.id}&name=${item.name}`} className=''>{item.name}</Link>
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}
