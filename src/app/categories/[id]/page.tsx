'use client'
import AnimeCard from '@/components/AnimeCard'
import PageNavigator from '@/components/UI/PageNavigator'
import IAnime from '@/interfaces/IAnime'
import ICategory from '@/interfaces/ICategory'
import API from '@/lib/api'
import React, { useEffect, useState } from 'react'

export default function page({ params }: { params: { id: string } }) {
  const [category, setCategory] = useState<ICategory>()
  const [animes, setAnimes] = useState<IAnime[]>([])
  const [nextPage, setNextPage] = useState('')
  const [previousPage, setPreviousPage] = useState('')

  function getCategory(url: string) {
    API.get(url).then((response) => {
      setCategory(response.data)
    })
  }

  function getAnimes(url: string) {
    API.get(url).then((response) => {
      setNextPage(response.data.links.next)
      setPreviousPage(response.data.links.previous)
      setAnimes(response.data.data)
    })
  }

  function next() {
    getAnimes(nextPage)
  }

  function previous() {
    getAnimes(previousPage)
  }

  useEffect(() => {
    getCategory(`category/${params.id}`)
    getAnimes(`category/${params.id}/animes`)
  }, [])

  return (
    <div>
      <h2 className='text-3xl mt-20 text-center'>{category?.title}</h2>
      <p className='text-center mt-12'>{category?.description}</p>
      <div className='flex flex-wrap gap-16 mt-20 px-12'>
        {animes &&
          animes.map((anime: IAnime) => (
            <AnimeCard
              id={anime.id}
              title={anime.title}
              ageRating={anime.ageRating}
              posterImage={anime.posterImage}
              ratingRank={anime.ratingRank}
            />
          ))}
      </div>
      <div className='flex justify-center my-8'>
        <PageNavigator disabledPrevious={previousPage} disabledNext={nextPage} previous={previous} next={next} />
      </div>
    </div>
  )
}
