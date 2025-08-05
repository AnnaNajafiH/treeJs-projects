# Three.js Rotating Cube

A simple Three.js project that displays a rotating 3D cube in the browser.

![Rotating Cube Demo](https://threejs.org/manual/resources/images/threejs-1cube-001.png)

## Project Overview

This project demonstrates the basic usage of Three.js to create and animate a 3D object (a cube) in a web browser. The cube rotates continuously on its X and Y axes, creating a dynamic 3D scene.

## Features

- 3D cube rendered with Three.js
- Continuous rotation animation
- Responsive design (adapts to window size)
- Phong material with lighting effects
- Dark background for better contrast

## Technologies Used

- [Three.js](https://threejs.org/) - A JavaScript 3D library
- ES6 Modules
- HTML5 & CSS3
- npm & serve (for local development)

## Project Structure

```
treejs-project/
├── index.html      # Main HTML file
├── style.css       # CSS styling
├── main.js         # Three.js implementation
├── package.json    # Project configuration
└── README.md       # Project documentation
```

## How to Run

1. Clone or download this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the local server:
   ```
   npx serve
   ```
4. Open your browser and navigate to `http://localhost:3000`

## Code Explanation

### HTML (index.html)

The HTML file is minimal, containing only the necessary structure to load the JavaScript module and CSS styles.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Three.js Rotating Cube</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <script type="module" src="main.js"></script>
</body>
</html>
```

Note the `type="module"` attribute on the script tag, which is essential for using ES6 modules.

### CSS (style.css)

The CSS file sets up a full-screen canvas:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    overflow: hidden;
    width: 100%;
    height: 100vh;
}
```

### JavaScript (main.js)

The main.js file contains all the Three.js code for creating and animating the cube. Key components include:

1. **Scene setup** - Creating the Three.js scene, camera, and renderer
2. **Cube creation** - Defining geometry, material, and mesh
3. **Lighting** - Adding directional and ambient lights
4. **Animation** - Implementing the animation loop for rotation
5. **Responsiveness** - Handling window resize events

## My Challenges and Solutions

### Challenge 1: Module Import Error

**Problem:** When using the standard Node.js import syntax, browsers throw an error:

```
Uncaught TypeError: Failed to resolve module specifier "three". 
Relative references must start with either "/", "./", or "../".
```

**Solution:** Use a direct URL to the Three.js module on a CDN:

```javascript
// Original (doesn't work in browser)
import * as THREE from 'three';

// Fixed version (works in browser)
import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
```

**Explanation:** Browser ES modules require full URLs or relative paths starting with `/`, `./`, or `../`. They cannot resolve bare module specifiers like Node.js can. Using a CDN like unpkg provides a way to load npm packages directly in the browser.

### Challenge 2: Canvas Sizing

**Problem:** By default, the Three.js renderer doesn't fill the entire window.

**Solution:** Set the renderer size to match the window dimensions and update on resize:

```javascript
// Set initial size
renderer.setSize(window.innerWidth, window.innerHeight);

// Handle resizing
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
```

## Extending the Project

Here are some ideas to extend this basic project:

1. Add orbit controls to allow user interaction
2. Apply textures to the cube faces
3. Add more 3D objects to create a complex scene
4. Implement more advanced animations
5. Add GUI controls to adjust parameters in real-time

## Resources

- [Three.js Documentation](https://threejs.org/docs/index.html)
- [Three.js Examples](https://threejs.org/examples/)
- [Three.js Fundamentals](https://threejs.org/manual/#en/fundamentals)
- [ES6 Modules in Browsers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

## License

This project is open source 

## Anna 