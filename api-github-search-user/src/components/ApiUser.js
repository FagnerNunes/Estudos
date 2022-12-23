import axios from 'axios';
const notFound = () => {
    document.querySelector(".not-found").innerHTML = "User not found.";
}

export default {
    getUser(username) {
        return axios.get(`https://api.github.com/users/${username}`)
            .then(response => {
                return Promise.resolve(response);
            })
            .catch(error => {
                notFound();
            }); 
    },

    getRepos (username) {
        return axios.get(`https://api.github.com/users/${username}/repos`)
            .then(response => {
                return Promise.resolve(response.data.length);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    },

    getFollowers(username) {
        return axios.get(`https://api.github.com/users/${username}/followers`)
            .then(response => {
                return Promise.resolve(response.data.length);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    },

    getFollowing(username) {
        return axios.get(`https://api.github.com/users/${username}/following`)
            .then(response => {
                return Promise.resolve(response.data.length);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }
}