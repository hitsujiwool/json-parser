module.exports = (input) => {
  return new Lexer(input);
};

const isDigit = (char) => {
  return '0' <= char && char <= '9';
};

const isNonZeroDigit = (char) => {
  return '1' <= char && char <= '9';
};

const isHexDigit = (char) => {
  return ('0' <= char && char <= '9') || ('a' <= char && char <= 'f') || ('A' <= char && char <= 'F');
};

class Lexer {
  constructor(input) {
    this.input = input;
    this.p = 0;
  }

  get c() {
    return this.input.charAt(this.p);
  }

  [Symbol.iterator]() {
    return this;
  }

  next() {
    const token = this.process();
    if (!token) return { done: true };
    return { done: false, value: token };
  }

  process() {
    this.ws();
    switch (this.c) {
      case '': {
        return null;
      }
      case '"': {
        return this.string();
      }
      case 't': {
        return this.true();
      }
      case 'f': {
        return this.false();
      }
      case 'n': {
        return this.null();
      }
      case '[': {
        this.consume();
        return { type: 'lbracket', value: '[' };
      }
      case ']': {
        this.consume();
        return { type: 'rbracket', value: ']' };
      }
      case '{': {
        this.consume();
        return { type: 'lbrace', value: '{' };
      }
      case '}': {
        this.consume();
        return { type: 'rbrace', value: '}' };
      }
      case ':': {
        this.consume();
        return { type: 'colon', value: ':' };
      }
      case ',': {
        this.consume();
        return { type: 'comma', value: ',' };
      }
      case '-': {
        return this.number();
      }
      default: {
        if (isDigit(this.c)) {
          return this.number();
        }
        throw new Error(`invalid character \`${this.c}\``);
      }
    }
  }

  consume() {
    this.p++;
  }

  match(str) {
    for (let i = 0, len = str.length; i < len; i++) {
      const chr = str.charAt(i);
      if (chr === this.c) {
        this.consume();
        continue;
      }
      throw new Error(`expected: ${chr} found: ${this.c}`);
    }
  }

  true() {
    this.match('true');
    return { type: 'literal', value: true };
  }

  false() {
    this.match('false');
    return { type: 'literal', value: false };
  }

  null() {
    this.match('null');
    return { type: 'literal', value: null };
  }

  number() {
    let numberStr = '';

    if (this.c === '-') {
      numberStr += '-';
      this.consume();
    }

    if (isDigit(this.c)) {
      numberStr += this.c;
      this.consume();
    } else {
      throw new Error(`expected: digits found ${this.c}`);
    }

    while (isNonZeroDigit(this.c)) {
      numberStr += this.c;
      this.consume();
    }

    if (this.c === '.') {
      numberStr += '.';
      this.match('.');
      while (isDigit(this.c)) {
        numberStr += this.c;
        this.consume();
      }
    }

    if (this.c === 'e' || this.c === 'E') {
      numberStr += this.c;
      this.consume();
      if (this.c === '-' || this.c === '+') {
        numberStr += this.c;
        this.consume();
      }
      while (isDigit(this.c)) {
        numberStr += this.c;
        this.consume();
      }
    }

    return { type: 'number', value: Number(numberStr, 10) };
  }

  string() {
    this.match('"');

    const chars = this.chars();

    this.match('"');

    return { type: 'string', value: chars.value };
  }

  chars() {
    let value = '';
    while (true) {
      if (this.c === '"') {
        break;
      }

      if (this.c === '\\') {
        this.consume();
        switch (this.c) {
          case '"': {
            value += '"';
            this.consume();
            break;
          }
          case '\\': {
            value += '\\';
            this.consume();
            break;
          }
          case '/': {
            value += '/';
            this.consume();
            break;
          }
          case 'b': {
            value += "\b";
            this.consume();
            break;
          }
          case 'f': {
            value += "\f";
            this.consume();
            break;
          }
          case 'n': {
            value += "\n";
            this.consume();
            break;
          }
          case 'r': {
            value += "\r";
            this.consume();
            break;
          }
          case 't': {
            value += "\t";
            this.consume();
            break;
          }
          case 'u': {
            this.consume();
            let digits = '';
            for (let i = 0; i < 4; i++) {
              if (isHexDigit(this.c)) {
                digits += this.c;
                this.consume();
                continue;
              }
              throw new Error(`expected hexdecimals: found: ${this.c}`);
            }
            value += String.fromCharCode('0x' + digits);
            break;
          }
          default: {
            throw new Error('invalid escaping');
          }
        }
      } else {
        value += this.c;
        this.consume();
      }
    }
    return { type: 'chars', value };
  }

  ws() {
    while (this.c == ' ' || this.c == "\t" || this.c == "\n" || this.c == "\r" ) this.consume();
  }
};
