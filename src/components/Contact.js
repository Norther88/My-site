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
        // Форма будет отправлена автоматически через Netlify
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
                            data-netlify="true" 
                            action="/" // Указываем путь для успешной отправки формы
                        >
                            <div className="form-group d-flex flex-column-reverse">
                                <input 
                                    type="text"  
                                    className="form-control"  
                                    name="name"  
                                    id="cf-name" 
                                    placeholder={t('contact.fullName')}  
                                    value={formData.name} 
                                    onChange={handleChange} 
                                />
                                <label htmlFor="cf-name" className="webform-label">{t('contact.fullName')}</label>
                            </div>

                            <div className="form-group d-flex flex-column-reverse">
                                <input 
                                    type="email" 
                                    className="form-control"  
                                    name="email" 
                                    id="cf-email"  
                                    placeholder={t('contact.yourEmail')} 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                />
                                <label htmlFor="cf-email" className="webform-label">{t('contact.yourEmail')}</label>
                            </div>

                            <div className="form-group d-flex flex-column-reverse">
                                <textarea 
                                    className="form-control" 
                                    rows="5" 
                                    name="message" 
                                    id="cf-message"  
                                    placeholder={t('contact.message')}  
                                    value={formData.message} 
                                    onChange={handleChange}
                                />
                                <label htmlFor="cf-message" className="webform-label">{t('contact.message')}</label>
                            </div>

                            <button type="submit" className="form-control" id="submit-button" name="submit">{t('contact.send')}</button>
                        </form>
                    </div>

                    {/* Остальная часть вашего кода... */}
                </div>
            </div>
        </section>
    );
}

export default Contact;
