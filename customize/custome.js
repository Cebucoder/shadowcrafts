let insetButton = document.getElementById('toggle-inset');
    let insetToggle = document.getElementById('inset-circ');
    let inset = false;

    insetButton.addEventListener('click', () => {
        insetToggle.classList.toggle('inset-circ-toggle');
        inset = !inset; // Toggle the inset value
        updateBoxShadow(); // Call the function to update the box-shadow
    });

    const box = document.getElementById('preview-box');
    const horizontalInput = document.getElementById('horizontal');
    const verticalInput = document.getElementById('vertical');
    const blurInput = document.getElementById('blur');
    const opacityInput = document.getElementById('opacity');
    const colorInput = document.getElementById('color');
    const spreadInput = document.getElementById('spread');



    function getColor(hex, opacity) {
        var rgb = hexToRgb(hex);
        var rgbString = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + opacity + ")";
        return rgbString;
      }
      
      function hexToRgb(hex) {
          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          } : null;
      }   


      function applyBoxShadow(boxShadow) {
        box.style.boxShadow = boxShadow;
        // Save the applied box shadow to local storage
        localStorage.setItem('boxShadow', boxShadow);
    }

    function updateBoxShadow() {

        const horizontal = horizontalInput.value + 'px';
        const vertical = verticalInput.value + 'px';
        const blur = blurInput.value + 'px';
        const opacity = opacityInput.value;
        const spread = spreadInput.value + 'px';
        const color = colorInput.value;
        const insetProperty = inset ? 'inset ' : ''; // Include the 'inset' property based on the 'inset' variable
        const rgbaColor = getColor(color, opacity); // Convert hex to RGBA
        const boxShadow = `${insetProperty}${horizontal} ${vertical} ${blur} ${spread} ${rgbaColor}`;
        box.style.boxShadow = boxShadow;
        console.log(boxShadow);
        document.getElementById('shadow-result').textContent = 'box-shadow: ' +  boxShadow + ';';
        document.getElementById('hrPX').textContent = horizontal;
        document.getElementById('vrPX').textContent = vertical;
        document.getElementById('brPX').textContent = blur;
        document.getElementById('orPX').textContent = opacity;
        document.getElementById('srPX').textContent = spread;
        document.getElementById('clPX').textContent = color;

    }
    
    

    horizontalInput.addEventListener('input', updateBoxShadow);
    verticalInput.addEventListener('input', updateBoxShadow);
    blurInput.addEventListener('input', updateBoxShadow);
    opacityInput.addEventListener('input', updateBoxShadow);
    colorInput.addEventListener('input', updateBoxShadow);
    spreadInput.addEventListener('input', updateBoxShadow);

    // Initial update
    updateBoxShadow();


    const shadowResult = document.getElementById('shadow-result');

    shadowResult.addEventListener('click', () => {
        // Create a range and copy the text to the clipboard
        const range = document.createRange();
        range.selectNode(shadowResult);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    
        // Store the copied text before updating the element
        const copiedText = shadowResult.textContent;
    
        // Provide feedback to the user
        let SuccessCopied = document.getElementById('success-copied');
        SuccessCopied.style.display ="flex";
        
        // Reset the text after 2 seconds
        setTimeout(() => {
            SuccessCopied.style.display ="none";
            shadowResult.textContent = copiedText;
        }, 2000);
    
        // Log a message to the console
        console.log('Style copied to clipboard: ' + copiedText);
    });
