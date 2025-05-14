
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Github, ExternalLink } from 'lucide-react';

interface ProjectsProps {
  theme: 'theme1' | 'theme2';
}

const projects = [
  {
    id: 1,
    title: "Social Media Dashboard",
    description: "A real-time analytics dashboard with interactive charts and data visualization.",
    fullDescription: "This social media dashboard offers a unified view of multiple social media platforms, enabling efficient monitoring, scheduling, and performance tracking. Built with React and Chart.js, it features real-time insights, scheduled post management, and audience engagement analytics. The responsive and user-friendly interface supports seamless content planning and reporting.",
    tags: ["React", "D3.js", "Tailwind CSS","chart.js"],
    imageUrl: "https://cdn.dribbble.com/users/2482217/screenshots/19892072/media/db27d16fd9d0177ed0c43e7ef4a0e03a.png",
    features: ["Multi-platform integration","Data export","Post scheduling","Engagement analytics","Content calendar","Follower growth tracking"],
    technologies: "Built using React for the UI, Chart.js for data visualization, and REST APIs for social media integration. The backend is powered by Node.js with a MongoDB database.",
    githubUrl: "https://github.com/VT-2004/shimmer-social-pulse-view",
    liveUrl: "https://preview--shimmer-social-pulse-view.lovable.app/"
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "Full-featured online shopping experience with product filtering and checkout.",
    fullDescription: "This comprehensive e-commerce platform delivers a seamless shopping experience from browsing to checkout. It includes advanced product filtering, user accounts, wishlist functionality, and a secure payment system. The admin dashboard provides inventory management, order tracking, and customer insights.",
    tags: ["Next.js", "GraphQL", "Stripe"],
    imageUrl: "https://slidebazaar.com/wp-content/uploads/2022/10/ecommerce-powerpoint-template.jpg",
    features: ["Product filtering", "User accounts", "Secure checkout", "Order tracking"],
    technologies: "Built with Next.js for frontend and SSR, GraphQL for efficient data fetching, and Stripe for payment processing. The platform uses PostgreSQL for data storage and AWS S3 for media files.",
    githubUrl: "https://github.com/VT-2004/shop-luv-verse",
    liveUrl: "https://preview--shop-luv-verse.lovable.app/"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A app for managing the tasks and projects",
    fullDescription: "This task management app streamlines team collaboration and project tracking through an intuitive interface with real-time task updates and progress monitoring. Built with React and Redux, it features drag-and-drop task boards, deadline reminders, and team assignment capabilities. Its responsive design ensures smooth usage across all devices.",
    tags: ["Three.js", "Mongo DB","React Three Fiber", "WebGL"],
    imageUrl: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/696d54120636171.60b61b2daa2b2.jpg",
    features: ["Task creation and assignment","Progress tracking","Priority tagging", "Drag-and-drop task boards", "Real-time collaboration", "Deadline reminders"],
    technologies: "Built using React for the UI, Redux for state management, and Socket.IO for real-time updates. The backend is powered by Node.js and Express with MongoDB for data storage.",
    githubUrl: "https://github.com/VT-2004/taskbloom-web-love",
    liveUrl: "https://preview-7bd152d8--taskbloom-web-love.lovable.app/"
  },
  {
    id: 4,
    title: "Object Detection Model",
    description: "Object Detection App for Classifying objects into defferent classes",
    fullDescription: "This intelligent object detection system identifies and localizes multiple objects within images in real-time. It leverages Hugging Face's state-of-the-art Transformer-based models, providing fast and accurate results for applications like surveillance, retail analytics, and autonomous systems. The model is easy to fine-tune for custom datasets and integrates seamlessly into various platforms.",
    tags: ["React Native", "Firebase", "Hugging Face","NLP"],
    imageUrl: "https://codedamn-blog.s3.amazonaws.com/wp-content/uploads/2022/10/27094519/CodeDamn-Creatives-4.png",
    features: ["Real-time object detection", "Bounding box localization","REST API and UI integration","Class labeling", "Model fine-tuning for custom datasets"],
    technologies: "Built with React Native for cross-platform compatibility, Firebase for backend services, and integration with HealthKit/Google Fit for health data. Uses TensorFlow Lite for exercise form detection.",
    githubUrl: "https://github.com/VT-2004/picture-seer-object-find",
    liveUrl: "https://preview--picture-seer-object-find.lovable.app/"
  },
  {
    id: 5,
    title: "Image Generation Model",
    description: "An intelligent chatbot that provides customer support and engagement.",
    fullDescription: "This advanced image generation system creates high-quality, realistic visuals from text prompts using powerful generative AI models. It harnesses Hugging Face's cutting-edge diffusion models to enable creative content generation for art, advertising, game design, and more. The system supports prompt tuning, style conditioning, and easy deployment, making it ideal for both developers and designers.",
    tags: ["React", "Node.js", "NLP","Hugging Face"],
    imageUrl: "https://images.wondershare.com/facengine_img/blog/ai-portrait/evolution-of-ai-self-portrait-generators-10.jpg",
    features: ["Style-based customization", "Text-to-image generation", "API integration for apps and websites","High-resolution output", "Prompt engineering support"],
    technologies: "Built with Python and TensorFlow for machine learning, using NLP techniques for understanding user intent. Deployed on cloud platforms with scalable architecture.",
    githubUrl: "https://github.com/VT-2004/visual-audio-alchemy",
    liveUrl: "https://preview--visual-audio-alchemy.lovable.app/"
  },
  {
    id: 6,
    title: "Recipe Finder",
    description: "A web app For People interested in cooking and Food ",
    fullDescription: "This intelligent recipe finder helps users discover meal ideas based on available ingredients, dietary preferences, and cuisine types. By leveraging keyword matching, filtering logic, and a curated recipe database, it provides quick and accurate recipe suggestions. Designed for home cooks and food enthusiasts, it simplifies meal planning and enhances the cooking experience.",
    tags: ["React", "Node.js", "MongoDB"],
    imageUrl: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/52bb18119670937.60a2bd1f5ba36.jpg",
    features: ["Cuisine and dietary filters", "Ingredient-based recipe search", "Step-by-step cooking instructions", "Favorites and bookmarking"],
    technologies: "Built with React for the frontend and Node.js with Express for the backend. Uses a MongoDB database to store recipes and user data. Includes integration with a speech-to-text API for voice queries and implements custom filtering algorithms for search functionality.",
    githubUrl: "https://github.com/VT-2004/ingredient-alchemy-mobile",
    liveUrl: "https://preview-799d4771--ingredient-alchemy-mobile.lovable.app/"
  }
];

const Projects: React.FC<ProjectsProps> = ({ theme }) => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleViewProject = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setPreviewUrl(null); // Reset preview URL when opening new project
    setSheetOpen(true);
  };

  const handlePreviewClick = (url: string) => {
    setPreviewUrl(url);
  };

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto">
        <h2 className={`text-4xl font-bold mb-12 text-center ${
          theme === 'theme1' ? 'text-theme1-accent' : 'text-theme2-accent'
        }`}>
          My Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className={`overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                theme === 'theme1' 
                  ? 'bg-white/10 border-theme1-accent/30 backdrop-blur-sm' 
                  : 'bg-white/10 border-theme2-accent/30 backdrop-blur-sm'
              }`}
            >
              <CardContent className="p-0">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${
                    theme === 'theme1' ? 'text-theme1-secondary' : 'text-theme2-secondary'
                  }`}>
                    {project.title}
                  </h3>
                  <p className="text-white/80 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className={`px-3 py-1 text-xs rounded-full ${
                          theme === 'theme1' 
                            ? 'bg-theme1-primary/30 text-theme1-secondary' 
                            : 'bg-theme2-primary/30 text-theme2-secondary'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className={`border-t ${
                theme === 'theme1' ? 'border-theme1-accent/20' : 'border-theme2-accent/20'
              } p-4`}>
                <button 
                  onClick={() => handleViewProject(project)}
                  className={`text-sm font-medium ${
                    theme === 'theme1' ? 'text-theme1-accent' : 'text-theme2-accent'
                  } hover:underline`}
                >
                  View Project →
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className={`w-full md:max-w-xl overflow-y-auto ${
          theme === 'theme1' 
            ? 'bg-gradient-to-br from-[#1A1F2C] to-[#2C1F47] border-theme1-accent/30' 
            : 'bg-gradient-to-br from-[#2D1B1B] to-[#422E10] border-theme2-accent/30'
        }`}>
          {selectedProject && (
            <>
              <SheetHeader>
                <SheetTitle className={`text-2xl ${
                  theme === 'theme1' ? 'text-theme1-secondary' : 'text-theme2-secondary'
                }`}>
                  {selectedProject.title}
                </SheetTitle>
              </SheetHeader>
              
              <div className="mt-6">
                    {previewUrl ? (
                      <div className="mb-6 flex flex-col items-center">
                        <div className="relative w-[320px] h-[640px] rounded-3xl overflow-hidden shadow-lg bg-gray-200">
                          <iframe 
                            src={previewUrl} 
                            className="absolute top-0 left-0 w-full h-full border-0 rounded-3xl" 
                            title={`Live preview of ${selectedProject.title}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <div className="flex justify-between w-full mt-4 gap-4">
                          <Button 
                            onClick={() => setPreviewUrl(null)}
                            className={`flex-1 flex items-center justify-center gap-2 ${
                              theme === 'theme1' 
                                ? 'bg-theme1-primary hover:bg-theme1-accent text-white' 
                                : 'bg-theme2-primary hover:bg-theme2-accent text-white'
                            }`}
                          >
                            <ChevronLeft size={16} /> Back to Projects
                          </Button>
                          <a
                            href={previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center gap-2 text-center no-underline rounded-md px-4 py-2 ${
                              theme === 'theme1'
                                ? 'bg-theme1-accent hover:bg-theme1-accent/90 text-white'
                                : 'bg-theme2-accent hover:bg-theme2-accent/90 text-white'
                            }`}
                          >
                            <ExternalLink size={18} />
                            Open Live Preview
                          </a>
                        </div>
                      </div>
                    ) : (
                      <>
                        <img 
                          src={selectedProject.imageUrl} 
                          alt={selectedProject.title} 
                          className="w-full h-56 object-cover rounded-lg mb-6"
                        />
                        
                        <div className="flex gap-4 mb-6">
                          <a 
                            href={selectedProject.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button 
                              className={`w-full flex justify-center items-center gap-2 ${
                                theme === 'theme1' 
                                  ? 'bg-theme1-primary hover:bg-theme1-primary/90' 
                                  : 'bg-theme2-primary hover:bg-theme2-primary/90'
                              }`}
                            >
                              <Github size={18} />
                              GitHub Repo
                            </Button>
                          </a>
                          <Button 
                            onClick={() => handlePreviewClick(selectedProject.liveUrl)}
                            className={`flex-1 flex justify-center items-center gap-2 ${
                              theme === 'theme1' 
                                ? 'bg-theme1-accent hover:bg-theme1-accent/90' 
                                : 'bg-theme2-accent hover:bg-theme2-accent/90'
                            }`}
                          >
                            <ExternalLink size={18} />
                            Live Preview
                          </Button>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className={`text-lg font-medium mb-2 ${
                              theme === 'theme1' ? 'text-theme1-accent' : 'text-theme2-accent'
                            }`}>
                              Overview
                            </h3>
                            <p className="text-white/80">{selectedProject.fullDescription}</p>
                          </div>
                          
                          <div>
                            <h3 className={`text-lg font-medium mb-2 ${
                              theme === 'theme1' ? 'text-theme1-accent' : 'text-theme2-accent'
                            }`}>
                              Key Features
                            </h3>
                            <ul className="list-disc pl-5 text-white/80">
                              {selectedProject.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h3 className={`text-lg font-medium mb-2 ${
                              theme === 'theme1' ? 'text-theme1-accent' : 'text-theme2-accent'
                            }`}>
                              Technologies Used
                            </h3>
                            <p className="text-white/80">{selectedProject.technologies}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-6">
                            {selectedProject.tags.map((tag, index) => (
                              <span 
                                key={index}
                                className={`px-3 py-1 text-xs rounded-full ${
                                  theme === 'theme1' 
                                    ? 'bg-theme1-primary/30 text-theme1-secondary' 
                                    : 'bg-theme2-primary/30 text-theme2-secondary'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          {/* Back button moved to bottom of content */}
                          <div className="pt-6 pb-4 flex gap-4">
                            <Button 
                              onClick={() => setSheetOpen(false)}
                              className={`flex-1 flex items-center gap-2 justify-center ${
                                theme === 'theme1' 
                                  ? 'bg-theme1-primary hover:bg-theme1-accent text-white' 
                                  : 'bg-theme2-primary hover:bg-theme2-accent text-white'
                              }`}
                            >
                              <ChevronLeft size={16} /> Back to Projects
                            </Button>
                            <a
                              href={selectedProject.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex-1 flex items-center gap-2 justify-center text-center no-underline rounded-md px-4 py-2 ${
                                theme === 'theme1'
                                  ? 'bg-theme1-accent hover:bg-theme1-accent/90 text-white'
                                  : 'bg-theme2-accent hover:bg-theme2-accent/90 text-white'
                              }`}
                            >
                              <ExternalLink size={18} />
                              Open Live Preview
                            </a>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>
        </section>
      );
    };
    
    export default Projects;
