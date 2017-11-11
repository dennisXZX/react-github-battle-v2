import axios from 'axios';

export default {
	fetchPopularRepos: (language) => {
	  // encode the URI to special characters
		const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

		// axios.get() returns a Promise
    // in the callback we return the items property from the response
		return axios.get(encodedURI)
			.then(response => response.data.items);

	}
}