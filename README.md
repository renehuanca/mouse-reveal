# mouse-reveal

Lightweight JavaScript library for creating dynamic **masking effects** based on mouse movement.

![GIF de Mouse Reveal](https://github.com/pixelgrub/mouse-reveal/blob/bac32fe24463a9c57eb40197840f244b6e87666a/packages/lib/src/assets/mouse-reveal.gif)

## 🌟 Features

- Easy-to-use.
- Customizable maxSize.
- Lightweight and fast.
- Works in modern browsers with CSS.
- No dependencies.

## Usage

To use mouse-reveal, simply create an instance of the `mouse-reveal` class and pass the target element and optional settings.

```html
<div id="mask">
  <!-- back -->
  <div>back</div>
  <!-- front -->
  <div>front</div>
</div>

<script>
  new MouseReveal("#mask");
</script>
```

## 🚀 Installation

You can use mouse-reveal in your project either by downloading the files or installing via npm.

### Option 1: CDN

### Option 2: Install via npm

If you're using npm, you can install mouse-reveal with the following command:

```bash
npm install mouse-reveal
```

### Options

You can customize the following options when initializing the mouse-reveal instance:

- **`color`**: The color of the mask (default: `black`).
- **`maxSize`**: The size of the mask (default: `240px`).

#### Example with Custom Options:

```js
	new MouseReveal("#mask", {
		maxSize: 240,
		minSize: 0,
		background: "#fce7f3",
	});
```

## 🛠️ Methods

----

## 🌍 Browser Support

mouse-reveal works in modern browsers

- Chrome
- Firefox
- Safari
- Edge

## 💡 Contributing

We welcome contributions! If you'd like to contribute, feel free to fork the repository, make improvements, and submit a pull request.

### How to Contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## 📄 License

mouse-reveal is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

**mouse-reveal** is built with 💙 and is designed to make adding dynamic mask effects super easy and fun!


