
export function ceil(num) {
  return Math.ceil(num)
}

export function sum(arr) {
  return arr.reduce((a,b)=>a+b, 0)
}

export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function range(start, count) {
    return Array.apply(0, Array(count))
      .map(function (element, index) { 
        return index + start;  
    });
}

