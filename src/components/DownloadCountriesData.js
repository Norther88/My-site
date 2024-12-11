import React, { useState } from 'react';  // Убедитесь, что вы импортировали useState
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // Импортируем useTranslation

function DownloadCountriesData() {
  const [loading, setLoading] = useState(false);  // Инициализация состояния
  const { t } = useTranslation(); // Инициализация переводов

  // Функция для получения данных о странах
  const fetchCountriesData = async () => {
    setLoading(true);  // Устанавливаем состояние в true, чтобы показать, что данные загружаются

    const url = "https://restcountries.com/v3.1/all";
    try {
      const response = await fetch(url);

      // Логируем статус ответа и его содержимое
      if (!response.ok) {
        throw new Error(`Ошибка при получении данных: ${response.statusText}`);
      }

      const countriesData = await response.json();

      // Логируем полученные данные для диагностики
      console.log(countriesData);

      // Генерация CSV после получения данных
      generateCSV(countriesData);
    } catch (error) {
      // Логируем ошибку с деталями
      console.error("Ошибка:", error.message);
    } finally {
      setLoading(false);  // Восстанавливаем состояние после завершения запроса
    }
  };

  // Функция для генерации CSV файла
  const generateCSV = (countriesData) => {
    const fields = [
      "cca2", "cca3", "cioc", "name_common", "name_official", 
      "capital", "region", "subregion", "languages", "area", "population"
    ];

    const rows = countriesData.map((country) => ({
      cca2: country.cca2 || "",
      cca3: country.cca3 || "",
      cioc: country.cioc || "",
      name_common: country.name?.common || "",
      name_official: country.name?.official || "",
      capital: country.capital?.[0] || "",
      region: country.region || "",
      subregion: country.subregion || "",
      languages: Object.values(country.languages || {}).join(", ") || "",
      area: country.area || "",
      population: country.population || "",
    }));

    // Создаем строку CSV
    const csvContent = [
      fields.join(","),
      ...rows.map(row => fields.map(field => row[field]).join(","))
    ].join("\n");

    // Создаем Blob и ссылку для скачивания
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "countries_data.csv"; // Имя файла для скачивания
    link.click(); // Имитируем клик по ссылке для скачивания
  };

  return (
    <section className="applications">
      <div className="button-container">
        <Button variant="primary w-100" onClick={fetchCountriesData}  disabled={loading}>
          {loading ? t('loading') : t('downloadCountriesData')} {/* Переводим текст кнопки */}
        </Button>
      </div>
    </section>
  );
}

export default DownloadCountriesData;
