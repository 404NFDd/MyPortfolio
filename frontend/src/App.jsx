import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ProjectsSection from './components/ProjectsSection'
import Footer from './components/Footer'
import Experience from './components/Experience'
import './App.css'

function App() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <Experience />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  )
}

export default App