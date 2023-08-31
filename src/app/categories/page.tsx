'use client'
import Button from '@/components/UI/Button'
import PageNavigator from '@/components/UI/PageNavigator'
import ICategory from '@/interfaces/ICategory'
import API from '@/lib/api'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function categories() {
  const router = useRouter()

  const goToCategory = (id: string) => {
    router.push(`/categories/${id}`)
  }

  const [categories, setCategories] = useState([])
  const [nextPage, setNextPage] = useState('')
  const [previousPage, setPreviousPage] = useState('')

  function getCategories(url: string) {
    API.get(url).then((response) => {
      setNextPage(response.data.links.next)
      setPreviousPage(response.data.links.previous)
      setCategories(response.data.data)
    })
  }

  function next() {
    getCategories(nextPage)
  }

  function previous() {
    getCategories(previousPage)
  }

  useEffect(() => {
    getCategories('/categories')
  }, [])

  return (
    <main className='px-20'>
      <h2 className='text-3xl mt-20 text-center'>Categories</h2>
      <div className='flex justify-center flex-wrap gap-12 mt-20'>
        {categories.map((category: ICategory) => (
          <div key={category.id}>
            <Button onClick={() => goToCategory(category.id)} outline>
              {category.title}
            </Button>
          </div>
        ))}
      </div>
      <div className='flex justify-center my-8'>
        <PageNavigator disabledPrevious={previousPage} disabledNext={nextPage} previous={previous} next={next} />
      </div>
    </main>
  )
}
