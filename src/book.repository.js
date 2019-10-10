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
        getCountBookAddedByMonth(bookName) {
          if(typeof bookName != typeof "") {
            throw 'Unable to compute getCountBookAddedByMonth. Given bookname is not a String';
          }
          let allbooks = this.db.get('books').filter({name: bookName}).value();
          if (allbooks.length === 0) {
            throw 'Given name is not found';
          }
          let year;
          let month;
          let count = 1;
          let count_cumulative = 0;
          let date = '';
          let results = [];
          for(let i = 0; i < allbooks.length; i++) {
            let book = allbooks[i];
            date = book.added_at.split("-");
            year = date[0];
            month = date[1];
            if(results.filter(result => result.year === year && result.month === month).length !== 0){
              let index = results.findIndex(result => result.year === year && result.month === month);
              count_cumulative += 1;
              results[index]["count"] +=1;
              results[index]["count_cumulative"] = count_cumulative;
            }
          else {
            count_cumulative += 1;
            results.push({year, month, count, count_cumulative});
          /*  if(results.length >= 2){
              results.shift();
            }*/
          }
        }
        return results;
      }
    }
    module.exports = BookRepository;
