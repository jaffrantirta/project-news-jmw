import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ImgNotFound } from '../assets'
import { Message, NewsListComponent } from '../components'
import { showFrom } from '../context/HitContext'
import { show, showByTag, showLike } from '../context/NewsContext'
import { HeaderSection, NavbarSection } from '../sections'
import { ERROR_MESSAGE } from '../utils/Constant'
import Loader from '../utils/Loader'

export default function NewsList() {
    const [newsListRight, setNewsListRight] = useState([])
    const [newsListLeft, setNewsListLeft] = useState([])
    const { search } = useLocation()
    const [loading, setLoading] = useState(true)
    const queryParams = new URLSearchParams(search)
    useEffect(() => {
        const queryParams = new URLSearchParams(search)
        async function getNewsRight() {
            const { data, error } = await showFrom({ column: 'hit', ascending: false })
            if (error) {
                Swal.fire(ERROR_MESSAGE, error.message, 'error')
                throw error
            }
            setNewsListRight(data)
        }
        async function getSearch() {
            const { data, error } = await showLike('title', `%${queryParams.get('keyword')}%`)
            if (error) {
                Swal.fire(ERROR_MESSAGE, error.message, 'error')
                throw error
            }
            setNewsListLeft(data)
            setLoading(false)
        }
        async function getNewsByCategory() {
            const { data, error } = await show().eq('category_id', queryParams.get('id')).select('*, categories(*)').range(0, 10)
            if (error) {
                Swal.fire(ERROR_MESSAGE, error.message, 'error')
                throw error
            }
            setNewsListLeft(data)
            setLoading(false)
        }
        async function getNewsByTag() {
            const { data, error } = await showByTag(queryParams.get('tag'))
            if (error) {
                Swal.fire(ERROR_MESSAGE, error.message, 'error')
                throw error
            }
            setNewsListLeft(data)
            setLoading(false)
        }
        if (queryParams.has('keyword')) getSearch()
        if (queryParams.has('id')) getNewsByCategory()
        if (queryParams.has('tag')) getNewsByTag()
        getNewsRight()
    }, [search])

    return (
        <div>
            <HeaderSection />
            <hr></hr>
            <NavbarSection />
            {queryParams.has('keyword') ? <p className='text-center md:text-4xl px-10 underline'>Menampilkan pencarian  <span className='font-bold'>"{queryParams.get('keyword')}"</span></p> : <></>}
            {queryParams.has('id') ? <p className='text-center md:text-4xl px-10 underline'>Menampilkan berita kategori  <span className='font-bold'>"{queryParams.get('name')}"</span></p> : <></>}
            {queryParams.has('tag') ? <p className='text-center md:text-4xl px-10 underline'>Menampilkan berita dengan tag  <span className='font-bold'>"{queryParams.get('tag')}"</span></p> : <></>}
            <div className='p-10 grid grid-cols-q md:grid-cols-4 gap-10'>
                <div className='md:col-span-3'>
                    {loading ? <Loader loadText={'Mohon tunggu...'} /> : newsListLeft.length === 0 ? <Message img={ImgNotFound} message={'Tidak ada berita ditemukan'} /> : newsListLeft.map((item, index) => (
                        <div className='my-5' key={index}>
                            <NewsListComponent
                                id={item.id}
                                title={item.title}
                                img={item.image_public_url}
                                date={moment(item.created_at).format('ll')}
                                category={item.categories.name} />
                        </div>
                    ))}
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
        </div>
    )
}
