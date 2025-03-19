import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './style/style.scss';
import { useEffect } from 'react';


import useMarvelService from './services/MarvelService';
// const  {getAllCharacters, getCharacter} = useMarvelService;

// function Comics() {
//   const {getComics} = useMarvelService();
  
//   useEffect(() => {
//     getComics(100)
//       .then(result => console.log(result))
//       .catch(error => console.error(error));
//   }, []);
// }
// getAllCharacters()
//   .then(res => {
//     res.data.results.forEach(item => console.log(item));
//   })
//   .catch(error => console.log(`Ошибка при получении всех персонажей`, error))

// getCharacter(1011334)
//   .then(res => console.log(res))

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <App />
      {/* <Comics /> */}
    </React.StrictMode>
  )

