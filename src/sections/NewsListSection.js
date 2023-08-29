import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { NewsListComponent } from '../components'
import { showFrom } from '../context/HitContext'
import { show } from '../context/NewsContext'
import { ERROR_MESSAGE } from '../utils/Constant'

export default function NewsListSection() {
    const [newsListLeft, setNewsListLeft] = useState([])
    const [newsListMiddle, setNewsListMiddle] = useState([])
    const [newsListRight, setNewsListRight] = useState([])
    useEffect(() => {
        async function getNewsLeft() {
            const { data, error } = await show().eq('category_id', 17).select('*, categories(*)')
            if (error) {
                Swal.fire(ERROR_MESSAGE, error.message, 'error')
                throw error
            }
            setNewsListLeft(data)
        }
        async function getNewsMiddle() {
            const { data, error } = await show().select('*, categories(*)')
            if (error) {
                Swal.fire(ERROR_MESSAGE, error.message, 'error')
                throw error
            }
            setNewsListMiddle(data)
        }
        async function getNewsRight() {
            const { data, error } = await showFrom({ column: 'hit', ascending: false })
            if (error) {
                Swal.fire(ERROR_MESSAGE, error.message, 'error')
                throw error
            }
            setNewsListRight(data)
        }
        getNewsLeft()
        getNewsMiddle()
        getNewsRight()
    }, [])
    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-5 p-10 md:px-44 h-fit md:h-screen overflow-hidden'>
            <div className='flex flex-col gap-5 overflow-y-auto'>
                <p className='text-2xl text-red-600 font-bold underline'>BERITA UTAMA</p>
                {newsListLeft.map((item, index) => <NewsListComponent
                    key={index}
                    id={item.id}
                    withImage={false}
                    classNameTitle={'text-blue-900'}
                    title={item.title}
                    date={moment(item.created_at).format('ll')}
                    category={item.categories.name} />)}
            </div>
            <div className='col-span-2 flex flex-col gap-5 overflow-y-auto'>
                {newsListMiddle.map((item, index) => <NewsListComponent
                    key={index}
                    id={item.id}
                    classNameTitle={'md:text-2xl'}
                    title={item.title}
                    img={item.image_public_url}
                    date={moment(item.created_at).format('ll')}
                    category={item.categories.name} />)}
            </div>
            <div className='flex flex-col gap-5 overflow-y-auto'>
                <p className='text-2xl text-red-600 font-bold underline'>BERITA TERPOPULER</p>
                {newsListRight.map((item, index) => <NewsListComponent
                    id={item.news.id}
                    key={index}
                    title={item.news.title}
                    img={item.news.image_public_url}
                    date={moment(item.news.created_at).format('ll')}
                    category={item.news.categories.name} />)}
            </div>
        </div>
    )
}
