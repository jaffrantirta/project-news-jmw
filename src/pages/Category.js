import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ButtonComponent, TableComponent } from '../components';
import CategoryProvider, { show, store, update, destroy } from '../context/CategoryContext';
import Loader from '../utils/Loader';

export default function Category() {
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(true)
    const [categoriesList, setCategoriesList] = useState([])
    const heads = [{ title: 'No.' }, { title: 'Nama Kategori' }, { title: 'Aksi' }]

    const storeData = () => {
        Swal.fire({
            input: 'text',
            inputLabel: 'Nama kategori',
            confirmButtonText: 'Simpan',
            confirmButtonColor: 'orange',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: async (value) => {
                const { error } = await store(value)
                if (error) {
                    Swal.showValidationMessage(error.message)
                    throw error
                }
                setRefresh(!refresh)
                return true
            }
        }).then(response => {
            if (response.isConfirmed) Swal.fire('Berhasil', 'Kategori ditambahkan', 'success')
        })
    }

    useEffect(() => {
        function updateData(id, name) {
            Swal.fire({
                input: 'text',
                inputValue: name,
                inputLabel: 'Nama kategori',
                confirmButtonText: 'Simpan',
                confirmButtonColor: 'orange',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: async (value) => {
                    const { error } = await update(id, value)
                    if (error) {
                        Swal.showValidationMessage(error.message)
                        throw error
                    }
                    setRefresh(!refresh)
                    return true
                }
            }).then(response => {
                if (response.isConfirmed) Swal.fire('Berhasil', 'Kategori telah diedit', 'success')
            })
        }
        function destroyData(id) {
            Swal.fire({
                title: 'Yakin hapus kategori ini?',
                icon: 'question',
                confirmButtonText: 'Hapus',
                confirmButtonColor: 'red',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: async () => {
                    const { error } = await destroy(id)
                    if (error) {
                        Swal.showValidationMessage(error.message)
                        throw error
                    }
                    setRefresh(!refresh)
                    return true
                }
            }).then(response => {
                if (response.isConfirmed) Swal.fire('Berhasil', 'Kategori telah dihapus', 'success')
            })
        }
        async function getData() {
            setLoading(true)
            const { data: categories, error } = await show()
            if (error) Swal.showValidationMessage(error.message)
            if (categories) setCategoriesList(categories.map((item, index) => {
                return (
                    <tr key={item.id}>
                        <td className="p-3 border border-slate-500 text-center">{index + 1}</td>
                        <td className="p-3 border border-slate-500">{item.name}</td>
                        <td className="p-3 border border-slate-500 text-center">
                            <Link className={'m-1 hover:text-slate-700 text-orange-500'} onClick={() => updateData(item.id, item.name)} >Edit</Link>
                            <Link className={'m-1 hover:text-slate-700 text-red-500'} onClick={() => destroyData(item.id)} >Hapus</Link>
                        </td>
                    </tr>
                )
            }))
            setLoading(false)
        }
        getData()
    }, [refresh])

    return (loading ? <Loader loadText={'Memuat...'} /> :
        <CategoryProvider>
            <div>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <h1 className='text-2xl'>Kategori</h1>
                    <div className='flex justify-end'>
                        <ButtonComponent text={'TAMBAH'} className={`md:w-1/4 w-full`} onClick={() => storeData()} />
                    </div>
                </div>
                <div className='w-full'>
                    <TableComponent data={categoriesList} heads={heads} />
                </div>
            </div>
        </CategoryProvider>
    )
}
