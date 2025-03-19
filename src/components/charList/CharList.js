// import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

// import { useState, useEffect } from "react";

// import MarvelService from '../../services/MarvelService';

// const marvelService = new MarvelService();

// const CharList = (props) => {
//     const [characters, setCharacters] = useState([]);
//     useEffect(() => {
//         const promises = Array(9).fill(null).map(() => {
//             const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
//             return marvelService.getCharacter(id);
//         });

//         Promise.all(promises)
//             .then(results => {
//                 setCharacters(results);
//             });
//     }, []);
    
//     const notImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    

//     return (
//         <div className="char__list">
//             <ul className="char__grid">
//                 {characters.map((char) => (
//                     <li key={char.id} 
//                         className="char__item"
//                         onClick={() => props.onCharSelected(char.id)}>
//                         <img src={char.thumbnail} alt={char.name} style={char.thumbnail === notImg ? {objectFit: 'contain'} : {objectFit: 'cover'}}/>
//                         <div className="char__name">{char.name}</div>
//                     </li>
//                 ))}
//             </ul>
//             <button className="button button__main button__long">
//                 <div className="inner">load more</div>
//             </button>
//         </div>
//     )
// }

// export default CharList;

import {useState, useEffect, useRef} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {

    const divRef = useRef(); // Создаём ref


    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(9);
    const [charEnded, setCharEnded] = useState(false);
    const [focusedItem, setFocusedItem] = useState(null); // ID активного элемента
    
    const {loading, error, getAllCharacters, getCharacter} = useMarvelService();

    const setFocus = (id) => {
        setFocusedItem(id);
    };
    
    const removeFocus = () => {
        setFocusedItem(null);
    };

    
    useEffect(() => {
        loadMoreItems();
        if (divRef.current) {
            divRef.current.focus(); // Устанавливаем фокус
        }
    }, []);

    // const loadStartItem = () => {
    //     const promises = Array(9).fill(null).map(() => {
    //         const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    //         return getCharacter(id); // Возвращаем промис
    //     });

    //     Promise.all(promises)
    //         .then(onCharListLoaded(charList, true))
    //         .catch(error);
    // }

    const loadMoreItems = (props) => {
        setNewItemLoading(true)
        const promises = Array(9).fill(null).map(() => {
            const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
            return getCharacter(id);
        });

        Promise.all(promises)
            .then(charList => {
                let ended = offset > 9 ? true : false;
                setCharList(prevCharList => [...prevCharList, ...charList])
                setNewItemLoading(false)
                setOffset(offset + 9)
                setCharEnded(ended)
            })
            .catch(error);
    }

    // const onRequest =  () => {
    //     setNewItemLoading(true)
    //     let a =  loadStartItem();
    //     setCharList([...charList, ...a])
    //     setNewItemLoading(true)
    // } 

    // const onCharListLoaded = (charList, initial) => {
    //     // initial ? setNewItemLoading(true) : setNewItemLoading(false);
    //     setCharList(charList)
    //     setNewItemLoading(false)
    //     setOffset(offset + 9)
    // }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    const renderItems = (arr) => {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li className={`char__item ${focusedItem === item.id ? 'char__item_selected' : ''}`}
                    onFocus={() => setFocus(item.id)}
                    onBlur={removeFocus}
                    tabIndex={0} // Делаем div фокусируемым
                    ref={divRef} // Привязываем ref
                    key={item.id}   
                    onClick={() => props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    
    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading || newItemLoading ? <Spinner/> : null;
    return (
        <div className="char__list"
            
            >
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
            onClick={() => loadMoreItems(offset)}
            disabled={newItemLoading}
            style={{'display': charEnded ? 'none' : 'block'}}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;