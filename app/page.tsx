import Header from "@/components/Header";
import ProjectGallery from "@/components/ProjectGallery";
import { projects } from "@/data/projects";
import Image from "next/image";

const paddingTop = 150;
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-t-black font-object-regular">
      <Header title="Travis Weerts Design" />
      <main className="flex-grow">
        <ProjectGallery projects={projects} paddingTop={paddingTop} />

        <div itemScope itemType="https://schema.org/Person" className="max-w-2xl mx-auto text-center hidden">
          <Image
            src="/cover_image.jpg"
            alt="Travis Weerts"
            itemProp="image"
            width={200}
            height={200}
            className="rounded-full w-32 h-32 mx-auto mb-4"
          />

          <h1 itemProp="name" className="text-3xl font-bold mb-2">Travis Weerts</h1>

          <p className="text-lg mb-2">
            <span itemProp="jobTitle">Creative Developer & Designer</span> at
            <span itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
              {" "}
              <span itemProp="name">IOOKI Labs</span>
            </span>
          </p>

          <p itemProp="description" className="mb-4">
            Award-winning Perth-based creative developer and designer creating next-gen experiences at the intersection of design, code, and AI. Featured by Apple. Trusted by brands like Google, UN, and Wendy's.
          </p>

          <a href="https://travis.work" itemProp="url" className="text-blue-500 underline">
            https://travis.work
          </a>

          <ul className="flex justify-center gap-4 mt-4">
            <li>
              <a href="https://linkedin.com/in/travisweerts" itemProp="sameAs" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/travisweerts" itemProp="sameAs" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://instagram.com/tr_____av" itemProp="sameAs" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
