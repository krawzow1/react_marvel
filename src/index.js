import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './style/style.scss';

import ComicsList from './components/comicsList/ComicsList';
// import { useEffect } from 'react';


// import useMarvelService from './services/MarvelService';
// const  {getAllCharacters, getCharacter} = useMarvelService;


// getCharacter(1011334)
//   .then(res => console.log(res))

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )

