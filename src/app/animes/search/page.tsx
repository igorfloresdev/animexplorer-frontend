'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import API from '@/lib/api'
import AnimeCard from '@/components/AnimeCard'
import IAnime from '@/interfaces/IAnime'

export default function search() {
  const searchParams = useSearchParams()

  const text = searchParams.get('text')

  const [animes, setAnimes] = useState([])

  function getAnimes(url: string) {
    API.get(url).then((response) => {
      setAnimes(response.data.data)
    })
  }

  useEffect(() => {
    getAnimes(`/animes/search?text=${text}`)
  }, [text])

  return (
    <main className='flex flex-col'>
      <h2 className='text-3xl mt-20 text-center'>Animes</h2>
      <div className='flex flex-wrap gap-16 mt-20 px-12'>
        {animes.length !== 0 ? (
          animes.map((anime: IAnime) => (
            <AnimeCard
              id={anime.id}
              title={anime.title}
              ageRating={anime.ageRating}
              posterImage={anime.posterImage}
              ratingRank={anime.ratingRank}
            />
          ))
        ) : (
          <p className='text-center w-full text-6xl opacity-20'> No anime found ! ):</p>
        )}
      </div>
    </main>
  )
}
