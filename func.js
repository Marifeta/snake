function genRandXY(max) {
    return Math.floor(Math.random() * max) * 10;
}

// const arr1 = [{ a:1 }, { a:2 }, { a:3 }, { a:4 }, { a:5 }];
// const arr2 = [{ a:1 }, { a:2 }, { a:4 }];
//
// const s = new Set(arr2.map(e => JSON.stringify(e)));
// console.log(arr1.filter(e => !s.has(JSON.stringify(e))));
//
//
// let a = [1,2,3,4,5,6,7,8,9,10];
// let b = [6,7,10];
//
// let c = a.reduce( (acc, item) => {
//     if (!b.includes(item)) acc.push(item);
//     return acc;} , []);
//
// console.log(c);
