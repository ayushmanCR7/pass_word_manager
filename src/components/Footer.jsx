import React from 'react'

const Footer = () => {
  return (
    <div className='flex gap-2 items-center justify-center font-bold w-full bg-slate-800 py-3 bottom-0 text-white'>
        <div>
            &lt;
            Made With
        </div>
      <div>
        <img className='rounded-full w-6 bg-green-300' src="/icons/heart.jpg" alt="" />
      </div>
      <div className='text-green-700'>
        By Ayushman Barick
        &gt;
      </div>
    </div>
  )
}

export default Footer
