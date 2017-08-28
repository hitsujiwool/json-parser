const lex = require('./lexer');

module.exports = (input) => {
  return new Parser(lex(input)).parse();
};

class Parser {
  constructor(lexer) {
    this.lexer = lexer;
    this.lookahead = null;
    this.consume();
  }

  parse() {
    const { type, value } = this.lookahead;
    switch (type) {
      case 'string':
      case 'number':
      case 'literal': {
        return value;
      }
      case 'lbrace': {
        return this.object();
      }
      case 'lbracket': {
        return this.array();
      }
      default: {
        throw new Error('syntax error');
      }
    }
  }

  object() {
    const obj = {};
    this.match('lbrace');
    if (this.lookahead.type === 'rbrace') {
      this.match('rbrace');
      return obj;
    }
    const members = this.members();
    this.match('rbrace');
    return members.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, obj);
  }

  array() {
    this.match('lbracket');
    const { type } = this.lookahead;
    switch (type) {
      case 'rbracket': {
        this.consume();
        return [];
      }
      default: {
        const arr = this.elements();
        this.match('rbracket');
        return arr;
      }
    }
  }

  elements() {
    const elements = [];
    elements.push(this.value());
    while (true) {
      const { type } = this.lookahead;
      if (type !== 'comma') break;
      this.match('comma');
      elements.push(this.value());
    }
    return elements;
  }

  members() {
    const members = [];
    members.push(this.pair());
    while (this.lookahead.type === 'comma') {
      this.match('comma');
      members.push(this.pair());
    }
    return members;
  }

  pair() {
    const key = this.key();
    this.match('colon');
    const value = this.value();
    return { key, value };
  }

  key() {
    const { value } = this.lookahead;
    this.match('string');
    return value;
  }

  value() {
    const { type, value } = this.lookahead;
    switch (type) {
      case 'string':
      case 'number':
      case 'literal': {
        this.consume();
        return value;
      }
      case 'lbrace': {
        return this.object();
      }
      case 'lbracket': {
        return this.array();
      }
      default: {
        throw new Error('syntax error');
      }
    }
  };

  match(type) {
    if (this.lookahead.type === type) {
      this.consume();
      return;
    }
    throw new Error(`expected: ${type} found ${this.lookahead.value}`);
  }

  consume() {
    const { value } = this.lexer.next();
    this.lookahead = value;
  }
}
