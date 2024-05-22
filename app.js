const media = require('./media');


class Movie {
    constructor({ title, year, genre, rating, type }) {
        this.title = title,
            this.year = year,
            this.genre = genre,
            this.rating = rating,
            this.type = type
    }

    toString() {
        return `${this.title} is a ${this.type} of the ${this.genre} genre. It was released in ${this.year} and has been rated ${this.rating} out of 10.`;
    }
}

class TvShow extends Movie {
    constructor({ title, year, genre, rating, type, seasons }) {
        super({ title, year, genre, rating, type })
        this.seasons = seasons
    }

    toString() {
        return `${this.title} is a ${this.type} of the ${this.genre} genre. The first season aired in ${this.year} and it has a total of ${this.seasons} seasons. Viewers have rated it ${this.rating} out of 10.`;

    }
}

const arrayOfClassInstances = media.map(el => {
    return el.type == 'movie' ? new Movie({ ...el }) : new TvShow({ ...el })
})

console.log(arrayOfClassInstances);