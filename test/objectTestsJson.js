var should = require('should');
var _ = require('underscore');

var javelin = require('../index');

// -----
//  Object Tests
// -----

// describe()
describe('Object Tests (JSON)', function() {
  // Create locals
  var locals = {
    "foo": {
      "bar": "baz",
      "qux": "quux",
      "inner": {
        "one": "1",
        "two": "2"
      }
    },
    "outerArray": [
      { "1": "one", "2": "two" },
      { "1": "three", "2": "four" }
    ]
  };

  // test01
  it('Should deep copy local object to output', function() {
    var compile = javelin.compileFile('./test/javelin/object/test01.jav', 'json');
    var result = compile(locals);
    
    result.should.eql({ "foo": locals.foo });
  }); //- test01
 
  // test02
  it('Should deep copy local object to output, unnamed', function() {
    var compile = javelin.compileFile('./test/javelin/object/test02.jav', 'json');
    var result = compile(locals);
    
    result.should.eql(locals.foo);
  }); //- test02

  // test03
  it('Should only copy explicit properties to output', function() {
    var compile = javelin.compileFile('./test/javelin/object/test03.jav', 'json');
    var result = compile(locals);
    
    var expected = {
      "foo": {
        "bar": "baz"
      }
    };

    result.should.eql(expected);
  }); //- test03

  // test04
  it('Should only rename properties on output', function() {
    var compile = javelin.compileFile('./test/javelin/object/test04.jav', 'json');
    var result = compile(locals);
    
    var expected = {
      "bar": {
        "baz": "baz",
        "foo": "quux"
      }
    };

    result.should.eql(expected);
  }); //- test04

  // test05
  it('Should correctly copy sub objects', function() {
    var compile = javelin.compileFile('./test/javelin/object/test05.jav', 'json');
    var result = compile(locals);
    
    var expected = {
      "foo": {
        "bar": "baz",
        "qux": "quux",
        "inner": {
          "one": "1",
          "two": "2"
        },
        "outerArray": [
          { "one": "one", "two": "two" },
          { "one": "three", "two": "four" }
        ]
      }
    };

    result.should.eql(expected);
  }); //- test05

  // test06
  it('Should execute inline script and set returned value', function() {
    var compile = javelin.compileFile('./test/javelin/object/test06.jav', 'json');
    var result = compile(locals);
    
    var expected = {
      "foo": {
        "bar": "baz",
        "qux": "quux",
        "inner": 3
      }
    };

    result.should.eql(expected);
  }); //- test06

  // test07
  it('Should include an external *.jav file', function() {
    var compile = javelin.compileFile('./test/javelin/object/test07.jav', 'json');
    var result = compile(locals);

    result.should.eql(locals);
  }); //- test07
}); //- describe()