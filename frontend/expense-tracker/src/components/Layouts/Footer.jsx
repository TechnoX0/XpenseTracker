import React from 'react'
import logo from '../../assets/images/Logo&Title.png'

const Footer = () => {
  return (
    <footer className='bg-background text-text flex justify-center p-[1.5%] gap-2 w-full font-sans'>
        <p>Copyright &copy; 2025</p>
        <img src={ logo } alt='Xpense' className='h-[28px]'/>
        <p>| All Rights Reserved</p>
    </footer>
  )
}

export default Footer
