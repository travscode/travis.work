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
    <>
    <header className="sticky top-0 md:fixed z-50 w-full  bg-tw-black/95 backdrop-blur supports-[backdrop-filter]:bg-tw-black/80 py-4 px-4 pr-4 text-tw-white shadow-2xl border-b border-tw-grey-dark ">
      <nav className={cn(`mx-auto flex flex-row md:flex-row justify-between items-center md:items-start`)} style={{paddingBottom: isMobile ? 0 : paddingBottom * (40/110) + 'px'}}>
        <Link href="/" className="text-xl font-bold uppercase pr-30">
          <Logo />
        </Link>
        
        <div className="flex md:gap-6 flex-row md:flex-grow justify-between font-object-bold mt-0 md:mt-0">
          <Link href="#uiux" className="hover:text-t-grey-dark md:leading-[14px] text-sm hidden md:block">
            /UIUX
          </Link>
          <Link href="#code" className="hover:text-t-grey-dark md:leading-[14px] text-sm hidden md:block">
            /CODE
          </Link>
          <Link href="#brand" className="hover:text-t-grey-dark md:leading-[14px] text-sm hidden md:block">
            /BRAND
          </Link>
          {isMobile ? (
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="text-tw-black bg-tw-white rounded-full p-3 px-5 leading-[10px] md:leading-[14px] text-sm cursor-pointer"
            >
              <span className='hidden md:inline'>/</span>CONTACT
            </button>
          ) : (
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="hover:text-tw-grey-dark leading-[8px] md:leading-[14px] text-sm cursor-pointer"
            >
              <span className='hidden md:inline'>/</span>CONTACT
            </button>
          )}
          <div className='hidden md:block font-object-thin text-3xl leading-[24px] tracking-[-2px]'>
          20 — 25
          </div>
        </div>
      </nav>

      
    </header>

    <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  )
}

export default Header
