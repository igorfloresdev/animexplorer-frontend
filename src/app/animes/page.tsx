'use client'
import React, { useEffect, useState } from 'react'
import API from '@/lib/api'
import AnimeCard from '@/components/AnimeCard'
import IAnime from '@/interfaces/IAnime'
import PageNavigator from '@/components/UI/PageNavigator'

export default function animes() {
  const [animes, setAnimes] = useState([])
  const [nextPage, setNextPage] = useState('')
  const [previousPage, setPreviousPage] = useState('')

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
    getAnimes('/animes')
  }, [])

  return (
    <main className='flex flex-col'>
      <h2 className='text-3xl mt-20 text-center'>Animes</h2>
      <div className='flex flex-wrap gap-16 mt-20 px-12 justify-center'>
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
    </main>
  )
}
