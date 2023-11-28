import Image from 'next/image'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-white p-3 text-4xl'>Wellcome,</h1><span className='bg-gray-300 rounded p-2 text-white'>Home</span>
    </div>
  )
}
