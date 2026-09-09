import { useEffect, useState } from 'react';
import AOS from 'aos';
import Layout from '@/layout/Layout';
import HeroSection from '@/landingpage/HeroSection';
import AboutSection from '@/landingpage/AboutSection';
import ScheduleSection from '@/landingpage/ScheduleSection';
import RegistrationForm from '@/landingpage/RegistrationForm';
import WhyParticipate from '@/landingpage/WhyParticipate';
import ContactBar from '@/landingpage/ContactBar';

function App() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease' });

    const handleScroll = () => setShowScrollButton(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '20px',
            backgroundColor: '#E5222A',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            padding: '5px',
            cursor: 'pointer',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            fontSize: '30px',
            height: '50px',
            width: '50px',
          }}
        >
          ↑
        </button>
      )}

      <Layout>
        <HeroSection />
        <ScheduleSection />
        <AboutSection />
        <RegistrationForm />
        <WhyParticipate />
        <ContactBar />
      </Layout>
    </>
  );
}

export default App;
