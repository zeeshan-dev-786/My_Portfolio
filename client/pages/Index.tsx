import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  ExternalLink,
  ChevronDown,
  ArrowRight,
  Code2,
  Brain,
  Zap,
  Award,
  Book,
  Check,
} from 'lucide-react';

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [experienceTab, setExperienceTab] = useState('overview');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);

      // Scroll spy logic to dynamically update active navbar section
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPositionWithOffset = window.scrollY + 200; // Trigger threshold

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPositionWithOffset >= top && scrollPositionWithOffset < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadResume = () => {
    const resumeUrl = 'https://drive.google.com/uc?export=download&id=1jv2j3h2KQSoUENW7ayi-oxLa3Uz0ntWu';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Muhammad_Zeeshan_Muzaffar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || 
        serviceId === 'your_service_id_here' || 
        templateId === 'your_template_id_here' || 
        publicKey === 'your_public_key_here') {
      toast.error('Email sending is not configured', {
        description: 'Please set up your EmailJS keys in the environment variables.',
        duration: 4000,
      });
      return;
    }

    try {
      setFormSubmitted(true);

      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
      };

      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);

      if (result.status === 200) {
        toast.success('Message Sent Successfully! ✅', {
          description: 'Thank you for reaching out. I\'ll respond to your message soon.',
          duration: 4000,
        });

        // Reset form
        if (formRef.current) formRef.current.reset();
      } else {
        toast.error('Failed to send message', {
          description: 'Please try again later.',
          duration: 4000,
        });
        setFormSubmitted(false);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Error sending message', {
        description: 'Please try again or contact me directly at mmuzaffar533@gmail.com',
        duration: 4000,
      });
      setFormSubmitted(false);
    }

    // Reset button state after delay
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const skills = {
    programming: ['Python', 'Java', 'C++'],
    machinelearning: ['Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    deeplearning: ['TensorFlow', 'PyTorch', 'OpenCV', 'CNNs', 'RNNs', 'Transformers'],
    databases: ['MySQL', 'Firebase', 'Supabase'],
    tools: ['Git', 'GitHub', 'Figma', 'WordPress'],
    professional: ['Teamwork', 'Time Management', 'Problem Solving', 'Project Management'],
  };

  const projects = [
    {
      title: 'Image Captioning System',
      description: 'Developed an image captioning system using ResNet for feature extraction and Transformer decoder with attention mechanisms.',
      technologies: ['ResNet', 'Transformer', 'PyTorch', 'Python'],
      category: 'AI/ML',
      github: '#',
      status: 'In Development',
    },
    {
      title: 'Human Action Recognition System',
      description: 'Built a deep learning system for classifying human activities from video sequences using convolutional neural networks.',
      technologies: ['CNN', 'TensorFlow', 'OpenCV', 'Python'],
      category: 'AI/ML',
      github: '#',
      status: 'In Development',
    },
    {
      title: 'Alert-Based School Transport Monitoring',
      description: 'IoT-powered solution with face recognition, GPS tracking, and real-time safety alerts for student security.',
      technologies: ['ESP32-CAM', 'GPS', 'MQTT', 'Supabase'],
      category: 'IoT',
      github: 'https://github.com/zeeshan-dev-786/Alert-Based-School-Transportation-System',
    },
    {
      title: 'MediLink - Pharmacy Management',
      description: 'Platform for inventory tracking, medicine reservations, and AI-powered chatbot for healthcare accessibility.',
      technologies: ['TypeScript', 'Firebase', 'Vercel'],
      category: 'Full-Stack',
      github: 'https://github.com/zeeshan-dev-786/MediLink',
      demo: 'https://medi-link-psi.vercel.app/',
    },
    {
      title: 'Cricket Score Prediction',
      description: 'Machine learning models predicting cricket scores and match outcomes with interactive visualization.',
      technologies: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit'],
      category: 'AI/ML',
      github: 'https://github.com/zeeshan-dev-786/cricket-predictor',
      demo: 'https://cricket-predictor.streamlit.app/',
    },
    {
      title: 'CASE Tool UI/UX Design',
      description: 'Designed intuitive UI/UX prototypes focusing on usability, workflow optimization, and user experience.',
      technologies: ['Figma'],
      category: 'UI/UX',
      github: 'https://www.figma.com/design/TBSkPeUP41umTE5fmfjZm2/Login-pages-v1----Carey--Community-?node-id=364-1925',
    },
  ];

  const SkillBadge = ({ skill }: { skill: string }) => (
    <motion.div 
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-500/50 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
    >
      <span className="text-sm font-medium text-gray-300 hover:text-cyan-300 transition-colors">
        {skill}
      </span>
    </motion.div>
  );

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="dark min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 max-w-5xl mx-auto rounded-full border border-gray-800/80 bg-gray-950/60 backdrop-blur-md shadow-xl ${
        scrollPosition > 50 ? 'py-2 px-6' : 'py-3 px-8'
      }`}>
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-md shadow-cyan-500/20">
              <Code2 size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Zeeshan
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 bg-gray-900/40 p-1 rounded-full border border-gray-800/50">
            {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => {
              const isActive = activeSection === item;
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="md:hidden absolute top-16 left-0 right-0 p-4 rounded-3xl border border-gray-800/80 bg-gray-950/90 backdrop-blur-lg space-y-1 shadow-2xl"
            >
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-all capitalize text-sm font-medium ${
                    activeSection === item
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white'
                      : 'text-gray-400 hover:bg-gray-900/50 hover:text-gray-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-24 px-4 relative overflow-hidden">
        {/* Glowing Ambient Orbs */}
        <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] opacity-40 animate-float-slow pointer-events-none"></div>
        <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] opacity-40 animate-float pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] opacity-30 animate-float-delayed pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <div className="mb-8">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 p-1 mb-8 shadow-xl hover:shadow-cyan-500/30 transition-all duration-300"
            >
              <div className="w-full h-full rounded-xl bg-gray-955 flex items-center justify-center">
                <div className="text-6xl font-bold text-white drop-shadow-lg">
                  MZ
                </div>
              </div>
            </motion.div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Building Intelligent Software Solutions
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Software Engineering student at NUST with strong interests in Artificial Intelligence, Machine Learning, and IoT systems. Passionate about building innovative solutions that solve real-world problems.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-primary group flex items-center gap-2"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleDownloadResume}
              className="btn-secondary flex items-center gap-2"
            >
              <Download size={18} />
              Download Resume
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-secondary"
            >
              Contact Me
            </button>
          </div>

          <div className="flex justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.15, y: -2 }}
              href="https://github.com/zeeshan-dev-786"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-gray-900/40 border border-gray-800/80 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300 shadow-md"
              title="GitHub"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15, y: -2 }}
              href="https://linkedin.com/in/muhammadzeeshanmuzaffar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-gray-900/40 border border-gray-800/80 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300 shadow-md"
              title="LinkedIn"
            >
              <Linkedin size={24} />
            </motion.a>
          </div>

          <div className="mt-12 animate-bounce">
            <ChevronDown size={32} className="mx-auto text-cyan-400/80" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-900/10">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
          >
            About <span className="text-primary bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Me</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <div className="w-full rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-6 flex flex-col justify-center hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
                <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                  I am a Software Engineering student at the Military College of Signals, NUST, maintaining a CGPA of 3.73/4.00. My interests lie in Artificial Intelligence, Machine Learning, Intelligent Systems, and IoT.
                </p>
                <p className="text-base md:text-lg text-gray-200 leading-relaxed mt-4">
                  I enjoy transforming complex problems into practical software solutions and continuously expanding my technical expertise through challenging projects and hands-on learning.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 md:space-y-6 order-1 md:order-2"
            >
              <div className="p-4 md:p-6 rounded-xl bg-gray-900/40 border border-gray-800/80 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 transform hover:scale-[1.02]">
                <div className="flex items-start gap-3 md:gap-4">
                  <Book className="text-cyan-400 mt-1 flex-shrink-0 md:size-6" size={20} />
                  <div className="min-w-0">
                    <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">Education</h3>
                    <p className="text-gray-300 text-sm md:text-base">Bachelor of Software Engineering (BE-SE)</p>
                    <p className="text-gray-400 text-xs md:text-sm">NUST (2023 – 2027) | CGPA: 3.73/4.00</p>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6 rounded-xl bg-gray-900/40 border border-gray-800/80 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 transform hover:scale-[1.02]">
                <div className="flex items-start gap-3 md:gap-4">
                  <Brain className="text-cyan-400 mt-1 flex-shrink-0 md:size-6" size={20} />
                  <div className="min-w-0">
                    <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">Specialization</h3>
                    <p className="text-gray-300 text-sm md:text-base">AI, Machine Learning & IoT Systems</p>
                    <p className="text-gray-400 text-xs md:text-sm">Data Science & System Development</p>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6 rounded-xl bg-gray-900/40 border border-gray-800/80 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 transform hover:scale-[1.02]">
                <div className="flex items-start gap-3 md:gap-4">
                  <Award className="text-cyan-400 mt-1 flex-shrink-0 md:size-6" size={20} />
                  <div className="min-w-0">
                    <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">Achievement</h3>
                    <p className="text-gray-300 text-sm md:text-base">Excellence in Academics & Innovation</p>
                    <p className="text-gray-400 text-xs md:text-sm">Multiple AI & ML projects deployed</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
          >
            Technical <span className="text-primary bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Skills</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, skillList], idx) => {
              const getCategoryName = (cat: string) => {
                const categoryNames: { [key: string]: string } = {
                  programming: 'Programming Languages',
                  machinelearning: 'Machine Learning',
                  deeplearning: 'Deep Learning',
                  databases: 'Databases',
                  tools: 'Tools & Technologies',
                  professional: 'Professional Skills',
                };
                return categoryNames[cat] || cat;
              };
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  key={category} 
                  className="bg-gray-900/30 p-6 rounded-2xl border border-gray-800/80 hover:border-cyan-500/20 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-4 text-cyan-400">
                    {getCategoryName(category)}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skillList.map((skill) => (
                      <SkillBadge key={skill} skill={skill} />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-900/10">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-8 text-center"
          >
            Featured <span className="text-primary bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
          </motion.h2>

          {/* Project Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['all', 'AI/ML', 'IoT', 'Full-Stack', 'UI/UX'].map((category) => {
              const isActive = selectedCategory.toLowerCase() === category.toLowerCase();
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-lg shadow-cyan-500/20'
                      : 'bg-gray-900/40 text-gray-400 hover:text-gray-200 border-gray-800'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <motion.div 
            layout 
            className="grid md:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={project.title}
                  className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/5 flex flex-col h-full"
                >
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2.5 py-1 rounded-md bg-gray-950/60 border border-gray-800/50 text-gray-400 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3 flex-wrap">
                        {!project.status && (
                          <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-fit px-3 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold shadow-md shadow-cyan-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {project.github.includes('figma') ? 'View Design' : 'View Code'}
                            {project.github.includes('figma') ? <ExternalLink size={14} /> : <Github size={14} />}
                          </motion.a>
                        )}
                        {project.demo && (
                          <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-fit px-3 py-2.5 rounded-xl bg-gray-800 text-white text-sm font-semibold border border-gray-700/50 hover:bg-gray-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            Live Demo
                            <ExternalLink size={14} />
                          </motion.a>
                        )}
                        {project.status && (
                          <button
                            disabled
                            className="w-full px-3 py-2.5 rounded-xl bg-gray-900/50 text-gray-500 text-sm font-semibold border border-gray-800/80 opacity-60 flex items-center justify-center gap-2 cursor-not-allowed"
                            title={project.status}
                          >
                            {project.status}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-gray-900/10">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
          >
            Work <span className="text-primary bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Experience</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:shadow-cyan-500/5 transition-all duration-500 relative overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {/* Tab Navigation */}
              <div className="flex flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 border-b border-gray-800/80 md:border-b-0 md:border-r md:border-gray-800/80 md:pr-6 md:col-span-1">
                {[
                  { id: 'overview', label: 'Overview', icon: Zap },
                  { id: 'responsibilities', label: 'Responsibilities', icon: Check },
                  { id: 'takeaways', label: 'Learnings & Takeaways', icon: Brain }
                ].map((tab) => {
                  const TabIcon = tab.icon;
                  const isActive = experienceTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setExperienceTab(tab.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap md:w-full border ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30 text-cyan-400 shadow-md shadow-cyan-500/5'
                          : 'bg-gray-950/20 text-gray-400 border-transparent hover:text-gray-200 hover:bg-gray-950/40'
                      }`}
                    >
                      <TabIcon size={16} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Panel */}
              <div className="md:col-span-2 min-h-[300px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {experienceTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
                          July 2025 – August 2025
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                          Software Developer Intern
                        </h3>
                        <p className="text-cyan-400 font-semibold text-lg">CMH Rawalpindi</p>
                      </div>

                      <p className="text-gray-300 text-base leading-relaxed">
                        A 4-week immersive internship shadowing hospital IT infrastructure, enterprise application architecture, and clinical operations. Learned real-world workflows in a secure, regulated setting.
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {['Healthcare IT', 'System Shadows', 'Enterprise Operations', 'Data Security'].map((tag) => (
                          <span key={tag} className="text-xs px-3 py-1 rounded-full bg-gray-950/60 border border-gray-800 text-gray-400 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {experienceTab === 'responsibilities' && (
                    <motion.div
                      key="responsibilities"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Core Responsibilities</h4>
                      <div className="grid gap-3">
                        {[
                          'Shadowed software operations in hospital IT environment to understand large-scale infrastructure.',
                          'Analyzed real-world system workflows in clinical settings, mapping how data moves from reception to ward databases.',
                          'Learned secure healthcare data flows and patient record management systems.',
                          'Developed a solid conceptual understanding of enterprise software practices in a regulated market.'
                        ].map((resp, idx) => (
                          <motion.div
                            whileHover={{ scale: 1.01, x: 2 }}
                            key={idx}
                            className="flex gap-3 p-3.5 rounded-xl bg-gray-950/40 border border-gray-800/80 hover:border-cyan-500/20 transition-all duration-300"
                          >
                            <div className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="text-cyan-400" size={12} />
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">{resp}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {experienceTab === 'takeaways' && (
                    <motion.div
                      key="takeaways"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Key Learnings & Takeaways</h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          {
                            title: 'Workflow Optimization',
                            desc: 'Studied how digital patient processing cuts wait times in clinical settings.'
                          },
                          {
                            title: 'Enterprise Architecture',
                            desc: 'Learned the layout of high-availability backend systems and servers.'
                          },
                          {
                            title: 'Data Security & Privacy',
                            desc: 'Observed patient details and billing credentials data-masking mechanisms.'
                          },
                          {
                            title: 'Regulated IT Practices',
                            desc: 'Gained exposure to clinical software validation and compliance checks.'
                          }
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-gray-950/40 border border-gray-800/80 hover:border-cyan-500/20 transition-all duration-300"
                          >
                            <h5 className="font-semibold text-cyan-400 text-sm mb-1">{item.title}</h5>
                            <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-4 bg-gray-900/10">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
          >
            Key <span className="text-primary bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Achievements</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: 'Software Engineering Student',
                subtitle: 'at NUST',
              },
              {
                icon: Zap,
                title: 'CGPA 3.73/4.00',
                subtitle: 'Academic Excellence',
              },
              {
                icon: Brain,
                title: 'Multiple AI & ML Projects',
                subtitle: 'Real-world implementations',
              },
              {
                icon: Code2,
                title: 'IoT Systems Development',
                subtitle: 'Healthcare & Education',
              },
              {
                icon: Book,
                title: 'Healthcare IT Internship',
                subtitle: 'Enterprise Experience',
              },
              {
                icon: Code2,
                title: 'AI/ML Implementation',
                subtitle: 'Real-world AI Solutions',
              },
            ].map((achievement, idx) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  key={idx}
                  className="p-6 rounded-2xl bg-gray-950/40 border border-gray-800/80 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 group flex flex-col items-start"
                >
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 mb-4 group-hover:bg-cyan-500/20 transition-all duration-300">
                    <Icon className="group-hover:rotate-6 transition-transform" size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-1 text-white group-hover:text-cyan-300 transition-colors">{achievement.title}</h3>
                  <p className="text-gray-400 text-sm">{achievement.subtitle}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Get In <span className="text-primary">Touch</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 hover:shadow-lg hover:shadow-cyan-500/50">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a href="mailto:mmuzaffar533@gmail.com" className="text-lg font-semibold hover:text-primary transition-colors">
                    mmuzaffar533@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 hover:shadow-lg hover:shadow-cyan-500/50">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <a href="tel:+923141920655" className="text-lg font-semibold hover:text-primary transition-colors">
                    +92-3141920655
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 hover:shadow-lg hover:shadow-cyan-500/50">
                  <Linkedin size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">LinkedIn</p>
                  <a href="https://linkedin.com/in/muhammadzeeshanmuzaffar" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:text-primary transition-colors">
                    Muhammad Zeeshan
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 hover:shadow-lg hover:shadow-cyan-500/50">
                  <Github size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">GitHub</p>
                  <a href="https://github.com/zeeshan-dev-786" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:text-primary transition-colors">
                    zeeshan-dev-786
                  </a>
                </div>
              </div>
            </div>

            <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-950/40 border border-gray-800 focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/10 outline-none transition-all duration-300 text-white placeholder-gray-500"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-950/40 border border-gray-800 focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/10 outline-none transition-all duration-300 text-white placeholder-gray-500"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-950/40 border border-gray-800 focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/10 outline-none transition-all duration-300 text-white placeholder-gray-500"
                />
              </div>
              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-950/40 border border-gray-800 focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/10 outline-none transition-all duration-300 text-white placeholder-gray-500 resize-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {formSubmitted ? (
                  <>
                    <Check size={18} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700/50 bg-gray-900/50 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-gray-400">
            © 2026 Muhammad Zeeshan Muzaffar. Designed and Developed with Passion for Technology.
          </p>
        </div>
      </footer>

      {/* Back to Top Button */}
      {scrollPosition > 300 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all animate-fade-in-up z-40 hover:scale-110"
        >
          <ChevronDown size={24} className="rotate-180" />
        </button>
      )}
    </div>
  );
}
