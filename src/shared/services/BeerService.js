import { throwError } from "rxjs";

const getBeerList = () => fetch('https://api.punkapi.com/v2/beers');

const getBeerByName = (beerName) => fetch(`https://api.punkapi.com/v2/beers?beer_name=${beerName}`);

const getPaginatedBeerList = () => {
    const response = fetch('https://api.punkapi.com/v2/beers')
    .then(beer => {
        return beer.json();
    })
    .then(response => {
        return { items: response.map((item) => modifyBeerResponseToList(item))}
    })
    .catch(error => {
        return throwError(error)
    })

    return response
}

const modifyBeerResponseToList = (beerList) => {
    return {
        label: beerList.name,
        path: `/${beerList.name}`
    }
}

export { getBeerList, getBeerByName, getPaginatedBeerList, modifyBeerResponseToList }