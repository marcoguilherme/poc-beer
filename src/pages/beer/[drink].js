import { getBeerList, getBeerByName } from '../../shared/services/BeerService';

const Drink = ({ pageContent }) => {
    return <h1>Beer Name: {pageContent?.name} </h1>
}

export const getStaticPaths = async() => {
    const response = (await getBeerList().then(beer => beer.json()));
    const beers = response.map(item => ({
        params: { drink: item.name },
      }))
    const paths = [...beers]

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async(context) => {
    const response = (await getBeerByName(context.params.drink).then(beer => beer.json()));
    return {
        props: {
            pageContent: response[0],
        },
        revalidate: 20
    }
}

export default Drink