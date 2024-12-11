import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

function SpeedTypingTest({ showModal, onClose }) {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState('');
  const [timeLeft, setTimeLeft] = useState(30); // Таймер на 30 секунд
  const [started, setStarted] = useState(false); // Тест не начинается сразу
  const [speed, setSpeed] = useState(0);
  const [textToType, setTextToType] = useState(''); // Случайный текст
  const [errors, setErrors] = useState(0); // Количество ошибок

  // Массив с текстами для набора, мемоизируем, чтобы избежать пересоздания на каждом рендере
  const texts = useMemo(() => [
    t("speedTypingText1"),
    t("speedTypingText2"),
    t("speedTypingText3"),
    t("speedTypingText4"),
    t("speedTypingText5")
  ], [t]);

  // Оборачиваем getRandomText в useCallback, чтобы избежать его пересоздания при каждом рендере
  const getRandomText = useCallback(() => texts[Math.floor(Math.random() * texts.length)], [texts]);

  // Оборачиваем calculateSpeed в useCallback, чтобы избежать его пересоздания при каждом рендере
  const calculateSpeed = useCallback(() => {
    const trimmedText = inputText.trim(); // Убираем лишние пробелы
    const wordsTyped = trimmedText.split(/\s+/).length; // Подсчитываем слова
    const wpm = (wordsTyped / 5) / ((30 - timeLeft) / 60); // Считаем скорость в словах в минуту
    setSpeed(wpm.toFixed(2));
  }, [inputText, timeLeft]);

  useEffect(() => {
    if (!started) {
      setTextToType(getRandomText()); // Устанавливаем случайный текст при старте
    }
  }, [texts, started, getRandomText]);

  useEffect(() => {
    let interval;
    if (started && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      calculateSpeed();
    }
    return () => clearInterval(interval);
  }, [started, timeLeft, calculateSpeed]);

  const handleChange = (event) => {
    const value = event.target.value;
    setInputText(value);

    // Проверка ошибок
    const errorCount = checkErrors(value);
    setErrors(errorCount);
  };

  const startTest = () => {
    setStarted(true);
    setInputText(''); // Очищаем поле ввода
    setTimeLeft(30); // Сбрасываем таймер на 30 секунд
    setSpeed(0); // Сбрасываем скорость
    setErrors(0); // Сбрасываем количество ошибок
  };

  const stopTest = () => {
    setStarted(false);
    calculateSpeed(); // Завершаем тест и считаем скорость
  };

  const changeText = () => {
    setTextToType(getRandomText()); // Сменяем текст
    setInputText(''); // Очищаем поле ввода
    setTimeLeft(30); // Сбрасываем таймер на 30 секунд
    setStarted(false); // Тест не начинается сразу
    setSpeed(0); // Сбрасываем скорость
    setErrors(0); // Сбрасываем количество ошибок
  };

  // Функция для проверки ошибок
  const checkErrors = (input) => {
    const originalText = textToType;
    let errorCount = 0;

    // Проверяем каждый символ
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== originalText[i]) {
        errorCount++;
      }
    }

    return errorCount;
  };

  // Функция для выделения ошибок
  const highlightErrors = (input) => {
    const originalText = textToType;
    let result = [];

    for (let i = 0; i < input.length; i++) {
      if (input[i] === originalText[i]) {
        result.push(input[i]);
      } else {
        result.push(<span key={i} style={{ color: 'red' }}>{input[i]}</span>);
      }
    }

    // Добавляем оставшийся текст, если пользователь ввел больше символов, чем в оригинале
    if (input.length < originalText.length) {
      result.push(originalText.slice(input.length));
    }

    return result;
  };

  if (!showModal) return null; // Если модальное окно не показывается, ничего не рендерим

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <button onClick={onClose} style={closeButtonStyle}>×</button>
        <div style={{ padding: '20px' }}>
          <h1 style={{ marginBottom: '20px' }}>Тест на скорость печати</h1>
          <p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>
            {textToType || "Нажмите 'Начать тест', чтобы увидеть текст"}
          </p>
          <div style={{ fontSize: '18px', marginBottom: '20px' }}>
            {highlightErrors(inputText)}
          </div>
          <textarea value={inputText} onChange={handleChange} disabled={!started || timeLeft === 0} rows="4" style={{ width: '100%', marginBottom: '20px', padding: '10px', fontSize: '16px' }}/>
          <div>
            {started ? (
              <>
                <p>Осталось времени: {timeLeft} секунд</p>
                <button onClick={stopTest} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginRight: '10px' }}>
                  Стоп
                </button>
              </>
            ) : (
              <>
                <button onClick={startTest} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginRight: '10px' }}>
                  Начать тест
                </button>
                <button onClick={changeText} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                  Сменить текст
                </button>
              </>
            )}
            {timeLeft === 0 && <p style={{ marginTop: '20px' }}>Ваша скорость: {speed} слов/мин</p>}
            {speed > 0 && !started && <p style={{ marginTop: '20px' }}>Ваша скорость: {speed} слов/мин</p>}
            <p>Ошибки: {errors}</p>
          </div>
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
  maxWidth: '800px',
  maxHeight: '80%',
  padding: '20px',
  textAlign: 'center',
  position: 'relative',
  overflowY: 'auto',
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

export default SpeedTypingTest;
