const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDRkOGFjOWM0YzA3OWEzMjNlZjAwMzY3MTQ5MmQzZiIsInN1YiI6IjY2NzE4NWRjMWJmODZmNjA1ZjZhYjEzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cqnD9xHIfL_SpjSBm1PJp_zF4PEDGH5g-YrYmB9gXOk'
    }
};

async function getMovie({ genre_ids }) {
    try{
        let response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=${genre_ids}`, options)
        let data = await response.json()
        return data
    }catch(err){
        console.log(err)
    }
}

getMovie({genre_ids: 12}).then(((rs) => {
    console.log(typeof(rs.results));
    console.log(rs.results)
    }
    
))