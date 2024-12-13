import React, { useState } from 'react'; 
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function DownloadCountriesData() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  // Функция для получения данных о странах
  const fetchCountriesData = async () => {
    if (loading) return;

    setLoading(true); // Устанавливаем состояние в true, чтобы показать, что данные загружаются

    const url = "https://countriesnow.space/api/v0.1/countries";
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка при получении данных: ${response.statusText}`);
      }

      const countriesData = await response.json();
      console.log(countriesData); // Логируем полученные данные для диагностики

      // Генерация CSV после получения данных
      generateCSV(countriesData);
    } catch (error) {
      console.error("Ошибка:", error.message);
    } finally {
      setLoading(false); // Восстанавливаем состояние после завершения запроса
    }
  };

  // Функция для генерации CSV файла
  const generateCSV = (countriesData) => {
    const fields = [
      "name", "capital", "region", "languages", "area", "population"
    ];

    const rows = countriesData.data.map((country) => ({
      name: country.country || "",
      capital: country.capital || "",
      region: country.region || "",
      languages: country.languages || "",
      area: country.area || "",
      population: country.population || "",
    }));

    const csvContent = [
      fields.join(","),
      ...rows.map(row => fields.map(field => row[field]).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "countries_data.csv"; // Имя файла для скачивания
    link.click(); // Имитируем клик по ссылке для скачивания
  };

  return (
    <section className="applications">
      <div className="button-container">
        <Button variant="primary w-100" onClick={fetchCountriesData} disabled={loading}>
          {loading ? t('loading') : t('downloadCountriesData')} {/* Переводим текст кнопки */}
        </Button>
      </div>
    </section>
  );
}

export default DownloadCountriesData;
