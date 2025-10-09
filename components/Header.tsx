"use client";

import Link from "next/link";
import Image from "next/image";
import { FC, useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import ContactModal from "./ContactModal";
import { ParticleEffect } from "./ParticleEffect";
import { services } from "@/data/services";

interface HeaderProps {
  title?: string;
  paddingBottom?: number;
}

const Header: FC<HeaderProps> = ({
  title = "My Website",
  paddingBottom = 110,
}) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const servicesLinkRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (servicesLinkRef.current) {
      const rect = servicesLinkRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: 0,
        left: rect.left - 16, // -16px to match the -left-4 offset
      });
    }

    if (isServicesDropdownOpen && servicesLinkRef.current) {
      const rect = servicesLinkRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: 0,
        left: rect.left - 16, // -16px to match the -left-4 offset
      });
    }
  }, [isServicesDropdownOpen]);

  const handleMouseEnter = (e?: React.MouseEvent) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsClosing(false);
    setShouldRender(true); // Show component immediately
    setIsServicesDropdownOpen(true);
  };

  const handleMouseLeave = (e?: React.MouseEvent) => {
    setIsClosing(true);
    timeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false);
      setIsClosing(false);
      setShouldRender(false); // Hide component after animation
    }, 300);
  };

  const servicesForDropdown = Object.values(services).filter(
    (service) => service.showInServices
  );

  return (
    <>
      <header className="sticky top-0 md:fixed z-[99] w-full  bg-tw-black/95 backdrop-blur supports-[backdrop-filter]:bg-tw-black/80 py-4 px-4 pr-4 text-tw-white shadow-2xl border-b border-tw-grey-dark ">
        <nav
          className={cn(
            `mx-auto flex flex-row md:flex-row justify-between items-center`
          )}
          // style={{
          //   paddingBottom: isMobile ? 0 : paddingBottom * (40 / 110) + "px",
          // }}
        >
          <Link
            href="/"
            className="text-xl font-bold uppercase md:pr-30 md:w-[300px]"
          >
            <Logo />
          </Link>

          <div className="flex md:gap-10 flex-row md:flex-grow justify-center font-object-bold mt-0 md:mt-0">
            {/* Services Dropdown */}
            <Link
              href="/"
              className=" md:leading-[14px] text-sm hidden md:block hover:text-tw-grey-dark"
              onClick={() => setIsContactModalOpen(false)}
              onMouseEnter={handleMouseLeave}
            >
              WORK
            </Link>

            {/* <div
              ref={servicesLinkRef}
              className="relative hidden md:block md:leading-[14px]"
              onMouseEnter={handleMouseEnter}
              onClick={handleMouseLeave}
              // onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                className="hover:text-t-grey-dark md:leading-[14px] text-sm"
              >
                SERVICES +
              </Link>
            </div> */}

            {isMobile ? (
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="text-tw-black bg-tw-white rounded-full p-3 px-5 leading-[10px] md:leading-[14px] text-sm cursor-pointer"
              >
                CONTACT
              </button>
            ) : (
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="hover:text-tw-grey-dark leading-[8px] md:leading-[14px] text-sm cursor-pointer"
                onMouseEnter={handleMouseLeave}
              >
                CONTACT
              </button>
            )}
          </div>
          <div className="hidden md:block font-object-thin text-3xl leading-[24px] tracking-[-2px]  md:w-[300px] text-right">
            20 — 25
          </div>
        </nav>
      </header>

      {/* Services Dropdown Menu - Outside header container */}
      {shouldRender && (
        <>
          <div
            className={cn(
              "fixed inset-0 bg-tw-black z-[59]",
              isClosing
                ? "animate-out fade-out duration-300"
                : "animate-in fade-in duration-700"
            )}
          >
            <ParticleEffect />
          </div>
          <div
            className={cn(
              "fixed z-[60] w-200 shadow-2xl bg-tw-black/50 backdrop-blur h-dvh",
              isClosing
                ? "animate-out  fade-out duration-500"
                : "animate-in  fade-in duration-500"
            )}
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left - 300,
              visibility: isClosing ? "hidden" : "visible", // Hide immediately when closing starts
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="">
              <div className="grid grid-cols-3 gap-1 p-1 pt-[80px]">
                {servicesForDropdown.map((service, index) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className={cn(
                      "block text-sm hover:bg-tw-grey-dark/20 hover:text-t-accent transition-all duration-200 text-tw-white",
                      isClosing
                        ? "animate-out slide-out-to-left-6 fade-out"
                        : "animate-in slide-in-from-left-6 fade-in"
                    )}
                    style={{
                      animationDuration: "400ms",
                      animationDelay: isClosing
                        ? `${(servicesForDropdown.length - index - 1) * 50}ms`
                        : `${200 + index * 50}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <>
                      <Image
                        src={`/assets/media/${service.images.square}`}
                        alt={service.tag}
                        width={200}
                        height={200}
                        className="w-full"
                      />
                      {/* <h2 className="font-object-bold text-xl">{service.tag}</h2>
                    <div className="text-xs text-t-grey-dark font-object-thin">
                      From {service.pricing.starting}
                    </div> */}
                    </>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
};

export default Header;
