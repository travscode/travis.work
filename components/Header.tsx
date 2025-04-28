"use client";

import Link from 'next/link'
import { FC, useState } from 'react'
import Logo from './Logo'
import { cn } from '@/lib/utils'
import ContactModal from './ContactModal'

interface HeaderProps {
  title?: string
  paddingBottom?: number
}

const Header: FC<HeaderProps> = ({ title = 'My Website', paddingBottom = 110 }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <header className="fixed z-10 w-full py-4 px-4 bg-tw-black text-tw-white shadow-md border-b border-tw-grey ">
      <nav className={cn(`mx-auto flex justify-between items-start`)} style={{paddingBottom: paddingBottom * (40/110) + 'px'}}>
        <Link href="/" className="text-xl font-bold uppercase pr-30">
          <Logo />
        </Link>
        
        <div className="flex gap-6 flex-grow justify-between font-object-bold">
          <Link href="#uiux" className="hover:text-t-grey-dark leading-[14px] text-sm">
            /UIUX
          </Link>
          <Link href="#code" className="hover:text-t-grey-dark leading-[14px] text-sm">
            /CODE
          </Link>
          <Link href="#brand" className="hover:text-t-grey-dark leading-[14px] text-sm">
            /BRAND
          </Link>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="hover:text-t-grey-dark leading-[14px] text-sm cursor-pointer"
          >
            /CONTACT
          </button>
          <div className='font-object-thin text-3xl leading-[24px] tracking-[-2px]'>
          20 — 25
          </div>
        </div>
      </nav>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </header>
  )
}

export default Header
