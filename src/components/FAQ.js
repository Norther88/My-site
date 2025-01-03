import React from "react";
import { Accordion } from 'react-bootstrap'; 
import { useTranslation } from 'react-i18next';  // Импортируем useTranslation

function FAQ() {
  const { t } = useTranslation();

  return (
    <section className="faq section-padding" id="FAQ">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <h3 className="mb-5">{t('faqTitle')}</h3>

            <Accordion defaultActiveKey="0">
              {t('faqItems', { returnObjects: true }).map((item, index) => (
                <Accordion.Item eventKey={String(index)} key={index}> 
                  <Accordion.Header>{item.question}</Accordion.Header>
                  <Accordion.Body>{item.answer}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
