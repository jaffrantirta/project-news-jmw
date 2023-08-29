import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { HeroImageComponent } from '../components'
import { show } from '../context/NewsContext'
import { ERROR_MESSAGE } from '../utils/Constant'

export default function HeroSection() {
    const [newsList, setNewsList] = useState([])

    useEffect(() => {
        async function getData() {
            const { data: news, error } = await show().range(0, 4).select('*, categories(*)')
            if (error) {
                Swal.fire(ERROR_MESSAGE, error.message, 'error')
                throw error
            }
            setNewsList(news)
        }
        getData()
    }, [])

    const newsSets = []
    for (let i = 0; i < newsList.length; i += 2) {
        newsSets.push(newsList.slice(i, i + 2))
    }

    return (
        <div className='p-10 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-0'>
            {newsSets.map((newsSet, index) => (
                <div key={index} className='grid grid-cols-1 gap-3 md:gap-0'>
                    {newsSet.map((news) => {
                        return (
                            <HeroImageComponent
                                id={news.id}
                                key={news.id}
                                img={news.image_public_url}
                                category={news.categories.name}
                                title={news.title}
                                date={moment(news.created_at).format('ll')}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    )
}
