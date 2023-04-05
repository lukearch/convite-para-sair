'use client'
import Image from 'next/image'
import { Outfit } from 'next/font/google'
import { SyntheticEvent, useState } from 'react'

const outfit = Outfit({
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export default function Home() {
  const [image, setImage] = useState(1)
  const moveButtonForAnyLocationOfTheScreen = (
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    const button = e.currentTarget
    const bounds = button.getBoundingClientRect()
    const { innerWidth, innerHeight } = window

    const getRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
    }

    const range = {
      x: getRange(0, innerWidth - bounds.width),
      y: getRange(0, innerHeight - bounds.height),
    }

    if (range.y + bounds.height > innerHeight) {
      range.y = innerHeight - bounds.height
    }

    if (range.x + bounds.width > innerWidth) {
      range.x = innerWidth - bounds.width
    }

    button.style.position = 'absolute'
    button.style.left = `${range.x}px`
    button.style.top = `${range.y}px`

    setImage((prev) => (prev === 10 ? 10 : prev + 1))
  }

  const accept = () => {
    setImage(0)

    alert('Obrigado por aceitar! :D, me avisa no zap')
  }

  return (
    <div className='relative w-screen h-screen'>
      <div className='bg-red-300 absolute top-0 left-0 w-full h-full -z-10'></div>
      <Image
        fill
        src='/bg.jpg'
        alt='bg'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.5,
          zIndex: -1,
        }}
      />
      <div className='flex items-center justify-center w-full h-full flex-col container mx-auto'>
        <div className='mb-8  border-2 border-red-500 overflow-hidden rounded-md'>
          <Image src={`/${image}.svg`} width={100} height={120} alt='' />
        </div>
        <h1
          style={outfit.style}
          className='text-2xl font-bold text-black text-center mb-8'
        >
          Quer sair comigo esse fim de semana?
        </h1>
        <div className='flex gap-5'>
          <button
            style={outfit.style}
            className='bg-red-500 py-3 px-6 text-white font-medium rounded-md'
            onClick={accept}
          >
            Sim
          </button>
          <button
            style={outfit.style}
            className='bg-red-500 py-3 px-6 text-white font-medium rounded-md transition-all duration-300 ease-in-out top-auto left-auto'
            onClick={moveButtonForAnyLocationOfTheScreen}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  )
}
