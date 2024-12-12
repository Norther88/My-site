import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Contact() {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Форма будет отправлена через Formspree
        alert(t('contact.success'));
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section className="contact section-padding pt-0" id="contact">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                        <form 
                            onSubmit={handleSubmit} 
                            className="contact-form webform" 
                            name="contact" 
                            method="POST"
                            action="https://formspree.io/f/mjkvdlpv" // Замените на ваш Formspree ID
                        >
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="name" 
                                    placeholder={t('contact.fullName')}  
                                    value={formData.name} 
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    name="email" 
                                    placeholder={t('contact.yourEmail')}  
                                    value={formData.email} 
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <textarea 
                                    className="form-control" 
                                    rows="5" 
                                    name="message" 
                                    placeholder={t('contact.message')}  
                                    value={formData.message} 
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit" className="form-control">
                                {t('contact.send')}
                            </button>
                        </form>
                    </div>

<div className="mx-auto col-lg-4 col-md-6 col-12">
                        <h3 className="my-4 pt-4 pt-lg-0">{t('contact.contactTitle')}</h3>
                        <a href="https://t.me/Devbutler_bot" target="_blank" rel="noopener noreferrer" className="mb-1 tgm-bot">{t('contact.telegram')}</a> /
                        <a href="https://wa.me/381631754952/" target="_blank" rel="noopener noreferrer" className="mb-1 wsa-bot"> What'sApp</a>
                        <p>
                            <a className="mail-bot" href="mailto:vaedev1291@gmail.com">
                                {t('contact.sendEmail')}
                                <i className="fas fa-arrow-right custom-icon"></i>
                            </a>
                        </p>

                        <ul className="social-links mt-2">
                            <li><a href="https://hh.ru/resume/1216b557ff0ca2c1b20039ed1f6d677151354b" target="_blank" rel="noopener noreferrer" className="fab fa-headhunter">hh</a></li>
                            <li><a href="https://www.linkedin.com/in/aleksandr-v-3a787884/" target="_blank" rel="noopener noreferrer" className="fab fa-linkedin"><span class="hidden-text">linkedin</span></a></li>
                        </ul>

                        <p className="copyright-text mt-5 pt-3">Copyright &copy; 2024 Alex Developer's Resume</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;