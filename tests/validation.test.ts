import { expect } from 'chai';
import { Validation } from '../src/utils/validators';

describe('Validation', () => {
  it('isRequired', () => {
    expect(Validation.isRequired('a')).to.equal(true);
    expect(Validation.isRequired('  ')).to.equal(false);
    expect(Validation.isRequired('')).to.equal(false);
  });
  it('isUserId: лише цифри', () => {
    expect(Validation.isUserId('123')).to.equal(true);
    expect(Validation.isUserId('12a')).to.equal(false);
  });
  it('isYear', () => {
    expect(Validation.isYear('2004')).to.equal(true);
    expect(Validation.isYear('1999')).to.equal(true);
    expect(Validation.isYear('999')).to.equal(false);
    expect(Validation.isYear('3000')).to.equal(false);
    expect(Validation.isYear('20x4')).to.equal(false);
  });
  it('validateBook повертає помилки', () => {
    const e = Validation.validateBook({ title: '', author: 'A', year: 'abc' });
    expect(e).to.have.keys('title', 'year');
  });
  it('validateBook без помилок', () => {
    expect(Validation.validateBook({ title: 'T', author: 'A', year: '2004' })).to.deep.equal({});
  });
  it('validateUser', () => {
    expect(Validation.validateUser({ name: 'A', email: 'bad' })).to.have.key('email');
  });
  it('validateUserId', () => {
    expect(Validation.validateUserId('')).to.be.a('string');
    expect(Validation.validateUserId('1a')).to.be.a('string');
    expect(Validation.validateUserId('17')).to.equal(null);
  });
});
