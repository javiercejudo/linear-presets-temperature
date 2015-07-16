/*jshint node:true, mocha:true */

'use strict';

require('should');

var rescale = require('rescale')(require('floating-adapter')).rescale;
var temp = require('../src/linear-presets-temperature');

function convert(x, preset) {
  return rescale(x, preset[0], preset[1]);
};

function invert(preset) {
  return preset.slice(0).reverse();
};

describe('temperature presets', function() {
  it('should convert correctly', function() {
    (40).should.be.exactly(convert(104, invert(temp.celsiusToFahrenheit)), 'celsiusToFahrenheit')
      .and.exactly(convert(313.15, invert(temp.celsiusToKelvin)), 'celsiusToKelvin')
      .and.approximately(convert(563.67, invert(temp.celsiusToRankine)), 10e-14, 'celsiusToRankine')
      .and.exactly(convert(90, invert(temp.celsiusToDelisle)), 'celsiusToDelisle')
      .and.exactly(convert(13.2, invert(temp.celsiusToNewton)), 'celsiusToNewton')
      .and.exactly(convert(32, invert(temp.celsiusToReaumur)), 'celsiusToReaumur')
      .and.exactly(convert(28.5, invert(temp.celsiusToRomer)), 'celsiusToRomer');

    (0).should.be.exactly(convert(32, invert(temp.celsiusToFahrenheit)), 'celsiusToFahrenheit')
      .and.exactly(convert(273.15, invert(temp.celsiusToKelvin)), 'celsiusToKelvin')
      .and.exactly(convert(491.67, invert(temp.celsiusToRankine)), 'celsiusToRankine')
      .and.exactly(convert(150, invert(temp.celsiusToDelisle)), 'celsiusToDelisle')
      .and.exactly(convert(0, invert(temp.celsiusToNewton)), 'celsiusToNewton')
      .and.exactly(convert(0, invert(temp.celsiusToReaumur)), 'celsiusToReaumur')
      .and.exactly(convert(7.5, invert(temp.celsiusToRomer)), 'celsiusToRomer');
  });
});
