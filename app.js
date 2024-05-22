const media = require('./media');


class Movie {

    #title
    #year
    #genre
    #rating
    #type

    constructor({ title, year, genre, rating, type }) {
        this.#title = title
        this.#year = year
        this.#genre = genre
        this.#rating = rating
        this.#type = type
    }

    getInformations() {
        return `${this.#title} is a ${this.#type} of the ${this.#genre} genre. It was released in ${this.#year} and has been rated ${this.#rating} out of 10.`;
    }

    getProperty(requst) {
        switch (requst) {
            case 'title':
                return this.#title
                break;
            case 'year':
                return this.#year
                break;
            case 'genre':
                return this.#genre
                break;
            case 'rating':
                return this.#rating
                break;
            case 'type':
                return this.#type
                break;

            default: return 'No property found'

        }
    }


}

class TvShow extends Movie {
    #seasons
    constructor({ title, year, genre, rating, type, seasons }) {
        super({ title, year, genre, rating, type })
        this.#seasons = seasons
    }

    getInformations() {
        return `${this.title} is a ${this.type} of the ${this.genre} genre. The first season aired in ${this.year} and it has a total of ${this.seasons} seasons. Viewers have rated it ${this.rating} out of 10.`;
    }

    get seasons() {
        return this.#seasons
    }
}

const arrayOfClassInstances = media.map(el => {
    return el.type == 'movie' ? new Movie({ ...el }) : new TvShow({ ...el })
})

const filterByGenre = (arr, genre) => {
    const filteredArray = arr.filter(media => {
        return media.getProperty('genre') == genre
    })
    return filteredArray
}


const ratingAverageGivenGenre = (arr, genre) => {
    const filteredArray = filterByGenre(arr, genre)
    const ratingAverage = filteredArray.reduce((acc, media, index, array) => {
        return acc + media.getProperty('rating') / array.length;
    }, 0)

    return Math.round(ratingAverage)
}


//NOTE - Dunno if I can use  this method with private property

// const getAllMediasGenres = (arr) => {
//     const arrOfGenres = arr.reduce((acc, { genre }) => {
//         if (!acc.includes(genre)) {
//             acc.push(genre)
//         }
//         return acc
//     }, [])

//     return arrOfGenres


// }


const getMediasInfosGivenGenre = (arr, genre) => {
    const filteredArray = filterByGenre(arr, genre)
    const arrayOfInformations = filteredArray.map(media => {
        return media.getInformations()
    })
    return arrayOfInformations
}

const getAllMediasGenres = (arr) => {
    const allGenres = []
    arr.forEach(media => {
        const mediaGenre = media.getProperty('genre')
        if (!allGenres.includes(mediaGenre)) {
            allGenres.push(mediaGenre)
        }
    })
    return allGenres
}



console.log(ratingAverageGivenGenre(arrayOfClassInstances, 'Crime'));
console.log(getAllMediasGenres(arrayOfClassInstances))
console.log(getMediasInfosGivenGenre(arrayOfClassInstances, 'Crime'))