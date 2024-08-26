// horizontalColorPicker.js

const canvas = document.getElementById('colorPicker');
const ctx = canvas.getContext('2d');
const draggableLine = document.getElementById('draggableLine');
const selectedColor = document.getElementById('selectedColor');
const colorCode = document.getElementById('colorCode');
const hexInput = document.getElementById('hexInput');
const applyColorButton = document.getElementById('applyColor');

let dragging = false;

// Draw the horizontal color gradient
function drawColorGradient() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

    // Add color stops for the gradient
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.17, "yellow");
    gradient.addColorStop(0.33, "green");
    gradient.addColorStop(0.5, "cyan");
    gradient.addColorStop(0.67, "blue");
    gradient.addColorStop(0.83, "magenta");
    gradient.addColorStop(1, "red");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to update color based on line position
function updateColor(x) {
    const pixel = ctx.getImageData(x, canvas.height / 2, 1, 1).data;

    const rgbColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

    selectedColor.style.backgroundColor = rgbColor;
    colorCode.value = hexColor;
}

// Convert RGB to HEX
function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

// Convert HEX to RGB
function hexToRgb(hex) {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }

    return [r, g, b];
}

// Function to update draggable line based on HEX code
function updateLineFromHex(hex) {
    const [r, g, b] = hexToRgb(hex);
    const gradientImageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    
    let closestX = 0;
    let minDiff = Infinity;

    // Find the closest pixel in the gradient
    for (let x = 0; x < canvas.width; x++) {
        const index = (x + (canvas.height / 2) * canvas.width) * 4;
        const pr = gradientImageData[index];
        const pg = gradientImageData[index + 1];
        const pb = gradientImageData[index + 2];

        const diff = Math.sqrt((pr - r) ** 2 + (pg - g) ** 2 + (pb - b) ** 2);

        if (diff < minDiff) {
            minDiff = diff;
            closestX = x;
        }
    }

    draggableLine.style.left = `${closestX}px`;
    updateColor(closestX);
}

// Handle dragging
draggableLine.addEventListener('mousedown', (event) => {
    dragging = true;
});

document.addEventListener('mousemove', (event) => {
    if (dragging) {
        let x = event.clientX - canvas.getBoundingClientRect().left;
        if (x < 0) x = 0;
        if (x > canvas.width) x = canvas.width;
        
        draggableLine.style.left = `${x}px`;
        updateColor(x);
    }
});

document.addEventListener('mouseup', () => {
    dragging = false;
});

// Handle HEX input
applyColorButton.addEventListener('click', () => {
    const hex = colorCode.value.trim();
    if (/^#[0-9A-F]{6}$/i.test(hex) || /^#[0-9A-F]{3}$/i.test(hex)) {
        updateLineFromHex(hex);
    } else {
        alert('Invalid HEX code');
    }
});

// Handle clicks on the canvas
canvas.addEventListener('click', (event) => {
    const x = event.clientX - canvas.getBoundingClientRect().left;
    if (x >= 0 && x <= canvas.width) {
        draggableLine.style.left = `${x}px`;
        updateColor(x);
    }
});

// Initial draw
drawColorGradient();

// Initialize draggable line position and update color
const initialX = canvas.width / 2;
draggableLine.style.left = `${initialX}px`;
updateColor(initialX);
