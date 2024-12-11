import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';

// Импортируем библиотеки
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Импортируем кастомные стили и скрипты
import './assets/css/all.min.css';
import './assets/css/main.css';
import './assets/css/Header.css';

// Импортируем компоненты
import Header from "./components/Header";
import Content from "./components/Content";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";


// Импорт i18next
import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <div>
          <Header />
          <Content />
          <FAQ />
          <Contact />
        </div>
      </Provider>
    </I18nextProvider>
  );
}

export default App;
