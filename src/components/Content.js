import React from "react";
import Slider from "react-slick";
import Applications from "./Applications";
import { useTranslation } from 'react-i18next';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Content() {
   const { t } = useTranslation();

   const sliderSettings = {
        dots: true, // Включаем отображение точек
        infinite: true,
        speed: 500,
        slidesToShow: 1, // Показываем 1 слайд за раз (в одном слайде будет 3 элемента)
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1, // На экранах меньше 1024px — 1 слайд
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1, // На экранах меньше 768px — 1 слайд
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <section className="hero d-flex flex-column justify-content-center align-items-center" id="intro">
                <div className="container">
                    <div className="row">
                        <div className="mx-auto col-lg-5 col-md-5 col-10 foto-flex">
                            <img src="/images/alex-developer.png" className="img-fluid" alt="Alex Frontend Developer" />
                        </div>

                        <div className="d-flex flex-column justify-content-center align-items-center col-lg-7 col-md-7 col-12">
                            <div className="hero-text">
                                <h1 className="hero-title">{t('hero.title')}</h1>

                                <a href="mailto:vaedev1291@gmail.com" className="email-link">
                                    {t('hero.emailLink')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about section-padding" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <h3 className="mb-4">{t('about.resumeTitle')}</h3>

                            <p>
                                {t('about.experience')}
                            </p>

                            <p>
                                {t('about.specialization')}
                            </p>
                            <p>
                                {t('about.externalSystems')}
                            </p>

                            <ul className="mt-4 mb-5 mb-lg-0 profile-list list-unstyled">
                                <li>
                                    <strong>Name:</strong> {t('about.profile.name')}
                                </li>

                                <li>
                                    <strong>Date of birth:</strong> {t('about.profile.dob')}
                                </li>

                                <li>
                                    <strong>Languages:</strong> {t('about.profile.languages')}
                                </li>

                                <li>
                                    <strong>Stack:</strong> {t('about.profile.stack')}
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-5 mx-auto col-md-6 col-12">
                            <img src="/images/working.jpg" className="about-image img-fluid" alt="Alex's Resume" />
                        </div>
                    </div>

                    <div className="row about-third">
                        <div className="col-lg-4 col-md-4 col-12">
                            <h3>{t('about.achievements.title')}</h3>
                            <p>
                                {t('about.achievements.content')} 
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">
                            <h3>{t('about.projectManagement.title')}</h3>
                            <p>
                               {t('about.projectManagement.content')}
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-4 col-12">
                            <h3>{t('about.webDevelopment.title')}</h3>
                            <p>
                               {t('about.webDevelopment.content')}
                            </p>
                        </div>
                    </div>
                </div>
                                      <Applications  />
            </section>


    {/* Секция с отзывами */}
            <section className="testimonials section-padding" id="testimonials">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="mb-5 text-center">{t('testimonials.title')}</h3>

                            {/* React Slick Carousel */}
                            <Slider {...sliderSettings}>
                                {/* Слайд 1 */}
                                <div className="testimonials-group d-flex justify-content-between">
                                    <div className="testimonials-thumb d-flex">
                                        <div className="testimonials-image">
                                            <img src="/images/testimonials/Ekaterina.png" className="img-fluid" alt="person-review"/>
                                        </div>
                                        <div className="testimonials-info">
                                            <p>{t('testimonials.ekaterina.text')}</p>
                                            <h6 className="mb-0">{t('testimonials.ekaterina.name')}</h6>
                                            <span>{t('testimonials.ekaterina.position')}</span>
                                        </div>
                                    </div>

                                    <div className="testimonials-thumb d-flex">
                                        <div className="testimonials-image">
                                            <img src="/images/testimonials/testimonial-image02.jpg" className="img-fluid" alt="person-review"/>
                                        </div>
                                        <div className="testimonials-info">
                                            <p>{t('testimonials.elena.text')}</p>
                                            <h6 className="mb-0">{t('testimonials.elena.name')}</h6>
                                            <span>{t('testimonials.elena.position')}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Слайд 2 */}
                                <div className="testimonials-group d-flex justify-content-between">
                                    <div className="testimonials-thumb d-flex">
                                        <div className="testimonials-image">
                                            <img src="/images/testimonials/Ilya.png" className="img-fluid" alt="person-review"/>
                                        </div>
                                        <div className="testimonials-info">
                                            <p>{t('testimonials.ilya.text')}</p>
                                            <h6 className="mb-0">{t('testimonials.ilya.name')}</h6>
                                            <span>{t('testimonials.ilya.position')}</span>
                                        </div>
                                    </div>

                                    <div className="testimonials-thumb d-flex">
                                        <div className="testimonials-image">
                                            <img src="/images/testimonials/Anastasiya.png" className="img-fluid" alt="person-review"/>
                                        </div>
                                        <div className="testimonials-info">
                                            <p>{t('testimonials.anastasia.text')}</p>
                                            <h6 className="mb-0">{t('testimonials.anastasia.name')}</h6>
                                            <span>{t('testimonials.anastasia.position')}</span>
                                        </div>
                                    </div>

                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Content;
