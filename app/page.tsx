import Header from "@/components/Header";
import ProjectGallery from "@/components/ProjectGallery";
import { projects } from "@/data/projects";

const paddingTop = 150;
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-t-black font-object-regular">
      <Header title="Travis Weerts Design" />
      <main className="flex-grow">
        <ProjectGallery projects={projects} paddingTop={paddingTop} />
      </main>
    </div>
  );
}
