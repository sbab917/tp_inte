const Interval = require('./interval');

describe('overlaps', function () {
  let intervalGeneral = new Interval(5,6);
  test('Test interval overlaps true', () => {
    let interval = new Interval(5,6);
    expect(intervalGeneral.overlaps(interval)).toBe(true)
  });
  test('Test interval overlaps false', () => {
    let interval = new Interval(1,3);
    expect(intervalGeneral.overlaps(interval)).toBe(false)
  });
});

describe('includes', function () {
  let intervalGeneral = new Interval(4,8);
  test('Test interval with total inclusion send true', () => {
    let interval = new Interval(4,8);
    expect(intervalGeneral.includes(interval)).toBe(true);
  });
  test('Test interval includes send true', () => {
    let interval = new Interval(5,6);
    expect(intervalGeneral.includes(interval)).toBe(true);
  });
  test('Test interval with total exclusion send false', () => {
    let interval = new Interval(1,3);
    expect(intervalGeneral.includes(interval)).toBe(false);
  });
  test('Test interval includes send false', () => {
    let interval = new Interval(1,5);
    expect(intervalGeneral.includes(interval)).toBe(false);
  });
});

describe('union', function () {
  let intervalGeneral = new Interval(4,8);
  test('Test interval if union is true', () => {
    let interval = new Interval(5,6);
    let result = new Interval(4,8);
    expect(intervalGeneral.union(interval)).toStrictEqual(result);
  });
  test('Test interval if union is true with separate interval', () => {
    let interval = new Interval(1,4);
    let result = new Interval(1,8);
    expect(intervalGeneral.union(interval)).toStrictEqual(result);
  });
  test('Test interval union if interval is bigger than interval1', () => {
    let interval = new Interval(1,14);
    let result = new Interval(1,14);
    expect(intervalGeneral.union(interval)).toStrictEqual(result);
  });
  test('Test interval if union is true with separate interval', () => {
    let interval = new Interval(1,3);
    let result = [interval,intervalGeneral];
    expect(intervalGeneral.union(interval)).toStrictEqual(result);
  });
  test('Test interval if union is true with separate interval', () => {
    let interval = new Interval(10,40);
    let result = [intervalGeneral,interval];
    expect(intervalGeneral.union(interval)).toStrictEqual(result);
  });
});

describe('intersection', function () {
  let intervalGeneral = new Interval(4,8);
  test('Test interval intersection with intersection2 in intersection1', () => {
    let interval = new Interval(5,6);
    let result = new Interval(5,6);
    expect(intervalGeneral.intersection(interval)).toStrictEqual(result);
  });
  test('Test interval intersection with intersection1 in intersection2', () => {
    let interval = new Interval(1,16);
    let result = new Interval(4,8);
    expect(intervalGeneral.intersection(interval)).toStrictEqual(result);
  });
  test('Test interval intersection with a part of intersection2 in intersection1', () => {
    let interval = new Interval(5,10);
    let result = new Interval(5,8);
    expect(intervalGeneral.intersection(interval)).toStrictEqual(result);
  });
  test('Test interval intersection with a part of intersection1 in intersection2', () => {
    let interval = new Interval(3,6);
    let result = new Interval(4,6);
    expect(intervalGeneral.intersection(interval)).toStrictEqual(result);
  });
  test('Test interval intersection with intersection2 and intersection1 not crossing', () => {
    let interval = new Interval(1,4);
    expect(intervalGeneral.intersection(interval)).toStrictEqual(null);
  });
});

describe('exclusion', function () {
  let intervalGeneral = new Interval(4,8);

  test('Test interval exclusion with intersection2 and intersection1 not crossing', () => {
    let interval = new Interval(1,3);
    let result = [interval,intervalGeneral];
    expect(intervalGeneral.exclusion(interval)).toStrictEqual(result);
  });
  test('Test interval exclusion with intersection1 and intersection2 not crossing', () => {
    let interval = new Interval(10,13);
    let result = [intervalGeneral,interval];
    expect(intervalGeneral.exclusion(interval)).toStrictEqual(result);
  });
  test('Test interval exclusion with intersection2 is equal to intersection1', () => {
    let interval = new Interval(4,8);
    let result = null;
    expect(intervalGeneral.exclusion(interval)).toStrictEqual(result);
  });

  test('Test interval exclusion if the beginning of intersection2 is in intersection1', () => {
    let interval = new Interval(6,13);
    let result = [new Interval(4,6),new Interval(8,13)];
    expect(intervalGeneral.exclusion(interval)).toStrictEqual(result);
  });

  test('Test interval exclusion if the ending of intersection2 is in intersection1', () => {
    let interval = new Interval(1,6);
    let result = [new Interval(1,4),new Interval(6,8)];
    expect(intervalGeneral.exclusion(interval)).toStrictEqual(result);
  });
  test('Test interval exclusion with all intersection1 in intersection2', () => {
    let interval = new Interval(1,16);
    let result = [new Interval(1,4),new Interval(8,16)];
    expect(intervalGeneral.exclusion(interval)).toStrictEqual(result);
  });
  test('Test interval exclusion with all intersection2 in intersection1', () => {
    let interval = new Interval(5,6);
    let result = [new Interval(4,5),new Interval(6,8)];
    expect(intervalGeneral.exclusion(interval)).toStrictEqual(result);
  });
});
