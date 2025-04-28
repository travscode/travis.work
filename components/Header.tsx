"use client";

import Link from 'next/link'
import { FC, useState, useEffect } from 'react'
import Logo from './Logo'
import { cn } from '@/lib/utils'
import ContactModal from './ContactModal'

interface HeaderProps {
  title?: string
  paddingBottom?: number
}

const Header: FC<HeaderProps> = ({ title = 'My Website', paddingBottom = 110 }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <header className="fixed z-10 w-full py-4 px-4 bg-tw-black text-tw-white shadow-md border-b border-tw-grey ">
      <nav className={cn(`mx-auto flex flex-row md:flex-row justify-between items-start`)} style={{paddingBottom: isMobile ? 0 : paddingBottom * (40/110) + 'px'}}>
        <Link href="/" className="text-xl font-bold uppercase pr-30">
          <Logo />
        </Link>
        
        <div className="flex md:gap-6 flex-row md:flex-grow justify-between font-object-bold mt-4 md:mt-0">
          <Link href="#uiux" className="hover:text-t-grey-dark md:leading-[14px] text-sm hidden md:block">
            /UIUX
          </Link>
          <Link href="#code" className="hover:text-t-grey-dark md:leading-[14px] text-sm hidden md:block">
            /CODE
          </Link>
          <Link href="#brand" className="hover:text-t-grey-dark md:leading-[14px] text-sm hidden md:block">
            /BRAND
          </Link>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="hover:text-t-grey-dark leading-[8px] md:leading-[14px] text-sm cursor-pointer"
          >
            <span className='hidden md:inline'>/</span>CONTACT
          </button>
          <div className='hidden md:block font-object-thin text-3xl leading-[24px] tracking-[-2px]'>
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
