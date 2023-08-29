import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../context/AuthContext'
import { APP_NAME } from '../utils/Constant'
import { MENUS } from '../utils/Menus'

export default function SidebarComponent({ toggle }) {
    const currentPath = useLocation().pathname
    const { signOut, updateSession } = useAuth()

    return (
        <div className={`flex flex-col h-screen p-5 bg-primary dark:bg-dark-primary mr-5 sticky left-0 top-0 font-primary`}>
            <div className="space-y-3">
                <div className="flex items-center text-secondary">
                    <h2 className="text-xl font-bold">{APP_NAME}</h2>
                </div>
                <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-1 text-sm">
                        {MENUS.home.map((item, index) => {
                            return (
                                <li key={index} className={`text-secondary hover:bg-secondary hover:text-primary rounded-full px-2 py-1 ${(currentPath === item.link) ? 'bg-secondary text-slate-500' : ''}`}>
                                    <Link onClick={(e) => toggle(e)} to={item.link} className="flex items-center p-2 space-x-3 rounded-md text-sm sm:text-base">
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                        <li className={`text-secondary hover:bg-secondary hover:text-primary rounded-full px-2 py-1`}>
                            <Link onClick={() => Swal.fire({
                                title: 'Yakin keluar?',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonText: 'Logout',
                                confirmButtonColor: 'red',
                                showLoaderOnConfirm: true,
                                preConfirm: async () => {
                                    const { error } = await signOut()
                                    if (error) {
                                        Swal.showValidationMessage('Gagal logout')
                                        throw error
                                    }
                                    await updateSession()
                                    return true
                                }
                            }).then(response => {
                                if (response.isConfirmed) {
                                    Swal.fire('Berhasil', '', 'success')
                                }
                            })} className="flex items-center p-2 space-x-3 rounded-md text-sm sm:text-base">
                                <span>Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}