import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com/v1/public/'
    const _apiKey = 'apikey=f6bda804492a49f19f1d351aa5971497'

    const getAllCharacters = async () => {
        const res = await request(`${_apiBase}characters?limit=9&offset=210&${this._apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return res.data
    }

    const _transformCharacter = (char) => {
        let description = null
        if (char.description.length > 10) {
            description = char.description.slice(0, 200) + '...'
        } else if (char.description.length < 10) {
            description = 'Этот персонаж пока не имеет описания'
        } else {
            description = char.description
        }
        return {
            id: char.id,
            name: char.name,
            description: description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getComics}
}

export default useMarvelService;