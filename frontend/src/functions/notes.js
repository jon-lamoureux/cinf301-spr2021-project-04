const axios = require('axios');

export function getNotes() {
    return axios.get('http://localhost:2400/api/profiles')
        .then(response => response.data)
        .catch(error => {
            console.error(`Error fetching notes: ${error}`);
        })
}

export function setOneNote(note) {
    return axios('http://localhost:2400/api/profiles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ note })
    })
        .then(response => response.data)
}