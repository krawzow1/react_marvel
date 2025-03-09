import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

import { useState, useEffect } from "react";

import MarvelService from '../../services/MarvelService';

const marvelService = new MarvelService();

const CharList = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const promises = Array(9).fill(null).map(() => {
            const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
            return marvelService.getCharacter(id);
        });

        Promise.all(promises)
            .then(results => {
                setCharacters(results);
            });
    }, []);

    return (
        
        <div className="char__list">
            <ul className="char__grid">
                {characters.map((char, i) => (
                    <li key={i} className="char__item">
                        <img src={char.thumbnail} alt={char.name}/>
                        <div className="char__name">{char.name}</div>
                    </li>
                ))}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;