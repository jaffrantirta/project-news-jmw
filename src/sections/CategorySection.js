import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { NewsListComponent } from '../components'
import { showWithNews } from '../context/CategoryContext'
import { ERROR_MESSAGE } from '../utils/Constant'

export default function CategorySection() {
    const [categoriesWithNewsList, setCategoriesWithNewsList] = useState([])
    useEffect(() => {
        async function getCategoriesWithNews() {
            const { data, error } = await showWithNews(2)
            if (error) {
                Swal.fire(ERROR_MESSAGE, error.message, 'error')
                throw error
            }
            setCategoriesWithNewsList(data)
        }
        getCategoriesWithNews()
    }, [])

    return (
        <div className='grid grid-cols-1 md:grid-cols-4 p-10 gap-5'>
            {categoriesWithNewsList.map((category, indexCategory) => {
                if (category.news.length > 0) {
                    return (
                        <div key={indexCategory}>
                            <p className='text-2xl text-red-600 font-bold underline'>{category.name}</p>
                            {category.news.map((news, indexNews) => <NewsListComponent id={news.id} className={'my-2'} img={news.image_public_url} key={indexNews} withCategory={false} classNameTitle={'text-sm'} title={news.title} date={moment(news.created_at).format('lll')} />)}
                        </div>
                    )
                }
                return null

            })}
        </div>
    )
}
