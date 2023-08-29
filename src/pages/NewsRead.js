import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { NewsListComponent } from '../components'
import { showFrom, updateOrCreate } from '../context/HitContext'
import { selectSingleById } from '../context/NewsContext'
import { HeaderSection, NavbarSection } from '../sections'
import { ERROR_MESSAGE } from '../utils/Constant'
import Loader from '../utils/Loader'
import convertText from '../utils/ConvertText'

export default function NewsRead() {
    const { search } = useLocation()
    const [newsListRight, setNewsListRight] = useState([])
    const [newsDetail, setNewsDetail] = useState({})
    const [loading, setLoading] = useState(true)
    const [tags, setTags] = useState([])
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
        async function getNewsDetail() {
            const { data, error } = await selectSingleById(queryParams.get('id'))
            if (error) {
                Swal.fire(ERROR_MESSAGE, error.message, 'error')
                throw error
            }
            setTags(data.tags.split(';'))
            setNewsDetail(data)
            setLoading(false)
        }

        async function hit() {
            await updateOrCreate(queryParams.get('id'))
        }

        getNewsRight()
        if (queryParams.has('id')) getNewsDetail()
        if (queryParams.has('id')) hit()
    }, [search])

    const shareOnFacebook = (id, title) => {
        let shareUrl = `https://ariessujati.com/read?id=${id}&news=${convertText(title)}`;
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl), '_blank');
    }
    const shareOnTwitter = (id, title) => {
        let tweetUrl = `https://ariessujati.com/read?id=${id}&news=${convertText(title)}`;
        let tweetText = title;
        window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweetText) + '&url=' + encodeURIComponent(tweetUrl), '_blank');
    }
    const sharedOnWhatsApp = (id, title) => {
        let shareUrl = `https://ariessujati.com/read?id=${id}&news=${convertText(title)}`;
        let messageText = title + ' ' + shareUrl;
        let whatsappUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(messageText)
        window.open(whatsappUrl, '_blank');
    }

    return (loading ? <Loader loadText={'Memuat...'} /> :
        <div>
            <HeaderSection />
            <hr></hr>
            <NavbarSection />
            <div className='p-10 grid grid-cols-1 md:grid-cols-4 gap-10'>
                <div className='md:col-span-3'>
                    <p className='font-bold text-xl md:text-4xl xl:text-6xl'>{newsDetail.title}</p>
                    <div className='flex gap-5 my-3 font-bold'>
                        <p>{moment(newsDetail.created_at).format('ll')}</p>
                        <p>{moment(newsDetail.created_at).format('HH:mm')}</p>
                        <p>{newsDetail.categories.name}</p>
                    </div>
                    <div className='hidden md:grid grid-cols-1 md:grid-cols-3 gap-5'>
                        <button onClick={() => shareOnFacebook(newsDetail.id, newsDetail.title)} className='bg-blue-900 text-white p-3 font-bold'>FACEBOOK</button>
                        <button onClick={() => shareOnTwitter(newsDetail.id, newsDetail.title)} className='bg-sky-400 text-white p-3 font-bold'>TWITTER</button>
                        <button onClick={() => sharedOnWhatsApp(newsDetail.id, newsDetail.title)} className='bg-green-500 text-white p-3 font-bold'>WHATSAPP</button>
                    </div>
                    <img alt={newsDetail.title} src={newsDetail.image_public_url} className='my-5 w-full aspect-video object-cover object-center' />
                    <div dangerouslySetInnerHTML={{ __html: newsDetail.content }} />
                    <div className='flex mt-5 flex-wrap gap-5 items-center'>
                        <p className='text-lg font-bold mr-5'>TAGS: </p>
                        {tags.map((item, index) => (
                            <Link
                                to={`/search?tag=${item}`}
                                key={index}
                                className='p-2 bg-slate-400 rounded-xl shadow-md hover:bg-slate-600 w-fit cursor-pointer hover:text-slate-100'
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

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
