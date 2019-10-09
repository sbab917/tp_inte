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