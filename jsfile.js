function fetch_imdb_data(){
    const APIkey = document.getElementById("api-key-input").value;
    const filmName = document.getElementById("film-name").value;
    const url='https://imdb-api.com/en/API/SearchMovie/' + 'k_t0c7ubc5/' + filmName;
    let selectedFilmID = ""
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Process the JSON response
            selectedFilmID = data.results[0].id;
            fetch_results(selectedFilmID);
            renew_similar_page(data);
            console.log(data);
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });

}
function fetch_results(filmID){
    const newUrl = 'https://imdb-api.com/en/API/Title/'+ 'k_t0c7ubc5/' + filmID;
    fetch(newUrl)
        .then(response => response.json())
        .then(data => {
            renew_main_page(data);
            console.log(data);
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
}
function renew_similar_page(response){
    var elements = document.getElementsByClassName("similar-card");
    for(let i = 1; i < 5; i++){
        const newUrl = 'https://imdb-api.com/en/API/Title/'+ 'k_t0c7ubc5/' + response.results[i].id;
        fetch(newUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementsByClassName("similar-img")[i - 1].src = data.image;
                document.getElementsByClassName("title-similar")[i - 1].innerHTML = data.title;
                document.getElementsByClassName("sub-description-similar")[i - 1].querySelector("p").innerHTML = "Scores: " + data.imDbRating;
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
            });
    }
}
function renew_main_page(response){
    document.getElementById("movie-card-image").src = response.image;
    document.getElementById("title").innerHTML = response.title;
    document.getElementById("score").innerHTML = "<p>" + response.imDbRating + "</p>";
    let genre = "";
    for(let i = 0; i < response.genreList.length; i++){
        genre += "<span class=\"genre-items\">" + response.genreList[i].key + "</span>";
    }
    document.getElementById("genre").innerHTML = genre;
    document.getElementById("movie-description").innerHTML = response.plot;
    document.getElementById("date-time").innerHTML = response.year + "   " + response.runtimeStr + "   " + response.awards;
    document.getElementById("director").innerHTML = response.directors;
    document.getElementById("writer").innerHTML = response.writers;
    document.getElementById("stars").innerHTML = response.stars;
}
document.getElementById("search").addEventListener("click",fetch_imdb_data);