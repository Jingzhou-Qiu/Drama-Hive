
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDRkOGFjOWM0YzA3OWEzMjNlZjAwMzY3MTQ5MmQzZiIsInN1YiI6IjY2NzE4NWRjMWJmODZmNjA1ZjZhYjEzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cqnD9xHIfL_SpjSBm1PJp_zF4PEDGH5g-YrYmB9gXOk'
  }
};

async function getMovie(genre_ids) {
  try {
      let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=${18}`
      let response = await fetch(url, options)
      let data = await response.json()
      console.log(data.results[0].poster_path)
      return data

  } catch (err) {
      console.log(err)
  }
};


getMovie(18).then((rs) => console.log(rs.results[0]));

