const BookRepository = require('./book.repository');

describe('Book repository Save', function () {
  test('Save a book', () => {
    const dbMock = {
      get : jest.fn().mockReturnThis(),
      push : jest.fn().mockReturnThis(),
      write : jest.fn().mockReturnThis()
    };
    const repository = new BookRepository(dbMock);
    repository.save({id: 1, name: "Unit test"});
    expect(dbMock.write.mock.calls.length).toBe(1);
  });
});

describe('Book repository count', function () {
  test('Count total book', () => {
    const dbMock = {
      get : jest.fn().mockReturnThis(),
      size : jest.fn().mockReturnThis(),
      value : jest.fn().mockReturnValue(3)
    };
    const repository = new BookRepository(dbMock);
    expect(repository.getTotalCount()).toBe(3);
  });
});

describe('Book repository get total price', function () {
  test('Count total price of the books', () => {
    let price = [19.2];
    const dbMock = {
      get : jest.fn().mockReturnThis(),
      size : jest.fn().mockReturnThis(),
      map : jest.fn().mockReturnThis(),
      value : jest.fn().mockReturnValue(price)
    };
    const repository = new BookRepository(dbMock);
    expect(repository.getTotalPrice()).toBe(19.2);
  });
});

describe('Book repository book by name', function () {
  test('Return a book with a given name', () => {
    let bookTest = {
      "books":
      [
        {
          "id": 3,
          "name": "Harry Potter",
          "price": 6.7,
          "added_at": "2019-03-01"
        }
      ]
    };
    const dbMock = {
      get : jest.fn().mockReturnThis(),
      find : jest.fn().mockReturnThis(),
      value : jest.fn().mockReturnValue(bookTest)
    };
    const repository = new BookRepository(dbMock);
    expect(repository.getBookByName("Harry Potter")).toBe(bookTest);
  });

  test('Return an exception because the value is not a String', () => {
      const dbMock = {
          get : jest.fn().mockReturnThis(),
          find : jest.fn().mockReturnThis(),
          value : jest.fn().mockReturnValue([])

      };
      const repository = new BookRepository(dbMock);
      expect(function () {repository.getBookByName(3)}).toThrow('Unable to compute getBookByName. Given bookname is not a String');
  });

  test('Return a message that announced that the book is not in the database', () => {
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            find : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(null)
        };
        const repository = new BookRepository(dbMock);
        expect(repository.getBookByName("Amos Daragon")).toBe('Given name is not found');
      });
});

describe('Book repository count book add by month', function () {
  let bookTest = [
    {
      "id": 2,
      "name": "Berserk",
      "price": 6.4,
      "added_at": "2019-02-01"
    },
    {
      "id": 4,
      "name": "Berserk",
      "price": 6.4,
      "added_at": "2019-02-01"
    }
  ];
  let bookTest2 = [
    {
      "id": 3,
      "name": "Harry Potter",
      "price": 6.7,
      "added_at": "2019-03-01"
    },
    {
      "id": 5,
      "name": "Harry Potter",
      "price": 6.7,
      "added_at": "2019-04-01"
    }
  ]

    test('Count book add by month with an existing book with several exemplary on the same month', () => {
       let expected = [ { year: '2019', month: '02', count: 2, count_cumulative: 2 } ];
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            filter : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(bookTest)
        };
        const repository = new BookRepository(dbMock);

        expect(repository.getCountBookAddedByMonth("Berserk")).toStrictEqual(expected);
    });

    test('Count book add by month with an existing book with exemplary had been had on different months', () => {
       let expected = [ { year: '2019', month: '03', count: 1, count_cumulative: 1 },
                      { year: '2019', month: '04', count: 1, count_cumulative: 2 } ];
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            filter : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(bookTest2)
        };
        const repository = new BookRepository(dbMock);

        expect(repository.getCountBookAddedByMonth("Harry Potter")).toStrictEqual(expected);
    });

    test('Return an exception because the value is not a String', () => {
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            filter : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(bookTest)
        };
        const repository = new BookRepository(dbMock);

        expect(function () {repository.getCountBookAddedByMonth(2)}).toThrow('Unable to compute getCountBookAddedByMonth. Given bookname is not a String');
    });

    test('Return a message that announced that the book is not in the database', () => {
      let expected = [];
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            filter : jest.fn().mockReturnThis(),
            value : jest.fn().mockReturnValue(expected)
        };
        const repository = new BookRepository(dbMock);

        expect(function () {repository.getCountBookAddedByMonth("Amos Daragon")}).toThrow('Given name is not found');
    });
});
