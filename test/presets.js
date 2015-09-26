/*jshint node:true, mocha:true */

'use strict';

require('should');

var Decimal = require('linear-arbitrary-precision')(require('floating-adapter'));
var rescale = require('rescale')(Decimal).rescale;
var temp = require('linear-preset-factory')(require('../src/linear-presets-temperature'));

function convert(x, preset) {
  return Number(rescale(preset[0], preset[1], x));
}

function invert(preset) {
  return preset.slice(0).reverse();
}

describe('temperature presets', function() {
  it('should convert correctly', function() {
    (40).should.be.exactly(convert(104, invert(temp.celsius_fahrenheit)), 'celsius_fahrenheit')
      .and.exactly(convert(313.15, invert(temp.celsius_kelvin)), 'celsius_kelvin')
      .and.approximately(convert(563.67, invert(temp.celsius_rankine)), 10e-14, 'celsius_rankine')
      .and.exactly(convert(90, invert(temp.celsius_delisle)), 'celsius_delisle')
      .and.exactly(convert(13.2, invert(temp.celsius_newton)), 'celsius_newton')
      .and.exactly(convert(32, invert(temp.celsius_reaumur)), 'celsius_reaumur')
      .and.exactly(convert(28.5, invert(temp.celsius_romer)), 'celsius_romer');

    (0).should.be.exactly(convert(32, invert(temp.celsius_fahrenheit)), 'celsius_fahrenheit')
      .and.exactly(convert(273.15, invert(temp.celsius_kelvin)), 'celsius_kelvin')
      .and.exactly(convert(491.67, invert(temp.celsius_rankine)), 'celsius_rankine')
      .and.exactly(convert(150, invert(temp.celsius_delisle)), 'celsius_delisle')
      .and.exactly(convert(0, invert(temp.celsius_newton)), 'celsius_newton')
      .and.exactly(convert(0, invert(temp.celsius_reaumur)), 'celsius_reaumur')
      .and.exactly(convert(7.5, invert(temp.celsius_romer)), 'celsius_romer');
  });
});
