const test = require('ava');

const lex = require('../lexer');

test('', (t) => {
  t.deepEqual(
    [...lex('')],
    []
  );
});

test('null', (t) => {
  t.deepEqual(
    [...lex('null')],
    [{ type: 'literal', value: null }]
  );
});

test('true', (t) => {
  t.deepEqual(
    [...lex('true')],
    [{ type: 'literal', value: true }]
  );
});

test('false', (t) => {
  t.deepEqual(
    [...lex('false')],
    [{ type: 'literal', value: false }]
  );
});

test('""', (t) => {
  t.deepEqual(
    [...lex('""')],
    [{ type: 'string', value: '' }]
  );
});

test('"foo"', (t) => {
  t.deepEqual(
    [...lex('"foo"')],
    [{ type: 'string', value: 'foo' }]
  );
});

test('"f\\no"', (t) => {
  t.deepEqual(
    [...lex('"f\\no"')],
    [{ type: 'string', value: "f\no" }]
  );
});

test('"\\b\\f\\n\\r\\t\\"\\u2028\\/\\\\"', (t) => {
  t.deepEqual(
    [...lex('"\\b\\f\\n\\r\\t\\"\\u2028\\/\\\\"')],
    [{ type: 'string', value: "\b\f\n\r\t\"\u2028\/\\" }]
  );
});

test('0', (t) => {
  t.deepEqual(
    [...lex('0')],
    [{ type: 'number', value: 0 }]
  );
});

test('1', (t) => {
  t.deepEqual(
    [...lex('1')],
    [{ type: 'number', value: 1 }]
  );
});

test('0.1', (t) => {
  t.deepEqual(
    [...lex('0.1')],
    [{ type: 'number', value: 0.1 }]
  );
});

test('1.1', (t) => {
  t.deepEqual(
    [...lex('1.1')],
    [{ type: 'number', value: 1.1 }]
  );
});

test('1.100000', (t) => {
  t.deepEqual(
    [...lex('1.100000')],
    [{ type: 'number', value: 1.1 }]
  );
});

test('1.111111', (t) => {
  t.deepEqual(
    [...lex('1.111111')],
    [{ type: 'number', value: 1.111111 }]
  );
});

test('-0', (t) => {
  t.deepEqual(
    [...lex('-0')],
    [{ type: 'number', value: -0 }]
  );
});

test('-1', (t) => {
  t.deepEqual(
    [...lex('-1')],
    [{ type: 'number', value: -1 }]
  );
});

test('-0.1', (t) => {
  t.deepEqual(
    [...lex('-0.1')],
    [{ type: 'number', value: -0.1 }]
  );
});

test('-1.1', (t) => {
  t.deepEqual(
    [...lex('-1.1')],
    [{ type: 'number', value: -1.1 }]
  );
});

test('-1.100000', (t) => {
  t.deepEqual(
    [...lex('-1.100000')],
    [{ type: 'number', value: -1.1 }]
  );
});

test('-1.111111', (t) => {
  t.deepEqual(
    [...lex('-1.111111')],
    [{ type: 'number', value: -1.111111 }]
  );
});

test('1.1e1', (t) => {
  t.deepEqual(
    [...lex('1.1e1')],
    [{ type: 'number', value: 11 }]
  );
});

test('1.1e+1', (t) => {
  t.deepEqual(
    [...lex('1.1e+1')],
    [{ type: 'number', value: 11 }]
  );
});

test('[]', (t) => {
  t.deepEqual(
    [...lex('[]')],
    [
      { type: 'lbracket', value: '[' },
      { type: 'rbracket', value: ']' }
    ]    
  );  
});

test('[1.1]', (t) => {
  t.deepEqual(
    [...lex('[1.1]')],
    [
      { type: 'lbracket', value: '[' },
      { type: 'number', value: 1.1 },
      { type: 'rbracket', value: ']' }
    ]
  );
});

test('[1.0]', (t) => {
  t.deepEqual(
    [...lex('[1.0]')],
    [
      { type: 'lbracket', value: '[' },
      { type: 'number', value: 1 },
      { type: 'rbracket', value: ']' }
    ]
  );
});

test('[1, "2", true, null]', (t) => {
  t.deepEqual(
    [...lex('[1, "2", true, null]')],
    [
      { type: 'lbracket', value: '[' },
      { type: 'number', value: 1 },
      { type: 'comma', value: ',' },
      { type: 'string', value: '2' },
      { type: 'comma', value: ',' },
      { type: 'literal', value: true },
      { type: 'comma', value: ',' },
      { type: 'literal', value: null },
      { type: 'rbracket', value: ']' }
    ]
  );  
});

test('[    ""  ,    ""  ,   -0,    ""]', (t) => {
  t.deepEqual(
    [...lex('[    ""  ,    ""  ,   -0,    ""]')],
    [
      { type: 'lbracket', value: '[' },
      { type: 'string', value: '' },
      { type: 'comma', value: ',' },
      { type: 'string', value: '' },
      { type: 'comma', value: ',' },
      { type: 'number', value: -0 },
      { type: 'comma', value: ',' },      
      { type: 'string', value: '' },
      { type: 'rbracket', value: ']' }
    ]
  );    
});

test('{"a":"b"}', (t) => {
  t.deepEqual(
    [...lex('{"a":"b"}')],
    [
      { type: 'lbrace', value: '{' },
      { type: 'string', value: 'a' },
      { type: 'colon', value: ':' },
      { type: 'string', value: 'b' },
      { type: 'rbrace', value: '}' }
    ]
  );
});
