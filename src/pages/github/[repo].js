import { getRepoByname, getRepoList } from '../../shared/services/GithubService';

const Repo = ({ pageContent }) => {
    return (
        <>
            <h1>{pageContent.name}</h1>
            <h2>{pageContent.description}</h2>
        </>
    )
}

export const getStaticPaths = async() => {
    const response = (await getRepoList().then(response => response.json()));
    const items = response.map(item => ({
        params: { repo: item.name },
      }))
    const paths = [...items]

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async(context) => {
    const response = (await getRepoByname(context.params.repo).then(response => response.json()));
    console.log(response)
    return {
        props: {
            pageContent: response,
        },
        revalidate: 20
    }
}

export default Repo