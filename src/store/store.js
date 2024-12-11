import { createStore } from 'redux';

// Начальное состояние
const initialState = {
  name: 'Александр Волошин',
  profession: 'Веб-разработчик',
  skills: ['React', 'Redux', 'JavaScript', 'HTML', 'CSS', 'MySQL'],
  phone: '+7 (981) 753-72-24',
};

// Редьюсер, который обновляет состояние
function profileReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_PROFILE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

// Создание хранилища Redux
const store = createStore(profileReducer);

export default store;
