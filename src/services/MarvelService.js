class MarvelService {
    _apiBase = 'https://gateway.marvel.com/v1/public/'
    _apiKey = 'apikey=f6bda804492a49f19f1d351aa5971497'
    
    getResource = async (url) => {
        let res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Ошибка запроса на сервер ${url}, статус: ${res.status}`)
        }
        return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter  = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
        let description = null
        if (char.description.length > 10) {
            description = char.description.slice(0, 200) + '...'
        } else if (char.description.length < 10) {
            description = 'Этот персонаж пока не имеет описания'
        } else {
            description = char.description
        }
        return {
            name: char.name,
            description: description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }
}

export default MarvelService;