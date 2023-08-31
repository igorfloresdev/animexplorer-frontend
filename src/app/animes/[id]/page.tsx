'use client'
import Button from '@/components/UI/Button'
import API from '@/lib/api'
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import toast from 'react-hot-toast'
import IAnime from '@/interfaces/IAnime'
import IEpisode from '@/interfaces/IEpisode'
import IPost from '@/interfaces/IPost'
import PageNavigator from '@/components/UI/PageNavigator'

export default function page({ params }: { params: { id: string } }) {
  const [anime, setAnime] = useState<IAnime>()
  const [episodes, setEpisodes] = useState<IEpisode[]>([])
  const [nextPage, setNextPage] = useState('')
  const [previousPage, setPreviousPage] = useState('')
  const [inputPost, setInputPost] = useState('')
  const [inputName, setInputName] = useState('')
  const [posts, setPosts] = useState([])

  function getAnimes(url: string) {
    API.get(url).then((response) => {
      setAnime(response.data)
    })
  }

  function getEpisodes(url: string) {
    API.get(url).then((response) => {
      setEpisodes(response.data.data)
      setNextPage(response.data.links.next)
      setPreviousPage(response.data.links.previous)
    })
  }

  function getPosts(url: string) {
    API.get(url).then((response) => {
      setPosts(response.data)
    })
  }

  const submitPost = () => {
    if (inputName === '' || inputPost === '') {
      return toast.error('Name and comment is required')
    }

    API.post('post', { name: inputName, post: inputPost, animeId: params.id }).then((response) => {
      toast.success('Comment posted successfully !')
      getPosts(`posts/${params.id}`)
    })

    setInputName('')
    setInputPost('')
  }

  function next() {
    getEpisodes(nextPage)
  }

  function previous() {
    getEpisodes(previousPage)
  }

  const handleInputPostChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputPost(event.target.value)
  }

  const handleInputNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value)
  }

  useEffect(() => {
    getAnimes(`anime/${params.id}`)
    getEpisodes(`anime/${params.id}/episodes`)
    getPosts(`posts/${params.id}`)
  }, [])

  return (
    <main className='mx-[400px]'>
      {anime && (
        <div className='flex flex-col items-center'>
          <h1 className='text-3xl mt-20 text-center'>{anime.title}</h1>
          <Image className='mt-8 rounded-lg' src={anime.posterImage} alt={anime.title} width={300} height={300} />
          <div className='pt-4'>
            <span className='pr-8'>
              Rate: {anime.ratingRank ? anime.ratingRank.toString().substring(0, 2) : 'N/A'}
              <AiFillStar className='ml-1 inline text-yellow-500' />
            </span>
            <span>Age Rating: {anime.ageRating}</span>
          </div>
          <h2 className='text-2xl mt-16 underline'>Synopsis</h2>
          <p className='max-w-6xl pt-4'>{anime.synopsis}</p>
          <h2 className='text-2xl mt-16 underline'>Episodes</h2>
          <div>
            {episodes.map((episode: IEpisode) => (
              <div key={episode.id} className='collapse bg-base-200 mt-8'>
                <input type='radio' name='my-accordion-1' />
                <div className='flex collapse-title text-xl font-medium'>
                  <h3 className='pr-12'>{episode.title}</h3>
                  <span className='flex-1 text-right'>
                    S{episode.seasonNumber}E{episode.number}
                  </span>
                </div>
                <div className='gap-12 collapse-content'>
                  <div className='flex gap-x-2 max-w-2xl'>
                    <Image
                      className='rounded-lg'
                      width={300}
                      height={300}
                      alt={episode.title}
                      src={episode.thumbnail ? episode.thumbnail.original : ''}
                    />
                    <span className=''>Synopsis: {episode.synopsis !== '' ? episode.synopsis : 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className='flex justify-center my-8'>
        <PageNavigator disabledPrevious={previousPage} disabledNext={nextPage} previous={previous} next={next} />
      </div>
      <form className='flex flex-col'>
        <h2 className='mb-2'>Comments: </h2>
        <input
          className='input input-bordered max-w-xs my-4'
          placeholder='Your Name'
          value={inputName}
          onChange={handleInputNameChange}
        ></input>
        <input
          className='input input-bordered w-full mb-8 py-12'
          placeholder='Make a comment about this anime !'
          value={inputPost}
          onChange={handleInputPostChange}
        ></input>
        <div className='self-end'>
          <Button onClick={submitPost}>Send !</Button>
        </div>
        <div className='flex flex-col gap-12 mt-12'>
          {posts.map((post: IPost) => (
            <div className='border-b-2 border-white border-opacity-20' key={post.id}>
              <p className='mb-2'>
                Name: <span>{post.name}</span>
              </p>
              <p className='mb-4'>
                Comment: <span>{post.post}</span>
              </p>
            </div>
          ))}
        </div>
      </form>
    </main>
  )
}
