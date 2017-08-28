const test = require('ava');

const parse = require('../parser');

test('null', (t) => {
  const input = 'null';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('true', (t) => {
  const input = 'true';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('false', (t) => {
  const input = 'false';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('""', (t) => {
  const input = '""';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('"foo"', (t) => {
  const input = '"foo"';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('"f\\no"', (t) => {
  const input = '"f\\no"';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('"\\b\\f\\n\\r\\t\\"\\u2028\\/\\\\"', (t) => {
  const input = '"\\b\\f\\n\\r\\t\\"\\u2028\\/\\\\"';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('0', (t) => {
  const input = '0';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('1', (t) => {
  const input = '1';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('0.1', (t) => {
  const input = '0.1';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('1.1', (t) => {
  const input = '1.1';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('1.100000', (t) => {
  const input = '1.100000';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('1.111111', (t) => {
  const input = '1.111111';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('-0', (t) => {
  const input = '-0';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('-1', (t) => {
  const input = '-1';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('-0.1', (t) => {
  const input = '-0.1';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('-1.1', (t) => {
  const input = '-1.1';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('-1.100000', (t) => {
  const input = '-1.100000';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('-1.111111', (t) => {
  const input = '-1.111111';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('1.1e1', (t) => {
  const input = '1.1e1';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('1.1e+1', (t) => {
  const input = '1.1e+1';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('[]', (t) => {
  const input = '[]';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('[1.1]', (t) => {
  const input = '[1.1]';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('[1.0]', (t) => {
  const input = '[1.0]';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('[1, "2", true, null]', (t) => {
  const input = '[1, "2", true, null]';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('[    ""  ,    ""  ,   -0,    ""]', (t) => {
  const input = '[    ""  ,    ""  ,   -0,    ""]';
  t.deepEqual(parse(input), JSON.parse(input));
});

test('{"a":"b"}', (t) => {
  const input = '{"a":"b"}';
  t.deepEqual(parse(input), JSON.parse(input));
});
