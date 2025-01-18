import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Avatar, AvatarImage } from '../ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'

const Navbar = () => {
  return (
    <nav className='bg-primary-200 flex-between sm:p-large p-small fixed z-50 w-full '>
        <Link href="/" className='flex items-center gap-1'>
            <Image
            alt='Coadjute logo'
            src="/logo.png"
            width={30}
            height={30}
            />
            <div>
                <h1 className='font-montserrat h1-nav'>TRUEDO</h1>
                <p className='float-right mt-[-10px] text-xs'>by Coadjute</p>
            </div>
        </Link>
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>HB</AvatarFallback>
        </Avatar>
    </nav>
  )
}

export default Navbar
