import React from 'react'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'

interface PageNavigatorProps {
  disabledNext: string
  disabledPrevious: string
  next: () => void
  previous: () => void
}

export default function PageNavigator({ disabledNext, disabledPrevious, next, previous }: PageNavigatorProps) {
  return (
    <div className='flex items-center text-purple-900'>
      <button className='hover:text-purple-950 transition-color' disabled={!disabledPrevious} onClick={previous}>
        <MdNavigateBefore size={50} />
        <span>Prev</span>
      </button>
      <button className='hover:text-purple-950 transition-color' disabled={!disabledNext} onClick={next}>
        <MdNavigateNext size={50} />
        <span>next</span>
      </button>
    </div>
  )
}
