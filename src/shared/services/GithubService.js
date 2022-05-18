import { throwError } from "rxjs";

const getRepoList = () => fetch('https://api.github.com/users/marcoguilherme/repos');

const getRepoByname = (query) => fetch(`https://api.github.com/repos/marcoguilherme/${query}`);

const getPaginatedRepoList = () => {
    return fetch('https://api.github.com/users/marcoguilherme/repos')
        .then(response => {
            return response.json();
        })
        .then(response => {
            return { items: response.map((item) => modifyResponseToList(item))}
        })
        .catch(error => {
            return throwError(error)
        })
}

const modifyResponseToList = (data) => {
    return {
        label: data.name,
        path: `/${data.name}`
    }
}

export { getRepoList, getRepoByname, getPaginatedRepoList }