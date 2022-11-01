const json = {
  a: "hello",
  b: [1, 2, "3"],
  c: { d: "e" },
  f: [{ g: 4 }, [1]],
  h: 4,
};

let result = "";
console.log(JSON.stringify(json));
const stringify = (jsonObj) => {
  result = `${result}{ `;
  for (let key in jsonObj) {
    result = `${result}"${key}": `;
    const value = jsonObj[key];
    if (typeof value === "string") {
      result = `${result}"${value}", `;
    } else if (typeof value === "number") {
      result = `${result}${value}, `;
    } else if (Array.isArray(value)) {
      result = `${result} [ `;
      value.forEach((el) => {
        // if (typeof el === "string") {
        //   result = `${result} "${el}"`;
        // } else if (typeof value === "number") {
        //   result = `${result}${value}, `;
        // }
      });
      //   result = `${result}{`;
    } else {
      stringify(value);
    }
  }
  result = `${result}}, `;
};

stringify(json);

console.log(result);
