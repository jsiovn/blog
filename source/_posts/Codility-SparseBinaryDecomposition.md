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
summary: "Giải bài toán Sparse Binary Decomposition với toán tử bitwise."
description: "Tìm hiểu về Sparse Binary Decomposition, cách giải quyết bài toán bằng toán tử bitwise và ứng dụng thực tế trong lập trình."
---
<!-- toc -->

## Tại sao bài toán này quan trọng?
Sparse Binary Decomposition là một bài toán thú vị khi làm việc với các con số ở dạng nhị phân. Nó giúp bạn hiểu rõ hơn về cách hoạt động của toán tử bitwise – một công cụ mạnh mẽ để tối ưu hóa hiệu năng trong lập trình. Bài viết này sẽ hướng dẫn chi tiết cách giải bài toán bằng cách sử dụng toán tử bitwise, giữ nguyên code gốc để dễ dàng theo dõi.

## Bài toán Sparse Binary Decomposition

### Định nghĩa Sparse Binary
Sparse Binary là số nhị phân không chứa hai bit `1` nào liền kề nhau.

**Ví dụ:**
- **Hợp lệ:** `1010` (10), `1001` (9), `1000` (8)
- **Không hợp lệ:** `1100` (12), `1011` (11), `1110` (14)

### Yêu cầu bài toán
Cho một số nguyên `N`, cần tìm số `Q` nhỏ hơn hoặc bằng `N`, sao cho:
1. `Q` là số Sparse Binary.
2. `P = N - Q` cũng là số Sparse Binary.

Nếu không tìm được `Q` thỏa mãn, trả về `-1`.

## Cách tiếp cận bài toán

### Phân tích từng bước
1. **Kiểm tra Sparse Binary:** Xác định xem một số có phải là Sparse Binary hay không.
2. **Tìm số Sparse gần nhất:** Nếu `N` không phải Sparse Binary, giảm giá trị của `N` để tìm số Sparse Binary gần nhất.
3. **Kiểm tra kết quả cuối cùng:** Kiểm tra xem `Q` và `P` có thỏa mãn yêu cầu bài toán không.

## Code chi tiết và giải thích

### Toàn bộ code
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

## Giải thích từng phần

### Kiểm tra số Sparse Binary
Hàm `checkIsBinarySparse` kiểm tra xem một số có phải Sparse Binary không.

**Ví dụ minh họa:**
```javascript
console.log(checkIsBinarySparse(18)); // true (10010)
console.log(checkIsBinarySparse(24)); // false (11000)
```

**Giải thích:**
- `(N & 1)`: Lấy bit cuối cùng.
- `(N >> 1)`: Dịch phải một bit để kiểm tra bit kế tiếp.
- `(N & (N >> 1))`: Kiểm tra hai bit liền kề có phải `1` không.

---

### Tìm số Sparse gần nhất
Hàm `findSparseNumber` giảm dần giá trị của `N` để tìm số Sparse Binary gần nhất.

**Ví dụ minh họa:**
```javascript
console.log(findSparseNumber(20)); // 16 (10000)
console.log(findSparseNumber(24)); // 16 (10000)
```

**Giải thích:**
- Hàm sử dụng toán tử dịch và bitwise để tìm và loại bỏ các bit `1` liền kề.
- Sử dụng `2 ** currentBit` để đặt lại giá trị bit tại vị trí cần thiết.

---

### Kết hợp kết quả
Hàm `execute` kiểm tra `Q` và `P` cuối cùng:
- Nếu cả `Q` và `P` đều là Sparse Binary, trả về `Q`.
- Nếu không tìm được, trả về `-1`.

**Ví dụ minh họa:**
```javascript
console.log(solution(24)); // 16
console.log(solution(20)); // 16
console.log(solution(10)); // 10
console.log(solution(5));  // 5
```

## Kết quả thực tế
![Test cases](./assets/images/codility/SparseBinaryDecomposition-tests.jpg)
![Performance tests](./assets/images/codility/SparseBinaryDecomposition-performance.jpg)

---

## Ứng dụng thực tế
Toán tử bitwise thường được sử dụng trong:
1. **Tối ưu hóa thuật toán:** Xử lý dữ liệu nhanh hơn, đặc biệt trong các bài toán nhị phân.
2. **Lập trình hệ thống:** Kiểm soát dữ liệu ở mức bit để tiết kiệm tài nguyên.
3. **Bảo mật:** Mã hóa và giải mã dữ liệu.

---

## Kết luận
Bài toán **Sparse Binary Decomposition** không chỉ giúp bạn hiểu sâu hơn về cách hoạt động của toán tử bitwise mà còn mở ra nhiều ứng dụng thực tiễn trong lập trình. Bằng cách phân tích từng bước và giữ nguyên code mẫu, hy vọng bài viết này giúp bạn dễ dàng áp dụng vào các bài toán thực tế.