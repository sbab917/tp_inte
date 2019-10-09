class BookRepository {

  /**
  * @param db
  */
  constructor(db) {
    this.db = db;
  }

  save (book) {
    this.db.get('books').push(book).write();
  }

  /**
  * Nombre total de livre
  */
  getTotalCount() {
    return this.db.get('books').size().value();
  }

  /**
  * Somme du prix de tous les livre
  */
  getTotalPrice() {
    let result = 0;
    let price = this.db.get('books').map('price').value();
    for(let i = 0; i<price.length; i++){
      result += price[i];
    }
    return result;
  }


  /**
  * Retourne un livre
  */
  getBookByName(bookName) {
    if(typeof bookName != typeof "") {
      throw 'Unable to compute getBookByName. Given bookname is not a String';
    }
    let result = this.db.get('books').find({name : bookName}).value();
    if(result != null){
      return result;
    }
    else{
      return 'Given name is not found';
    }
  }

  /**
  * Nombre de livre ajouté par mois
  *
  *  [
    *      {
      *          year: 2017,
      *          month, 2,
      *          count, 129,
      *          count_cumulative: 129
      *      },
      *      {
        *          year: 2017,
        *          month, 3,
        *          count, 200,
        *          count_cumulative: 329
        *      },
        *      ....
        *  ]
        */
        getCountBookAddedByMont(bookName) {

        }

      }


      module.exports = BookRepository;
