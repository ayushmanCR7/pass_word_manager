import React from 'react'

const Navbar = () => {
  return (
   <nav className='bg-slate-800 text-white'>
    <div className="myconatiner flex justify-between items-center px-4 py-5 h-15">
    <div className="logo font-bold text-white text-2xl">
        <span className='text-green-700'> &lt;</span>
           <span>Pass</span><span className='text-green-700'>OP/&gt;</span>
        </div>
    <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href = "#">Home</a>
            <a className='hover:font-bold' href = "#">Contact</a>
            <a className='hover:font-bold' href = "#">About</a>
            <a className='hover:font-bold' href = "#">Home</a>
            <button className="github rounded-full">
        <img className='rounded-full w-6 cursor-pointer' src="/icons/download.png" alt="" />
       </button>
        </li>   
    </ul>
    </div>
   </nav>
  )
}

export default Navbar
