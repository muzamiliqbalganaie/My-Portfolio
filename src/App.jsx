import React from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Clients from './sections/Clients'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import WorkExperience from './sections/Experience'
import ErDiagaram from './sections/ErDiagaram'

const App = () => {
  return (
    <main className='max-w-full mx-auto'>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Clients />
      <WorkExperience />
      <Contact />
      <ErDiagaram />
      <Footer />
    </main>
  )
}

export default App