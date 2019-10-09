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
