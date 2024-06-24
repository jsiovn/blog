---
title: Codility - SparseBinaryDecomposition
published: true
date: 2024-06-24 22:28:29
tags:
- es6
- javascript
- algorithms
- codility
categories:
- Giải thuật
- JavaScript
---
<!-- toc -->

## Tóm tắt
Bài này sẽ dùng tới các toán tử bitwise, cơ số hệ nhị phân để giải.
Sẽ hơi khó chút với bạn nào chưa quen, các bạn cứ vừa đọc code, vừa debug, vừa xem document là sẽ hiểu.
Còn khúc mắc chỗ nào thì cứ bình luận bên dưới nhen.

## Bài giải và kết quả
### Bài giải
```javascript
/**
 * 11000 => false
 * 10010 => true
 * @param {*} N
 * @returns
 */
function checkIsBinarySparse(N) {
  while (N) {
    if ((N & 1) === 0) {
      N >>= 1;
      continue;
    }

    if ((N >> 1) & 1) {
      return false;
    }
    N >>= 2;
  }

  return true;
}

/**
 * > 10001001001011100100
 * <- 10001001001010100100
 * @param {*} N
 * @returns
 */
function findSparseNumber(N) {
  let original = N;
  let currentBit = 0;
  let decreasedNumberToFindSparseNumber = 0;

  while (N) {
    if ((N & 1) === 0) {
      currentBit++;
      N >>= 1;
      continue;
    }

    if ((N >> 1) & 1) {
      decreasedNumberToFindSparseNumber += 2 ** (currentBit + 1);
    }

    currentBit += 2;
    N >>= 2;
  }

  return original - decreasedNumberToFindSparseNumber;
}

function execute(N) {
  let Q = N;
  if (!checkIsBinarySparse(Q)) Q = findSparseNumber(Q);

  let P = N - Q;
  if (checkIsBinarySparse(P)) {
    return Q;
  }

  return -1;
}

function solution(N) {
  console.time("executed time");
  const result = execute(N);
  console.timeLog("executed time");

  return result;
}
```

### Kết quả
![Test cases](./assets/images/codility/SparseBinaryDecomposition-tests.jpg)
![Performance tests](./assets/images/codility/SparseBinaryDecomposition-performance.jpg)

## Tài liệu liên quan
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift_assignment
- https://www.youtube.com/watch?v=VLflTjd3lWA
- https://www.youtube.com/watch?v=rsxT4FfRBaM