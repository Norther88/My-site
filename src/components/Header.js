import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-scroll';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../assets/css/Header.css';

function Header() {
  const { name, profession } = useSelector((state) => state);

  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng); // Сохраняем выбранный язык
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      setScrolled(scrollPosition > 50);

      const sections = document.querySelectorAll('section');
      let currentSection = '';

      sections.forEach((section) => {
        const top = section.offsetTop - 50;
        const bottom = section.offsetTop + section.offsetHeight;

        if (scrollPosition >= top && scrollPosition <= bottom) {
          currentSection = section.getAttribute('id');
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <Navbar expand="lg" bg="black" variant="black" className={scrolled ? 'scroll' : ''}>
        <Container>
          {/* Логотип */}
          <Navbar.Brand href="/">{t('header.logo', { name: 'Alex Developer' })}</Navbar.Brand>

          {/* Кнопка для мобильной версии */}
          <Navbar.Toggle aria-controls="navbarNav" />

          {/* Навигационное меню */}
          <Navbar.Collapse id="navbarNav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="intro" smooth={true} duration={500} className={`smoothScroll ${activeSection === 'intro' ? 'active' : ''}`}>
                {t('header.menu.intro')}
              </Nav.Link>
              <Nav.Link as={Link} to="about" smooth={true} duration={500} className={`smoothScroll ${activeSection === 'about' ? 'active' : ''}`}>
                {t('header.menu.about')}
              </Nav.Link>
              <Nav.Link as={Link} to="testimonials" smooth={true} duration={500} className={`smoothScroll ${activeSection === 'testimonials' ? 'active' : ''}`}>
                {t('header.menu.reviews')}
              </Nav.Link>
              <Nav.Link as={Link} to="FAQ" smooth={true} duration={500} className={`smoothScroll ${activeSection === 'FAQ' ? 'active' : ''}`}>
                {t('header.menu.faq')}
              </Nav.Link>
              <Nav.Link as={Link} to="contact" smooth={true} duration={500} className={`smoothScroll ${activeSection === 'contact' ? 'active' : ''}`}>
                {t('header.menu.contact')}
              </Nav.Link>
            </Nav>

            {/* Кнопка для загрузки CV */}
            <Button variant="primary" className="custom-btn btn" href={i18n.language === 'en' ? '/assets/documents/cv-vae-en.pdf' : '/assets/documents/cv-vae-ru.pdf'} download>
                {t('header.downloadCV')}
            </Button>

            {/* Кнопки переключения языка */}
            <div className="language-switcher">
              <Button variant="link" onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'active-lan' : ''}>
                EN
              </Button>
              <Button variant="link" onClick={() => changeLanguage('ru')} className={i18n.language === 'ru' ? 'active-lan' : ''}>
                RU
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
