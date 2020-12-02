// Milestone 2:
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)

// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).

// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
// Qui un esempio di chiamata per le serie tv:
// https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs
//
// API Key: 2cd3ef7f0cd27a179b24f4410ce0e944
// _________________________________________________________

var app = new Vue ({
  el: '#app',
  data: {
    arrayMovies: [],
    arrayTv: [],
    //aggiungo l'array dei programmi tv
    thisSearch: ''
  },

  methods: {
    searchFunction: function() {
      //film
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
        this.arrayMovies = risposta.data.results;
        //ragiono su questo this.arrayMovies e per ogni elemento gli devo cambiare il voto da 1-10 a 1-5
        //faccio lo stesso procedimento che avevo usato a riga 34 di vue-dischi
        // this.arrayMovies.forEach((movie, index) => {
        //
        // });
        this.thisSearch = '';
      });


    }


  }
})
