import './charInfo.scss';

import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const CharInfo = ({charId}) => {
    const [char, setChar] = useState(null);

    useEffect(() => {
        updateChar();
    }, [charId]);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    const updateChar = () => {
        if (!charId) return;
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }


        const skeleton = char || loading || error ? null : <Skeleton />;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? <View char={char} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    return (
        <>
        <div className="char__basics">
                    <img src={thumbnail} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : 'Нет комиксов с этим персонажем'}
                    {comics.map((item, i) => {
                        if (i > 9) return;
                        return(
                            <li className="char__comics-item" key={i}>
                                <a href={item.resourceURI}>{item.name}</a>
                            </li>
                        )
                    })}
                    
                </ul>
        </>
    )
}
export default CharInfo;