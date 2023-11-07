const glassColorInput = document.getElementById('glass-color'); 
const glassTransInput = document.getElementById('glass-transparency'); 
const glassBlurInput = document.getElementById('glass-blur'); 
const glassBorderInput = document.getElementById('glass-border');
const glassBorderRadInput = document.getElementById('glass-border-radius');


function getrgbaColor(hex, glassTransInput) {
        var rgb = hexToRgb(hex);
        var rgbString = "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + glassTransInput + ")";
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


function UpdateGlassStyle(){
    const glassResBoxes = document.getElementsByClassName('glass-box-res');
    const glassColor = glassColorInput.value;
    const glassTrans = glassTransInput.value;
    const glassBlur = glassBlurInput.value;
    const glassBorder = glassBorderInput.value;
    const glassBorRad = glassBorderRadInput.value + 'px';
    const glassRgbaColor = getrgbaColor(glassColor, glassTrans);
    const glassBackground = `${glassRgbaColor}`;


    document.getElementById('background-color').textContent = 'background: ' + glassBackground + ';';
    document.getElementById('box-shadow-css').textContent = 'box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);';
    document.getElementById('border-radius-css').textContent = 'border-radius: ' + glassBorRad+ ';';
    document.getElementById('blur-css').textContent = 'backdrop-filter: ' + 'blur(' + glassBlur + 'px)'  +';';
    document.getElementById('glass-webkit-css').textContent = '-webkit-backdrop-filter: ' + 'blur(' + glassBlur + 'px)' +';';
    document.getElementById('glass-border-css').textContent = 'border: 1px solid ' + 'rgba(255,255,255,'+ glassBorder + ');';

    document.getElementById('glass-cl').textContent = glassColor;
    document.getElementById('glass-transPX').textContent = glassTrans;
    document.getElementById('glass-bluPX').textContent = glassBlur;
    document.getElementById('glass-borPX').textContent = glassBorder;
    document.getElementById('glass-borRadPX').textContent = glassBorRad;
    



    for (let i = 0; i < glassResBoxes.length; i++) {
    const glassResBox = glassResBoxes[i];

    glassResBox.style.backgroundColor = glassRgbaColor;
    glassResBox.style.border = `1px solid rgba(255, 255, 255, ${glassBorder})`;
    glassResBox.style.borderRadius = glassBorRad;
    glassResBox.style.webkitBackdropFilter = 'blur(' + glassBlur + 'px)';
    glassResBox.style.backdropFilter = 'blur(' + glassBlur + 'px)';
    }


    // console.log(glassResBox);

}

glassColorInput.addEventListener('input', UpdateGlassStyle);
glassTransInput.addEventListener('input', UpdateGlassStyle);
glassBorderRadInput.addEventListener('input', UpdateGlassStyle);
glassBlurInput.addEventListener('input', UpdateGlassStyle);
glassBorderInput.addEventListener('input', UpdateGlassStyle);

UpdateGlassStyle();




    const glassStyleCSS = document.getElementById('glass-css-inner').textContent;
    const copyGlassStyle = document.getElementById('glass-copy-clip');
 
    copyGlassStyle.addEventListener('click', () => {
       const glassRange = document.createRange();
       const glassText = document.getElementById('glass-css-inner');
       glassRange.selectNode(glassText);
       window.getSelection().removeAllRanges();
       window.getSelection().addRange(glassRange);
       document.execCommand('copy');
       window.getSelection().removeAllRanges();

       document.getElementById('glass-copy-clip').textContent = "Successfully Copied!";

       
    // Reset the text after 2 seconds
    setTimeout(() => {
        document.getElementById('glass-copy-clip').textContent = "Copy css to clipboard";

       }, 2000);
    });