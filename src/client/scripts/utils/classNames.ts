// https://github.com/JedWatson/classnames
const reducer = (prev, curr) => {
    if (!curr) {
      return prev;
    }
  
    switch (typeof curr) {
      case 'string':
      case 'number':
        return [...prev, curr];
      case 'object':
        if (Array.isArray(curr)) {
          return [...prev, ...curr.reduce(reducer, [])];
        }
        return [...prev, ...Object.keys(curr).filter((key) => curr[key])];
      default:
        throw new SyntaxError('Unsupported Operation: ' + typeof curr);
    }
  };
  
  export default (...args) => {
    return args.reduce(reducer, []).join(' ');
  };
  
  