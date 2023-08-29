import React from 'react'
import { CategorySection, Footer, HeaderSection, HeroSection, NavbarSection, NewsListSection } from '../sections'

export default function Home() {

    return (
        <div>
            <HeaderSection />
            <hr></hr>
            <NavbarSection />
            <hr></hr>
            <HeroSection />
            <NewsListSection />
            <CategorySection />
            <Footer />
        </div>
    )
}
