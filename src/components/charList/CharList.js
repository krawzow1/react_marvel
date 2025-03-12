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

import {Component} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 9,
        charEnded: false
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.loadStartItem();
    }

    loadStartItem = () => {
        const promises = Array(9).fill(null).map(() => {
            const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
            return this.marvelService.getCharacter(id); // Возвращаем промис
        });

        Promise.all(promises)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    loadMoreItems = () => {
        this.onCharListLoading();
        const promises = Array(9).fill(null).map(() => {
            const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
            return this.marvelService.getCharacter(id); // Возвращаем промис
        });

        Promise.all(promises)
            .then(charList => {
                let ended = this.state.offset >= 11 ? true : false;
                this.setState({
                    charList: [...this.state.charList, ...charList],
                    newItemLoading: false,
                    offset: this.state.offset + 9,
                    charEnded: ended
                })
            })
            .catch(this.onError);
    }

    onRequest =  () => {
        this.onCharListLoading();
        let a =  this.loadStartItem();
        this.setState({
            charList: [...this.state.charList, ...a],
            newItemLoading: true
        })
    } 

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })

    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false,
            newItemLoading: false,
            offset: this.state.offset + 9,
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
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

    render() {

        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;
        
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                onClick={() => this.loadMoreItems(offset)}
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;