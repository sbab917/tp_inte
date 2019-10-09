const Interval = require('./interval');

describe('overlaps', function () {
    let intervalGenerale = new Interval(5,6);

    test('Test interval overlaps true', () => {
	let interval2 = new Interval(5,6);
        expect(intervalGenerale.overlaps(interval2)).toBe(true)
    });
    test('Test interval overlaps false', () => {
	let interval2 = new Interval(1,3);
        expect(intervalGenerale.overlaps(interval2)).toBe(false)
    });
});