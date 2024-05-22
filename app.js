

class Cart {
    #mediaList = []
    addItem(item) {
        if (this.#mediaList.includes(item)) {
            return `${item.getProperty('title')} is already in the chart`
        }
        this.#mediaList.push(item);
    }

    removeItem(item) {
        if (!this.#mediaList.includes(item)) {
            return `${item.getProperty('title')} is not in your chart`
        }
        const index = this.#mediaList.indexOf(item)
        this.#mediaList.splice(index, 1);
    }

    getTotalPrice() {
        const totalPrice = this.#mediaList.reduce((acc, media) => {
            return acc + media.price;
        }, 0);

        return totalPrice;
    }


    get mediaList() {
        return this.#mediaList;
    }

}


class Movie {

    #title
    #year
    #genre
    #rating
    #type

    constructor({ title, year, genre, rating, type, price }) {
        this.#title = title
        this.#year = year
        this.#genre = genre
        this.#rating = rating
        this.#type = type
        this.price = this.price || 3.99
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

    #capitalizeString(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    get title() {
        return this.#title
    }

    get year() {
        return this.#year
    }

    get genre() {
        return this.#genre
    }

    get rating() {
        return this.#rating
    }

    get type() {
        return this.#type
    }

    set title(title) {
        if (typeof title !== 'string') {
            throw new Error('Invalid data type, expected: string');
        }
        if (title.length > 50) {
            throw new Error('Title too long, max length: 50');
        }
        this.#title = this.#capitalizeString(title)
    }

    set year(year) {
        const currentYear = new Date().getFullYear()
        if (typeof year !== 'number') {
            throw new Error('Invalid data type, expected: number');
        }
        if (year > currentYear) {
            throw new Error("Unless you have a time machine, you cant set a date in the future");
        }
        if (year < 1888) {
            throw new Error("First movie has been released in 1888, I think you're lying here");
        }
        this.#year = year
    }

    set genre(genre) {
        if (typeof genre !== 'string') {
            throw new Error('Invalid data type, expected: string');
        }
        if (genre.length > 30) {
            throw new Error('genre too long, max length: 30');
        }
        const possibleGenres = [
            "action", "adventure", "comedy", "crime", "drama", "fantasy",
            "horror", "mystery", "romance", "sci-fi", "thriller", "western"
        ];

        this.#genre = this.#capitalizeString(genre)
        const lowercaseGenre = genre.toLowerCase();
        const validGenres = possibleGenres.map(gen => gen.toLowerCase());
        if (!validGenres.includes(lowercaseGenre)) {
            throw new Error(`Invalid genre: ${genre}. Accepted genres are: ${possibleGenres.join(', ')}`);
        }
    }

    set rating(rating) {
        if (typeof rating !== 'number') {
            throw new Error('Invalid data type, expected: number');
        }
        if (rating > 10) {
            throw new Error("I'm glad you enjoyed this movie so much, but unfortunately 10 is the max rating");
        }
        if (rating < 0) {
            throw new Error("I'm sorry you think this movie sucks, but I think giving 0 is enough to express your disappointment");
        }
        this.#rating = rating
    }

    set type(type) {

        if (typeof type !== 'string') {
            throw new Error('Invalid data type, expected: string');
        }
        type = type.toLowerCase()
        if (type !== 'movie' && type !== 'tv') {
            throw new Error('Only 2 accepted types are movie and tv');
        }
        this.#type = type
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

    set seasons(seasons) {
        if (typeof seasons !== 'number') {
            throw new Error('Invalid data type, expected: number');
        }
        if (seasons > 70) {
            throw new Error("Damn, this show is hella long, season limit is 70");
        }
        if (seasons < 0) {
            throw new Error("Error: expecting positive value for seasons");
        }
        this.#seasons = seasons
    }
}

const media = require('./media');
const cart = new Cart();
const himym = new TvShow({
    title: 'How I met your mother',
    genre: 'Comedy',
    year: 2005,
    type: 'tv',
    rating: 9,
    seasons: 9

})

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

function fillChart() {
    const shuffledSilcedArray = arrayOfClassInstances.sort((a, b) => {
        return Math.random() - 0.5
    }).slice(0, 5)
    shuffledSilcedArray.forEach(media => {
        cart.addItem(media)
    })

}


fillChart()
console.log(ratingAverageGivenGenre(arrayOfClassInstances, 'Crime'));
console.log(getAllMediasGenres(arrayOfClassInstances))
console.log(getMediasInfosGivenGenre(arrayOfClassInstances, 'Comedy'))


cart.removeItem(cart.mediaList[0])
console.log(cart.mediaList)
console.log(cart.getTotalPrice())
// console.log(himym.rating = 11)