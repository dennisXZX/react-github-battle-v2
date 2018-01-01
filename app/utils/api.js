import axios from 'axios';

/*
 retrieve Github user info
 @param {string} username - name of a Github user
*/
function getProfile(username) {
  return axios.get(`https://api.github.com/users/${username}`)
    .then((user) => {
      return user.data;
    })
}

/*
 fetch user repos
 @param {string} username - name of a Github user
*/
function getRepos(username) {
  return axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);

/*
 sum up the star of a repo
 @param {string} repos - a Github repository
*/
function getStarCount(repos) {
  return repos.data.reduce((count, repo) => {
    return count + repo.stargazers_count;
  }, 0);
}

/*
  calculate the score of a Github user
  @param {string} profile - profile of a Github user
  @param {string} repos - repositories of a Github user
 */
function calculateScore(profile, repos) {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError(error) {
  console.warn(error);
  return null;
}

/*
  retrieve profile and score of a player,
  use axios.all() to perform multiple concurrent requests
  @param {string} player - name of a player
*/
function getUserData(player) {
  return axios.all([getProfile(player), getRepos(player)])
    .then(axios.spread((profile, repos) => {
      return {
        profile: profile,
        score: calculateScore(profile, repos)
      }
    }));
}

/*
  sort the players array based on their score
  @param {array} players - an array containing two players
 */
function sortPlayers(players) {
  return players.sort((playerA, playerB) => {
    return playerB.score - playerA.score;
  });
}

export default {
  /*
    players.map(getUserData) returns an array of objects
    @param {array} players - an array containing two players
  */
  battle: function (players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },
	fetchPopularRepos: (language) => {
	  // encode the URI to special characters
		const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

		// axios.get() returns a Promise
    // in the callback we return the items property from the response
		return axios.get(encodedURI)
			.then(response => response.data.items);
	}
}