import Image from 'next/image'
import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import Button from './UI/Button'
import { useRouter } from 'next/navigation'

interface AnimeCardProps {
  id: string
  posterImage: string
  title: string
  ratingRank: string
  ageRating: string
}

export default function AnimeCard({ id, posterImage, title, ratingRank, ageRating }: AnimeCardProps) {
  const router = useRouter()

  const goToAnime = () => {
    router.push(`/animes/${id}`)
  }
  return (
    <div className='flex w-96' key={id}>
      <Image className='rounded-lg' src={posterImage} width={200} height={150} alt={title} />
      <div className='flex items-start flex-col pl-8'>
        <h2>{title}</h2>
        <h2 className='pt-12'>
          Rate: {ratingRank ? ratingRank.toString().substring(0, 2) : 'N/A'}{' '}
          <AiFillStar className='inline text-yellow-500' />
        </h2>
        <h2 className='pt-2'>
          Age Rating: <span className=' text-sm rounded-md border-purple-900 border-2 p-0.5'>{ageRating}</span>{' '}
        </h2>
        <div className='flex flex-1 items-end'>
          <Button outline onClick={goToAnime}>
            See More
          </Button>
        </div>
      </div>
    </div>
  )
}
