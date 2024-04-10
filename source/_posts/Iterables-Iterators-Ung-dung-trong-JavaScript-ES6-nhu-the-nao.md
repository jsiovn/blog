---
title: 'Iterables & Iterators: Ứng dụng trong JavaScript ES6 như thế nào?'
date: 2024-03-31 16:27:08
tags:
- es6
- javascript
categories:
- JavaScript
- JavaScript Nâng Cao
published: true
---

<!-- toc -->



## Tại sao cần sử dụng Iterables và Iterators?

Từ phiên bản ES6 trở đi, bạn có thể sử dụng **for...of** để lặp qua từng giá trị của Array dễ dàng và ngắn gọn hơn so với sử dụng cú pháp *forEach*, *for...in*, *for (let i = 0; i <= array.length, i++)*

Map, Set hỗ trợ Iterable mặc định khi dùng với *for...of* để duyệt qua từng phần tử.

Nhưng khi bạn dùng **for...of** với một object thì sẽ không hoạt động, cùng xem ví dụ bên dưới.
```javascript
const cat = {name: 'Heo'}
for (const value of cat) {}
```
> Uncaught TypeError: cat is not iterable

Lý do là Object không hỗ trợ Iterable mặc định như Array, Map, Set. Nhưng ES6 có hỗ trợ bạn tạo mới Iterable trên object theo pattern Iterable & Iterator mà ES6 quy ước. Lúc này, bạn có thể làm được rất nhiều việc mà bạn muốn, vậy hãy cùng mình tìm hiểu tiếp nhé.

## Tìm hiểu về Iterable & Iterator

### Iterable là gì?

Iterable thể hiện một danh sách các phần tử có thể được duyệt qua. Một đối tượng hỗ trợ Iterable chỉ khi nó chứa key **Symbol.iterator** để tạo nên một **Iterator**.

```javascript
const catNames = ["Heo", "Sun"];
console.log(catNames[Symbol.iterator]);
```
> ƒ values() { [native code] }
### Iterator là gì?

Iterator được xây dựng dựa trên pattern mà ES6 quy ước, bản thân Iterator chứa một trạng thái lặp. Cấu trúc Iterator là object chứa method **next**, khi gọi sẽ trả về object với 2 thuộc tính: *value, done*.


Trong đó:
-  **value** là giá trị kế tiếp trong danh sách phần tử

-  **done** với kiểu **Boolean** gồm 2 trạng thái
	- **true**: Đã duyệt xong hết danh sách phần tử.
	- **false**: Còn phần tử kế tiếp để duyệt qua ở lần gọi method *next* tiếp theo.

### Cách Iterables & Iterators hoạt động trên object với for...of

#### Sử dụng for...of với object không hỗ trợ Iterable
```javascript
const myPets = {
  pets: [
    {
      name: 'Heo',
      age: '5 years old'
    },
    {
      name: 'Lung',
      age: '1 year old'
    }
  ]
};

for (const value of myPets) {
  console.log(value);
}
```
> TypeError: myPets is not iterable

#### Sử dụng for...of với object hỗ trợ Iterable
```javascript
const myPets = {
  pets: [
    {
      name: 'Heo',
      age: '5 years old'
    },
    {
      name: 'Lung',
      age: '1 year old'
    }
  ],
  [Symbol.iterator]() {
    const pets = this.pets;
    const totalPets = pets.length;
    let index = 0;

    return {
      next() {
        if (index < totalPets) {
          return { value: pets[index++], done: false };
        }
        return { done: true };
      }
    };
  }
};

for (const value of myPets) {
  console.log(value);
}
```
> { name: 'Heo', age: '5 years old' }
> { name: 'Lung', age: '1 year old' }

#### Cơ chế hoạt động của for...of phía bên dưới ES6
```javascript
const myPets = {
  pets: [
    {
      name: 'Heo',
      age: '5 years old'
    },
    {
      name: 'Lung',
      age: '1 year old'
    }
  ],
  [Symbol.iterator]() {
    const pets = this.pets;
    const totalPets = pets.length;
    let index = 0;

    return {
      next() {
        if (index < totalPets) {
          return { value: pets[index++], done: false };
        }
        return { done: true };
      }
    };
  }
};

// Đoạn này giả lập cơ chế hoạt động của for...of
// phía bên dưới của ES6
const iterator = myPets[Symbol.iterator]();
let result = iterator.next();

while (!result.done) {
  console.log(result.value);
  result = iterator.next();
}
```
> { name: 'Heo', age: '5 years old' }
> { name: 'Lung', age: '1 year old' }


### Sử dụng for...of trên Array, Map, Set
#### Sử dụng for...of trên Array
```javascript
const pets = [
  { name: 'Heo', age: '5 years old' },
  { name: 'Lung', age: '1 year old' }
];

for (const pet of pets) {
  console.log(pet);
}
```
> { name: 'Heo', age: '5 years old' }
> { name: 'Lung', age: '1 year old' }

#### Sử dụng for...of trên Map
```javascript
const petMap = new Map();
petMap.set('Heo', '5 years old');
petMap.set('Lung', '1 year old');

for (const [name, age] of petMap) {
  console.log({ name, age });
}
```
> { name: 'Heo', age: '5 years old' }
> { name: 'Lung', age: '1 year old' }

#### Sử dụng for...of trên Set
```javascript
const petSet = new Set();
petSet.add({ name: 'Heo', age: '5 years old' });
petSet.add({ name: 'Lung', age: '1 year old' });

for (const pet of petSet) {
  console.log(pet);
}
```
> { name: 'Heo', age: '5 years old' }
> { name: 'Lung', age: '1 year old' }

## Kết luận
Thông qua bài viết này, bạn đã có thêm kiến thức về Iterables & Iterators từ ES6 với việc được hỗ trợ mặc định trên kiểu dữ liệu Array, Map, Set cho đến tự thiết kế Iterable cho object bất kì mà bạn xây dựng.

Bài viết cũng có giải thích cơ chế hoạt động đằng sau của for...of từ ES6 để bạn hiểu rõ hơn cách nó vận hành thế nào.

Ngoài ra, Iterables & Iterators còn có những ưu điểm khác như:

- Code nhìn ngắn gọn, dễ đọc, dễ bảo trì.
- Tương thích với *Spread Operator, Destructing*.
- Tương thích với các *method* có sẵn như *map(), filter(), reduce()*.
```javascript
const myPets = {
  pets: [
    {
      name: 'Heo',
      age: '5 years old'
    },
    {
      name: 'Lung',
      age: '1 year old'
    }
  ],
  [Symbol.iterator]() {
    const pets = this.pets;
    const totalPets = pets.length;
    let index = 0;

    return {
      next() {
        if (index < totalPets) {
          return { value: pets[index++], done: false };
        }
        return { done: true };
      }
    };
  }
};

const filteredPets = [...myPets].filter(pet => pet.name === 'Heo');
console.log(filteredPets);
```
> [ { name: 'Heo', age: '5 years old' } ]