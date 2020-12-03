// Milestone 2:
//PUNTO A - FATTO
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
//_________________________________________________________
//PUNTO B - FATTO IL CASO MA HO LASCIATO IN UNA SEZIONE LINGUA E UNA BANDIERA. E'FACILMENTE MODIFICABILE NON INFICIA NULLA SE CAMBIO IDEA
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
//PUNTO C - MANCA TUTTO
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
    //aggiungo l'array delle bandiere che ho salvato nel progetto e rinominato con gli stessi noi di original_language, cosi faccio il confronto con questi array e faro nell'html un v if v else per il caso in cui non c'è una bandiera corrispondente nell'array
    arrayFlags: ['de', 'en', 'es', 'fr', 'it', 'pt','ru', 'zh'],
    thisSearch: ''
  },

  methods: {
    searchFunction: function() {
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

        this.thisSearch = '';
      });

    },

    voteStarsFunct: function(movie) {
      //serve per calcolare quante stelle piene o vuote vanno stampate.
      // prendo il numero che corrisponde al voto del movie in questione, lo divido per due ed ho il voto in base 5. i numeri possibili saranno 0 1 2 3 4 5.
      // con un v-for stampo il numero corrispondente di stelle, prima piene e poi vuote
      //uso math ceil perchè nelle specifiche c'è scritto di arrotondare SEMPRE per eccesso, se volevo quello che arrotondava al numero piu vicino dovevo usare mathROUND
      return Math.ceil( movie.vote_average / 2 );
    },
    //funzione per verificare se la lingua originale del movie in questione è presente all'interno dell'arrayFlags. perchè se è compreso vuol dire che abbiamo un'immagine pronta da essere caricata sulla pagina
    flagFunction: function(index) {
      return this.arrayFlags.includes(index);
    }
  }
})

// per tv film cambiare output
