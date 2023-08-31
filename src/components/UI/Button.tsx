import { MouseEvent, ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  outline?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export default function Button({ children, outline = false, onClick }: ButtonProps) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    onClick && onClick(event)
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`${
          outline ? 'border-2 border-purple-900 hover:bg-purple-900' : 'bg-purple-900 hover:bg-purple-950'
        } rounded-md px-8 py-4 cursor-pointer transition-colors`}
      >
        {children}
      </button>
    </>
  )
}
