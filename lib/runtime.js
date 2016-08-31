import Stack from './stack';
import LinkedList from './linked_list';

function isObject(value) {
  return Object.prototype.toString.call(value) == '[object Object]';
}

function isArray(value) {
  return Object.prototype.toString.call(value) == '[object Array]';
}

function cloneArgs(input) {
  if (isArray(input)) {
    let result = [];
    for (let value of input) {
      result.push( cloneArgs(value) );
    }
    return result;
  }

  else {
    return input;
  }
}

class StackFrame {
  constructor(name, args, depth) {
    this.name = name;
    this.args = cloneArgs(args);
    this.depth = depth;
    this.returnValue = null;
  }
}

class Runtime {
  constructor() {
    this.stack = new Stack;
    this.frames = new LinkedList;
  }

  call(func, ...args) {
    let ret = undefined;
    let frame = new StackFrame(func.name, args, this.stack.size)
    this.stack.push(frame);

    try {
      this.frames.add(frame);
      ret = func(...args);
      return ret;
    } finally {
      frame.returnValue = ret;
      this.stack.pop();
    }
  }

  *[Symbol.iterator]() {
    yield* this.frames.values();
  }

  toLog() {
    console.group('Runtime');
    let indent = ((depth) => {
      let str = '';
      let i = 0;
      while (i++ <= depth) str += '\t';
      return str;
    });

    let fixArgs = (arg) => {
      if (typeof arg === 'string')
        return `"${arg}"`;
      else if (typeof arg.length !== 'undefined')
        return `[${arg.toString()}]`;
      else if (typeof arg === 'object')
        return arg.toString();
      else
        return arg;
    }

    for (let frame of this) {
      frame.args.pop();
      console.log(`${indent(frame.depth)}${frame.name}(${frame.args.map(fixArgs).join(', ')}) return ${frame.returnValue}`);
    }
    console.groupEnd();
  }
}

export default Runtime;
