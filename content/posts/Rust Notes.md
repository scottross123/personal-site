+++

title = "Rust Notes"
description = "Notes taken while working my through [the official Rust book](https://doc.rust-lang.org/book/title-page.html)"
date = 2022-11-29
tags = ["bread", "baking"]

+++

Some notes I took on Rust when I was trying to learn it last year

## Notes

- `rustc` to compile program to executable
- `!` to specific a function is a macro
- `cargo check` to check with code compiles without building an executable
- `cargo build --release` builds code for production
- `::` denotes *associated function*, called by the type (like string) (similar to Java static method)
- `Result` is an enum type for error handling. can either be `Ok` or `Err`. use in combination with `.expect("error message")` to display a message on error or just return the value on success.
- `Cargo.lock` keeps versions of crates the same as first build, `cargo update` updates crates
- `cargo doc --open` to generate documentation for your project and its crates (awesome)
- `Ordering` is another enum with `Less`, `Greater`, `Equal` for comparison
- `i32` (32 bit integer) is default type for numbers. signed integers are +/-, unsigned integers + only
- `trim()` to remove whitespace from a string
- `parse()` to convert a string to a number
- `loop` for infinite loop
- `let` can not be used in global scope, `const` can.
- `const` must be type annotated and is always immutable
- a variable is shadowed when it is declared in a new scope. a new variable is created, original is noted mutated.
- tuples are fixed length and can hold multiple data types, access elements with `.index`
- arrays are fixed length and can only only one data type, access elements with `[index]` 
- vectors can grow and shrink in size
- **statements** do not return values (ex: `let num = 5;` )
- **statements** always end in semi-colons
- **expressions** return values that can be saved to variables (ex: `4 + 4`, functions)
- **expressions** do not end in semi-colons, adding a semi-colon turns it into a statement.
- non-booleans **are not** converted to booleans in conditional expressions like in javascript
- `if` is an expression can be used like `let num = if condition { 5 } else { 6 }`
- can `break` parent loops using loop name
- loops are expressions and can be saved to variables
- stack = data is of known and fixed size
- heap = *allocate* data to pointer, pointer can be stored on stack
- ownership rules
	- each values has **one** owner
	- when the owner goes out of scope, the value is dropped

```rust
{
	let s = "hello";
	// s is valid
}
// function `drop` is automatically called
// s is no longer valid, it is dropped due to ownership rules
```

- string literals are immutable, `String` is mutable.
	- `let s = String::from("helo");` to create a `String` from string literal
- `::` calls function from namespace
- heap data is not copied when creating a new variable another variable, that new variable becomes a pointer

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("{}, world!", s1);
    // fails to compile, s1 is no longer valid.
    // this is to prevent double free error
    // called a move insead of a shallow copy
}

```
- `.clone()` for deep copies of data stored on heap
- types with `Copy` trait are copied rather than moved
		- all scalar types and tuples containing only scalars implement `Copy`
- passing a value to a function or returning it transfers ownership
- can return multiple values from a function with a tuple
- pass by references with `&` to avoid transferring ownership
- `&mut` to define a mutable references
	- if you have a mutable reference to a value, you can't have any other references to that variable. this is to prevent data races
	-  cant combine mutable and immutable references, no mutable borrowing
- `let slice = &s[..]` creates a slice of `s` from index 0 to 2.
- string literals are slices,  `&str`, immutable references
- `struct` fields are either all mutable or all immutable
- `struct` and struct update syntax similar to javascript objects and object destruct syntax
- struct update *moves* data
- *tuple structs* are basically named tuples, ex: `struct Color(i32, i32, i32)` or `struct Coordinate(i32, i32)`
- `#[derive(Debug)` over structs to add debug format when printing
- `dbg!` takes ownership, `println!` does not
- `impl` for creating associated methods for structs
- automatic referencing and dereferencing when calling methods
- use `Struct_Name::function()` to call an associated function
- methods can only be called on instance of a struct, functions are not
- can define enums with associated values like so
```
enum Message {
	Quit, 
	Move { x: i32, y: i32 }, 
	Write(String), 
	ChangeColor(i32, i32, i32), 
}
```
- can define methods on enums with `impl` same as you can with structs
- Rust does not have `null` types, use `Option<T>` enum
```
enum Option<T> {
    None,
    Some(T),
}
```
- `match` and `enum`
```rust
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => {
	        println!("Lucky penny!");
	        1
	    }
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}

```

- `match` and `Option`

```rust
fn main() {
    fn plus_one(x: Option<i32>) -> Option<i32> {
        match x {
            None => None,
            Some(i) => Some(i + 1),
        }
    }

    let five = Some(5);
    let six = plus_one(five);
    let none = plus_one(None);
}
```
- `match` arms must cover **all** possibilities
- `other` to cover all other possible values in `match`, use `__` when you don't want to use the value
- `if let` for shorthand match

```rust
let mut count = 0; 
match coin { Coin::Quarter(state) => println!("State quarter from {:?}!", state),
_ => count += 1, }
```
and

```rust
let mut count = 0; 
if let Coin::Quarter(state) = coin { 
	println!("State quarter from {:?}!", state); 
} else { 
	count += 1; 
}
```

are equivalent.
- binary crates are executable code with a `main` function; library crates have no `main` functions
- crate root is the root module of your crate
- a package is a bundle of 1+ crates, contains at most one library crate
- Cargo automatically looks for src/main.rs or src/lib.rs
- multiple binary crates can be place in src/bin
