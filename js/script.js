// Select all elements with the class "box"
const boxes = document.querySelectorAll('.box');

// Loop through each box and set its content to its index + 1
boxes.forEach((box, index) => {
    box.innerHTML = '# ' + (index + 1);
});



document.addEventListener('DOMContentLoaded', function () {
    // Select all elements with the class "box"
    const boxes = document.querySelectorAll('.box');

    // Function to copy the box-shadow style to the clipboard
    function copyBoxShadowStyle(event, index) {
        const box = event.currentTarget;
        const computedStyle = getComputedStyle(box);
        const boxShadowStyle = computedStyle.boxShadow;

        // Create a temporary text area to copy the style
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = `box-shadow: ${boxShadowStyle};`;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);

        // Provide visual feedback (e.g., change the content)
        box.innerHTML = 'Copied!';

        setTimeout(() => {
            box.innerHTML = `# ${index + 1}`;
        }, 2000); // Reset the content after 1 second
    }

    // Attach the click event listener to each box
    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        box.innerHTML = `# ${i + 1}`; // Set initial content

        box.addEventListener('click', (event) => copyBoxShadowStyle(event, i));
    }
});

// adding auto id each boxes

let boxesID = document.querySelectorAll('.box');

for (let i = 0; i < boxesID.length; i++) {
    const box = boxesID[i];
    box.setAttribute('id', `box${i}`);
}



// scroll
var prevScrollpos = window.scrollY;
var scrollArrow = document.getElementById('arrow-up');

window.onscroll = function() {
  var currentScrollPos = window.scrollY;
  if (currentScrollPos >= 300) {
    scrollArrow.classList.add('show-scroll');
  } else {
    scrollArrow.classList.remove('show-scroll');
  }
  prevScrollpos = currentScrollPos;
}

scrollArrow.addEventListener('click', () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
});

//show share container
let ShareCont = document.getElementById('toggle-share-cont');
let CloseShareCont = document.getElementById('close-share-cont');
let ShareCat = document.getElementById('share-category');
ShareCont.addEventListener('click', () => {
    ShareCat.style.display = "flex";
});
CloseShareCont.addEventListener('click', () => {
    ShareCat.style.display = "none";

});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        ShareCat.style.display = "none";
    }
});


// get the url on the browser
const currentURL = window.location.href;
console.log(currentURL);
document.getElementById('ShadowCraft').value = currentURL;

// copy the link
const copyLinkButton = document.getElementById('copy-Link');
const inputElement = document.getElementById('ShadowCraft');

copyLinkButton.addEventListener('click', () => {
    // Select the text in the input field
    inputElement.select();
    
    try {
        // Copy the selected text to the clipboard
        document.execCommand('copy');
        console.log('Link copied to clipboard: ' + inputElement.value);
        let linkCopy = document.getElementById('link-copied');
        linkCopy.innerHTML = "Link copied to clipboard!";

        setTimeout( () => {
            linkCopy.innerHTML = "";
        },2000)

    } catch (err) {
        console.error('Failed to copy: ', err);
    }

    // Deselect the input field
    inputElement.setSelectionRange(0, 0);
});
