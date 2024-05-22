const media = require('./media');


class Movie {
    constructor({ title, year, genre, rating, type }) {
        this.title = title
        this.year = year
        this.genre = genre
        this.rating = rating
        this.type = type
    }

    getInformations() {
        return `${this.title} is a ${this.type} of the ${this.genre} genre. It was released in ${this.year} and has been rated ${this.rating} out of 10.`;
    }
}

class TvShow extends Movie {
    constructor({ title, year, genre, rating, type, seasons }) {
        super({ title, year, genre, rating, type })
        this.seasons = seasons
    }

    getInformations() {
        return `${this.title} is a ${this.type} of the ${this.genre} genre. The first season aired in ${this.year} and it has a total of ${this.seasons} seasons. Viewers have rated it ${this.rating} out of 10.`;

    }
}

const arrayOfClassInstances = media.map(el => {
    return el.type == 'movie' ? new Movie({ ...el }) : new TvShow({ ...el })
})

const filterByGenre = (arr, genre) => {
    const filteredArray = arr.filter(media => {
        return media.genre == genre
    })
    return filteredArray
}


const ratingAverageGivenGenre = (arr, genre) => {
    const filteredArray = filterByGenre(arr, genre)
    const ratingAverage = filteredArray.reduce((acc, media, index, array) => {
        return acc + media.rating / array.length;
    }, 0)

    return Math.round(ratingAverage)
}

//I Can prod do this destructuring
const getAllMediasGenres = (arr) => {
    const foundGenres = []
    arr.forEach(el => {
        if (!foundGenres.includes(el.genre)) {
            foundGenres.push(el.genre)
        }
    })
    return foundGenres
}


const getMediasInfosGivenGenre = (arr, genre) => {
    const filteredArray = filterByGenre(arr, genre)
    const arrayOfInformations = filteredArray.map(media => {
        return media.getInformations()
    })
    return arrayOfInformations
}

console.log(ratingAverageGivenGenre(arrayOfClassInstances, 'Crime'));
console.log(getAllMediasGenres(arrayOfClassInstances))
console.log(getMediasInfosGivenGenre(arrayOfClassInstances, 'Crime'))