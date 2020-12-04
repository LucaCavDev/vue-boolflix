/*
Milestone 3:
In questa milestone come prima cosa aggiungiamo la copertina del film o della serie al nostro elenco.
Ci viene passata dall’API solo la parte finale dell’URL,
questo perché poi potremo generare da quella porzione di URL tante dimensioni diverse.
Dovremo prendere quindi l’URL base delle immagini di TMDB:
https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare
(troviamo tutte le dimensioni possibili a questo link:
https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400)
per poi aggiungere la parte finale dell’URL passata dall’API.
Esempio di URL che torna la copertina di BORIS:
https://image.tmdb.org/t/p/w185/s2VDcsMh9ZhjFUxw77uCFDpTuXp.jpg
*/
// _________________________________________________________

var app = new Vue ({
  el: '#app',
  data: {
    arrayFilm: [],
    arraySerieTv: [],
    arrayFlags: ['de', 'en', 'es', 'fr', 'it', 'pt','ru', 'zh', 'ja'],
    thisSearch: ''
  },
  methods: {
    searchFunction() {
      this.searchFilm();
      this.searchSerieTv();
    },

    searchFilm(){
      //Chiamata per movie:
      axios
      .get('https://api.themoviedb.org/3/search/movie',
        { params:
          {
            api_key: '2cd3ef7f0cd27a179b24f4410ce0e944',
            query: this.thisSearch,
            language: 'it-IT'
          }
        }
      )
      .then(risposta => {
        this.arrayFilm = risposta.data.results;
      });
    },

    searchSerieTv(){
      //chiamata serie tv
      axios
      .get('https://api.themoviedb.org/3/search/tv',
        { params:
          {
            api_key: '2cd3ef7f0cd27a179b24f4410ce0e944',
            query: this.thisSearch,
            language: 'it-IT'
          }
        }
      )
      .then(risposta => {
        this.arraySerieTv = risposta.data.results;
      });
    },

    flagFunction: function(index) {
      return this.arrayFlags.includes(index);
    },
    voteStarsFunct: function(movie) {
      return Math.ceil( movie.vote_average / 2 );
    },

    summonPoster: function(poster) {
      return `https://image.tmdb.org/t/p/w342/${poster}`;
    }
  }


})


//da richiesta mi sembrava piu corretto fare un'unica funzione di ricerca e adattare gli output della chiamata alle serie tv a quella dei movie.
//vorrei far stampare in un div nella scheda dell'oggetto in html MOVIE o TV se è un movie o una tv serie. oppure stampare i movie in un div MOVIE e i tv in un div TV




//come elaborare gli output della chiamata. => nel then  roba da 50 a 56 meglio fare un v-if in html? fare li il v if per name title magari boh

//ha senso fare due array movie  e tv, poi concatenarli e stapare la concatenazione

//axios.all? studiarla

//stati over con javascript: EVITARLO  C'E IL CSS
