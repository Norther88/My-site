import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { quotes } from './Quotes'; // Импортируем цитаты из файла

function QuoteGenerator({ closeModal }) {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(20); // Таймер для автоматического закрытия окна
  const { t, i18n } = useTranslation();

  // Функция для получения случайной цитаты
  const fetchQuote = () => {
    setLoading(true);
    // Получаем текущий язык
    const currentLanguage = i18n.language || 'en';
    // Случайный выбор цитаты из массива для текущего языка
    const randomIndex = Math.floor(Math.random() * quotes[currentLanguage].length);
    const selectedQuote = quotes[currentLanguage][randomIndex];
    setQuote(selectedQuote.quote);
    setAuthor(selectedQuote.author);
    setLoading(false);
  };

  // Функция для сброса таймера и получения новой цитаты
  const resetTimer = () => {
    setTimer(20); // Сброс таймера
    fetchQuote(); // Получаем новую цитату
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          closeModal(); // Закрытие окна, если таймер истек
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown); // Очистка интервала при закрытии окна
  }, [closeModal]);

  // Эффект для получения цитаты при загрузке модального окна
  useEffect(() => {
    fetchQuote();
  }, [i18n.language]); // Перезагружаем цитату при смене языка

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <button onClick={closeModal} style={closeButtonStyle}>×</button>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>{t('quotegenerator.title')}</h2>
          {loading ? (
            <p>{t('quotegenerator.load')}</p>
          ) : (
            <div>
              <p>"{quote}"</p>
              <p>- {author}</p>
            </div>
          )}
          <button
            onClick={resetTimer}
            className="btn btn-primary"
            style={{ margin: '10px' }}
          >
            {t('quotegenerator.otherquote')}
          </button>
          <p style={{ color: timer <= 5 ? 'red' : 'black' }}>
            {t('quotegenerator.timerMessage', { count: timer })}
          </p>
        </div>
      </div>
    </div>
  );
}

// Стиль для модального окна
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  width: '90%',
  maxWidth: '600px',
  padding: '20px',
  textAlign: 'center',
  position: 'relative',
  overflow: 'auto',
  maxHeight: '80vh',
  boxSizing: 'border-box',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '24px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  color: 'black',
  zIndex: 1010,
};

export default QuoteGenerator;