// MILESTONE 1 : in html fare searchBar, con bottone che attiva la funzione, con la quale cercare il nome di un film - vogliamo visualizzare a schermo:
// titolo
// titolo originale
// lingua
// voto
//
// API Key: 2cd3ef7f0cd27a179b24f4410ce0e944
// _________________________________________________________

var app = new Vue ({
  el: '#app',
  data: {
    arrayMovies: [], //la lista dei film tra cui cercare
    thisSearch: ''//il termine che viene cercato nella barra di ricerca. di default è vuoto
  },

  methods: {
    searchFunction: function() {

      //VEDI QUI PER LA DOCUMENTAZIONE
      //https://developers.themoviedb.org/3/getting-started/search-and-query-for-details
      //https://developers.themoviedb.org/3/search/search-movies
      //sono required:
      // la string con la api_key che ho ricavato iscrivendomi al sito
      // la string con la query da cercare, che deve essere di testo e per lo meno di una lettera
      // string
      axios
      .get('https://api.themoviedb.org/3/search/movie',
      //qua trovo la spiegazione per dare i parametri
      //https://masteringjs.io/tutorials/axios/get-query-params
        { params:
          {
            api_key: '2cd3ef7f0cd27a179b24f4410ce0e944',
            //assegnatami dal sito una volta richiesta
            query: this.thisSearch
            //la stringa di testo per la query è uguale al testo che viene digitato nell'input della barra di ricerca
          }
        }
      )

      .then(risposta => {
        this.arrayMovies = risposta.data.results;
        //.results perchè results è il nome dell'array che contiene i risultati della ricerca che stiamo facendo
        //vedi esempio ricerca su postman: https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d&query=casa

        this.thisSearch = '';
        // per svuotare il campo di ricerca dopo averne fatta una
      });

    }

  }
})
