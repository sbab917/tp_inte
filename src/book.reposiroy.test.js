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
