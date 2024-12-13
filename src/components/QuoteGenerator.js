import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function QuoteGenerator({ closeModal }) {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(20); // Таймер для автоматического закрытия окна
  const { t } = useTranslation();

  // Функция для получения цитаты
  const fetchQuote = async () => {
  setLoading(true);
  try {
    const response = await fetch('https://api.quotable.io/random', { cache: 'no-store' }); // Отключаем кэширование
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();

    // Проверяем структуру данных
    if (data.content && data.author) {
      setQuote(data.content);
      setAuthor(data.author);
    } else {
      setQuote("Цитата не найдена");
      setAuthor("Автор неизвестен");
    }
  } catch (error) {
    console.error(`Ошибка при загрузке цитаты: ${error.message}`, error);
    setQuote("Не удалось загрузить цитату. Попробуйте снова.");
    setAuthor("");
  } finally {
    setLoading(false);
  }
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
  }, []);

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
  width: '90%', // Ширина модального окна будет 90% от ширины экрана
  maxWidth: '600px', // Ограничиваем максимальную ширину окна
  padding: '20px',
  textAlign: 'center',
  position: 'relative',
  overflow: 'auto', // Включаем прокрутку, если содержимое не помещается
  maxHeight: '80vh', // Ограничиваем высоту окна (80% от высоты экрана)
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
