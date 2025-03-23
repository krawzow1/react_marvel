import './comicsList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(8);
    const [comicsEnded, setComicsEnded] = useState(false);
    
    const {loading, error, getAllComics} = useMarvelService();


    useEffect(() => {
        loadMoreComics();
    }, []);

    const loadMoreComics = () => {
        setNewComicsLoading(true);
        getAllComics(offset)
            .then(newComics => {
                setComicsList(prevComicsList => [...prevComicsList, ...newComics])
                setNewComicsLoading(false)
                setOffset(offset + 8)
            })
            .catch(error)
    }
    console.log(comicsList)
    

    const renderComics = () => {
        
            const comics = comicsList.map((item,i) => {
                return (
                    <li className="comics__item" key={i}>
                        <Link to={`/comics/${item.id}`}>
                            <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                    </li>
                )
            })
        return (
            <ul className="comics__grid">
            {comics}
            </ul>
        )
        
    }

    const comics = renderComics(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = newComicsLoading ? <Spinner/> : null;
    return (
        <div className="comics__list">
                {comics}
                {errorMessage}
                {spinner}

            <button className="button button__main button__long"
                onClick={() => loadMoreComics()}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;