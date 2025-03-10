import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss';

import MarvelService from './services/MarvelService';

const marvelService = new MarvelService();

marvelService.getAllCharacters()
  .then(res => {
    res.data.results.forEach(item => console.log(item));
  })
  .catch(error => console.log(`Ошибка при получении всех персонажей`, error))

marvelService.getCharacter(1011334)
  .then(res => console.log(res))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

