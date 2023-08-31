'use client'
import Image from 'next/image'
import Link from 'next/link'
import logo from 'public/assets/images/logo.png'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [searchValue, setSearchValue] = useState('')

  const router = useRouter()

  const menuItems = [
    {
      id: 1,
      name: 'Home',
      href: '/',
    },
    {
      id: 2,
      name: 'Animes',
      href: '/animes',
    },
    {
      id: 3,
      name: 'Categories',
      href: '/categories',
    },
  ]

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      router.push(`/animes/search?text=${searchValue}`)
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  return (
    <div className='navbar bg-purple-950 px-12'>
      <div className='flex-1 h-full'>
        <Link className='lg:w-full lg:h-full' href='/'>
          <Image width={200} height={200} src={logo} alt='Animexplorer logo' />
        </Link>
      </div>
      <div className='hidden lg:flex flex-1'>
        <ul className='flex gap-4'>
          {menuItems.map((menuItem) => (
            <li key={menuItem.id}>
              <Link className='btn btn-ghost' href={menuItem.href}>
                {menuItem.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex-none gap-4'>
        <div className='form-control flex items-end justify-center'>
          <input
            type='text'
            placeholder='Search Anime'
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            value={searchValue}
            className='input input-bordered w-full lg:w-54 md:w-auto'
          />
          <Link href={`/animes/search?text=${searchValue}`} className='absolute mr-4'>
            <AiOutlineSearch size={20} />
          </Link>
        </div>
      </div>
      <div className='lg:hidden pl-12 dropdown dropdown-end'>
        <label tabIndex={0} className='btn btn-ghost'>
          <AiOutlineMenu size={30} />
        </label>
        <ul tabIndex={0} className=' mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'>
          {menuItems.map((menuItem) => (
            <li key={menuItem.id}>
              <Link href={menuItem.href}>{menuItem.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
