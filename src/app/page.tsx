'use client'
import Image from 'next/image'
import tanjiroGif from '/public/assets/images/tanjiro.gif'
import Button from '@/components/UI/Button'
import { useRouter } from 'next/navigation'

export default async function Home() {
  const router = useRouter()

  const goToAnimes = () => {
    router.push(`/animes`)
  }

  const goToCategories = () => {
    router.push(`/categories`)
  }

  return (
    <main className='mx-12'>
      <div className='flex flex-col items-center'>
        <h2 className='text-3xl mt-20'>Welcome to ANIMEXPLORER</h2>
        <p className='mt-12'>
          This is a space where you can find information about your favorite anime and discover a new favorite one !
        </p>
        <Image className='mt-4' src={tanjiroGif} width={640} height={360} alt='Tanjiro smiling gif' />
      </div>
      <div className='flex flex-col items-center mt-4'>
        <p>Feel free to search by:</p>
        <div className='flex gap-x-6 items-center mt-4'>
          <Button onClick={goToAnimes} outline>
            Animes
          </Button>
          <Button onClick={goToCategories} outline>
            Categories
          </Button>
        </div>
      </div>
    </main>
  )
}
