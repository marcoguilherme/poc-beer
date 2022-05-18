const Drink = ({ pageContent }) => {
    return <h1>Beer Name: {pageContent.name}</h1>
}

export const getStaticProps = async(context) => {
    console.log(context)
    const response = (await fetch(`https://api.punkapi.com/v2/beers`).then(beer => beer.json()));
    return {
        props: {
            pageContent: response[0],
        }
    }
}

export default Drink