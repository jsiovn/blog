---
title: Khám phá 3 nguyên tắc JavaScript giúp bạn viết code tối ưu hơn
date: 2024-12-01 12:50:51
tags:
- javascript
- principles
categories:
- JavaScript
description: "Tìm hiểu 3 nguyên tắc JavaScript quan trọng: Execution Context, Function, Call Stack để viết mã hiệu quả và dễ bảo trì."
summary: "Hiểu rõ 3 nguyên tắc JavaScript: Execution Context, Function, Call Stack."
published: true
---

<!-- toc -->

Khi viết mã JavaScript, bạn có bao giờ thắc mắc tại sao chương trình của mình lại chạy theo thứ tự như vậy? Làm thế nào để JavaScript biết phải thực thi lệnh nào trước, lệnh nào sau? Để trả lời, chúng ta cần tìm hiểu ba khái niệm quan trọng: **Execution Context**, **Function**, và **Call Stack**.

Những nguyên tắc này không chỉ giúp bạn hiểu rõ hơn cách JavaScript hoạt động mà còn giúp bạn dễ dàng gỡ lỗi và tối ưu hóa chương trình. Hãy cùng bắt đầu nhé!

## Execution Context là gì?

**Execution Context** (Ngữ cảnh thực thi) là môi trường nơi mã JavaScript được chạy. Mỗi đoạn mã đều cần một Execution Context để xác định:

- **Biến** nào có thể truy cập được.
- **Hàm** nào được gọi.
- **Phạm vi** (Scope) của mã đó.

#### 3 loại Execution Context chính
1. **Global Execution Context**:
   - Được tạo ra khi mã bắt đầu chạy.
   - Biến toàn cục và hàm toàn cục được định nghĩa tại đây.

2. **Function Execution Context**:
   - Mỗi khi một hàm được gọi, một Execution Context mới sẽ được tạo.

3. **Eval Execution Context** (ít dùng):
   - Được tạo khi bạn chạy mã bằng `eval()`.

#### Ví dụ

```javascript
let name = 'JavaScript'; // Global Execution Context

function greet() { // Function Execution Context
  let greeting = 'Hello';
  console.log(`${greeting}, ${name}!`);
}

greet();
```

**Kết quả**:
```
Hello, JavaScript!
```

**Giải thích**:
- `name` được định nghĩa trong Global Execution Context, nên `greet()` có thể truy cập được.
- Khi gọi `greet()`, một Function Execution Context mới được tạo ra, chứa biến `greeting`.

## Function trong Execution Context

Hàm không chỉ đơn thuần là khối mã. Khi một hàm được gọi, JavaScript thực hiện các bước sau:

1. **Tạo Function Execution Context**: Bao gồm biến, tham số, và từ khóa `this`.
2. **Thực thi mã trong hàm**.

#### Ví dụ

```javascript
function sum(a, b) {
  const result = a + b;
  return result;
}

const total = sum(5, 10);
console.log(total);
```

**Kết quả**:
```
15
```

**Giải thích**:
- Khi gọi `sum(5, 10)`, JavaScript tạo một Execution Context mới cho hàm `sum`.
- Biến `result` được lưu trữ trong phạm vi của hàm và không thể truy cập từ bên ngoài.

**Tính thực tiễn**
Hiểu cách Execution Context hoạt động sẽ giúp bạn xác định lỗi liên quan đến biến hoặc phạm vi trong mã.

## Call Stack: Quản lý thứ tự thực thi

**Call Stack** là cơ chế JavaScript sử dụng để quản lý thứ tự thực thi các hàm.

- Khi một hàm được gọi, nó sẽ được "đẩy" vào Call Stack.
- Khi hàm kết thúc, nó sẽ được "loại bỏ" khỏi Call Stack.

#### Ví dụ

```javascript
function first() {
  console.log('This is the first function');
  second();
}

function second() {
  console.log('This is the second function');
}

first();
```

**Kết quả**:
```
This is the first function
This is the second function
```

#### Sequence

```sequence
participant Global
participant first
participant second

Global->first: Call first()
first->second: Call second()
second-->first: Return from second()
first-->Global: Return from first()
```

1. **Khởi đầu**: Global Execution Context được đẩy vào Call Stack.
2. **Gọi `first()`**: Function Execution Context của `first` được đẩy vào Call Stack.
3. **Gọi `second()`**: Function Execution Context của `second` được đẩy vào Call Stack.
4. **Kết thúc `second()`**: Context của `second` bị loại bỏ khỏi Call Stack.
5. **Kết thúc `first()`**: Context của `first` bị loại bỏ khỏi Call Stack.

## Kết luận và ứng dụng thực tế

Hiểu rõ **Execution Context**, **Function**, và **Call Stack** giúp bạn:

1. **Dễ dàng gỡ lỗi**: Ví dụ, khi gặp lỗi "Maximum call stack size exceeded", bạn có thể nhanh chóng kiểm tra vòng lặp vô hạn trong Call Stack.
2. **Viết mã tối ưu hơn**: Nắm rõ cách hoạt động của Execution Context sẽ giúp bạn kiểm soát tốt hơn phạm vi biến và hiệu suất.
3. **Hiểu sâu hơn các khái niệm nâng cao**: Các chủ đề như Closure, Hoisting, và Async/Await đều dựa trên những nguyên tắc này.

## Bài học rút ra

- **Execution Context** là môi trường nơi mã JavaScript được thực thi.
- **Function Execution Context** được tạo mỗi khi hàm được gọi.
- **Call Stack** quản lý thứ tự thực thi, giúp chương trình hoạt động tuần tự.

Nắm vững ba nguyên tắc này sẽ giúp bạn hiểu rõ hơn cách JavaScript hoạt động, từ đó viết mã sẽ hiệu quả và dễ bảo trì hơn. Hãy thử áp dụng ngay vào các dự án của bạn nhen!