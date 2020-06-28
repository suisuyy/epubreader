import { getfile } from './fileapi';

export const api_url = "http://localhost:8080/";

export function getAllFileNamesOnline() {
    return fetch(api_url + 'getfnames').then((respose) => {
        return respose.json();
    });
}

export function getAllBookNamesOnline() {
    return getAllFileNamesOnline().then(response => {
        return new Promise(resolve => {
            resolve(response.filter(i => i.endsWith('.epub')));
        });
    });
}

export function getFileNamesOnline(xname) {
    return getAllFileNamesOnline().then(response => {
        return new Promise(resolve => {
            resolve(response.filter(i => i.endsWith(xname)));
        });
    });
}

export function getRemoteFile(fname) {
    return fetch(api_url + 'files/' + fname).then(response => response.blob());
}


export function uploadFile(fname) {
    const formData = new FormData();
    return getfile(fname).then(file => {
        formData.append('filetoupload', file);
        return fetch(api_url+'upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
                return result;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
}