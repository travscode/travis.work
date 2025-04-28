'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import Lenis from 'lenis'
import { cn } from '@/lib/utils';



interface Project {
  label: string;
  year: string;
  imageUrl: string;
  services?: string;
  date?: string;
  client?: string;
  agency?: string;
  link?: string;
  notes?: string;
  other?: string;
  title?: string;
  tags?: string[];
  useH1?: boolean;
  linkLabel?: string;
}

interface ProjectGalleryProps {
  projects: Project[];
  paddingTop: number;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects, paddingTop = 110 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
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


  const handleProjectClick = (index: number) => {
    //setActiveIndex(index);
    if (isMobile) {
      setActiveIndex(index === activeIndex ? -1 : index); // Toggle active state on mobile
      return;
    }

    if (scrollTriggerRef.current) {
      const progress = index / (projects.length - 1);
      const targetScroll = progress * scrollTriggerRef.current.end;
      
      gsap.to(window, {
        duration: 0.5,
        ease: "power2.out",
        scrollTo: {
          y: targetScroll,
          autoKill: false
        }
      });
    }
  };

  useEffect(() => {
    if (isMobile) return; // Skip GSAP setup on mobile
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    const lenis = new Lenis({
      autoRaf: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 769px)", () => {
      if (containerRef.current) {
        const dist = containerRef.current.clientWidth - document.body.clientWidth;



        gsap.to(containerRef.current, {
          x: dist,
          ease: 'none',
          scrollTrigger: {
            trigger: '.pin-height',
            pin: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: self => {
              const closestIndex = Math.round(self.progress * (projects.length - 1));
              setActiveIndex(closestIndex);
            }
          }
        });

        ScrollTrigger.getAll().forEach(trigger => {
            if(!scrollTriggerRef.current) {
              scrollTriggerRef.current = trigger;
            }
        });

      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      lenis.destroy();
    };
  }, [projects.length]);

  return (
    <section className="bg-tw-black">
      {!isMobile ? (
      <div className="pin-height h-[300vh] overflow-hidden">

        

        <div 
          ref={containerRef}
          className="container whitespace-nowrap w-max h-screen flex md:flex-row flex-col relative"
        >
            {/* <div className="
            fixed 
            left-0
          h-[100vh] min-w-[4vw]
          flex flex-col justify-center items-center
          md:items-start md:pl-[150px]
          md:h-[calc(100vh-100px)]
          md:font-object-bold md:text-[100px] md:leading-[100px]
          md:tracking-[0.03em]
          transition-all duration-500
        ">
          <p className="
            text-[100px] leading-[100px]
            md:text-[100px] md:leading-[100px]
            transition-all duration-500
          ">
            sadfasdf
            </p>
        </div> */}

          
          {projects.map((project, index) => (
            <div 
              key={index}
              onClick={() => handleProjectClick(index)}
              style={{ paddingTop: (paddingTop * (115/150)) + 'px'}}
              className={cn(`
                project relative h-full min-w-[4vw] cursor-pointer
                md:border-r border-tw-grey 
                transition-all duration-300
                hover:bg-tw-white hover:text-tw-black
                flex flex-row
                ${index === activeIndex ? 'on min-w-auto bg-tw-black hover:bg-tw-black hover:text-tw-white text-tw-white' : 'text-tw-grey'}
                ${index !== activeIndex ? '[&_.year]:hidden [&_.media]:hidden' : ''}
                ${index === activeIndex ? '[&_.datas]:font-object-bold' : ''}
                ${index !== activeIndex ? '[&_.info]:hidden' : ''}
              `)}
            >
              
                <div className="
                  datas absolute bottom-0 
                  font-object-regular font-medium text-[1.5vw] leading-[2.6vw]
                  -tracking-[0.03em] rotate-[-90deg] origin-[1vw_50%]
                  w-[calc(100vh-2.6vw-100px)] flex flex-row justify-between
                  md:transform-none md:left-auto m-[calc(1vw-2px)]
                  md:text-[1.2vw] 2xl:text-[1vw] transition-all duration-500 pr-3 pl-1.5
                ">
                  <p className="label">{project.label}</p>
                  <p className="year text-[1.25vw]">{project.year}</p>
                </div>
              
              
              <img 
                className="
                  media h-[calc(100%-2.6vw)] w-auto m-[1.3vw_1.3vw_0_4vw]
                  object-cover rounded-[0.6vw] max-w-none inline
                  border border-tw-grey-dark
                "
                src={project.imageUrl}
                alt={project.label}
              />
              <div className="info text-xs h-[calc(100%-2.6vw)] w-auto m-[1.3vw_3.3vw_0_0] flex flex-col gap-4 max-w-[340px] w-[300px] overflow-hidden p-3">
                {project.useH1 ? (
                  <h1 className='info_block w-[300px] font-object-bold text-xl whitespace-normal pb-2'>
                    {project.title || project.label}
                  </h1>
                ) : (
                  <div className='info_block w-[300px] font-object-bold text-xl whitespace-normal pb-2'>
                    {project.title || project.label}
                  </div>
                )}
                {project.services && (
                  <div className='info_block w-[300px]'>
                    <div className='label'>
                      Services
                    </div>
                    <div className='content max-w-[300px] whitespace-normal'>
                      {project.services}
                    </div>
                  </div>
                )}

                {project.date && (
                  <div className='info_block'>
                    <div className='label'>
                      Date
                    </div>
                    <div className='content max-w-[300px] whitespace-normal'>
                      {project.date}
                    </div>
                  </div>
                )}

                {project.client && (
                  <div className='info_block'>
                    <div className='label'>
                      Client
                    </div>
                    <div className='content whitespace-normal'>
                      {project.client}
                    </div>
                  </div>
                )}

                {project.agency && (
                  <div className='info_block'>
                    <div className='label'>
                      Agency
                    </div>
                    <div className='content whitespace-normal'>
                      {project.agency}
                    </div>
                  </div>
                )}

                {project.link && (
                  <div className='info_block'>
                    <div className='label'>
                    {project.linkLabel || 'Link'}
                    </div>
                    <div className='content whitespace-normal underline hover:text-tw-accent'>
                      <a href={project.link} target='_blank' rel='noopener noreferrer'>
                        {project.link}
                      </a>
                    </div>
                  </div>
                )}

                {project.notes && (
                  <div className='info_block pt-4'>
                    <div className='label'>
                      Notes
                    </div>
                    <div className='content w-[300px] max-w-[300px] word-wrap whitespace-normal' dangerouslySetInnerHTML={{ __html: project.notes}}>
                    
                    </div>
                  </div>
                )}

                {project.other && (
                  <div className='info_block pt-4'>
                    
                    <div className='content w-[300px] max-w-[300px] word-wrap whitespace-normal' dangerouslySetInnerHTML={{ __html: project.other}}>
                    
                    </div>
                  </div>
                )}

                {project.tags && ( 
                  <div className='info_block pt-8 whitespace-normal flex flex-wrap gap-2'>
                    {project.tags.map((tag, index) => (
                      <div key={index} className='tag rounded-full border p-1 px-3 inline border-tw-white'>
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      ) : (
        // Mobile view - vertical stacking
        <div className="py-4 px-4">
          <div className="flex flex-col space-y-6">
            {projects.map((project, index) => (
              <div 
                key={index}
                onClick={() => handleProjectClick(index)}
                className={cn(`
                  project relative cursor-pointer border-b border-tw-grey-dark pb-15
                  transition-all duration-300
                  text-tw-white
                `, project.useH1 ? 'pt-18' : 'pt-10')}
              >
                {isMobile && !project.useH1 && (
                <div className="flex justify-between items-center mb-4 hidden">
                  <h3 className="font-object-bold text-lg">{project.label}</h3>
                  <span className="text-sm">{project.year}</span>
                </div>
                )}
                
                  <div className="flex flex-col space-y-4">
                    <img 
                      className="w-full h-[65vh] object-cover rounded-md border border-tw-grey-dark mb-6"
                      src={project.imageUrl}
                      alt={project.label}
                    />
                    
                    <div className="info text-xs flex flex-col gap-4">
                    {project.useH1 ? (
                      <h1 className='info_block w-[300px] font-object-bold text-xl whitespace-normal pb-2'>
                        {project.title || project.label}
                      </h1>
                    ) : (
                      <div className='info_block w-[300px] font-object-bold text-xl whitespace-normal pb-2'>
                        {project.title || project.label}
                      </div>
                    )}
                      
                      {project.services && (
                        <div className='info_block'>
                          <div className='label'>Services</div>
                          <div className='content whitespace-normal'>{project.services}</div>
                        </div>
                      )}
                      
                      {project.date && (
                        <div className='info_block'>
                          <div className='label'>Date</div>
                          <div className='content whitespace-normal'>{project.date}</div>
                        </div>
                      )}
                      
                      {project.client && (
                        <div className='info_block'>
                          <div className='label'>Client</div>
                          <div className='content whitespace-normal'>{project.client}</div>
                        </div>
                      )}
                      
                      {project.agency && (
                        <div className='info_block'>
                          <div className='label'>Agency</div>
                          <div className='content whitespace-normal'>{project.agency}</div>
                        </div>
                      )}
                      
                      {project.link && (
                        <div className='info_block'>
                          <div className='label'>{project.linkLabel || 'Link'}</div>
                          <div className='content whitespace-normal underline hover:text-tw-accent'>
                            <a href={project.link} target='_blank' rel='noopener noreferrer'>
                              {project.link}
                            </a>
                          </div>
                        </div>
                      )}
                      
                      {project.notes && (
                        <div className='info_block pt-4'>
                          <div className='label'>Notes</div>
                          <div className='content whitespace-normal' dangerouslySetInnerHTML={{ __html: project.notes}}></div>
                        </div>
                      )}
                      
                      {project.other && (
                        <div className='info_block pt-4'>
                          <div className='content whitespace-normal' dangerouslySetInnerHTML={{ __html: project.other}}></div>
                        </div>
                      )}
                      
                      {project.tags && ( 
                        <div className='info_block pt-4 whitespace-normal flex flex-wrap gap-2'>
                          {project.tags.map((tag, tagIndex) => (
                            <div key={tagIndex} className='tag rounded-full border p-1 px-3 inline border-tw-white'>
                              {tag}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;