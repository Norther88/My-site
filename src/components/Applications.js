import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DownloadCountriesData from './DownloadCountriesData';
import QuoteGenerator from './QuoteGenerator';
import SpeedTypingTest from './SpeedTypingTest';

function Applications() {
  const { t } = useTranslation();
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showSpeedTypingTest, setShowSpeedTypingTest] = useState(false);

  const handleToggleSpeedTypingTest = () => {
    setShowSpeedTypingTest((prevState) => !prevState);
  };

  const handleCloseSpeedTypingTest = () => {
    setShowSpeedTypingTest(false);
  };

  const handleOpenQuoteModal = () => {
    setShowQuoteModal(true); // Открытие модального окна с цитатой
  };

  const handleCloseQuoteModal = () => {
    setShowQuoteModal(false); // Закрытие модального окна с цитатой
  };

  return (
    <section className="applications section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-3 col-md-4 col-12 mb-4 text-center">
            <DownloadCountriesData />
          </div>

          {/* Кнопка для генератора цитат */}
          <div className="col-lg-3 col-md-4 col-12 mb-4 text-center">
            <button className="btn btn-info w-100" onClick={handleOpenQuoteModal}>
              {t('showQuoteGenerator')}
            </button>
          </div>

          {/* Кнопка для теста на скорость печати */}
          <div className="col-lg-3 col-md-4 col-12 mb-4 text-center">
            <button className="btn btn-success w-100" onClick={handleToggleSpeedTypingTest}>
              {showSpeedTypingTest ? t('hideSpeedTypingTest') : t('showSpeedTypingTest')}
            </button>
          </div>
        </div>

        {/* Показываем модальное окно с цитатой */}
        {showQuoteModal && (
          <div className="row justify-content-center mt-4">
            <div className="col-lg-8 col-md-10 col-12">
              <QuoteGenerator closeModal={handleCloseQuoteModal} />
            </div>
          </div>
        )}

        {showSpeedTypingTest && (
          <div className="row justify-content-center mt-4">
            <div className="col-lg-8 col-md-10 col-12">
              <SpeedTypingTest showModal={showSpeedTypingTest} onClose={handleCloseSpeedTypingTest} />
            </div>
          </div>
        )}

        {/* Кнопка GitHub внизу по центру */}
        <div className="row justify-content-center mt-4">
          <div className="col-12 text-center">
            <a href="https://github.com/Norther88" target="_blank" rel="noopener noreferrer"  className="btn btn-dark w-10">
            {t('github')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Applications;
