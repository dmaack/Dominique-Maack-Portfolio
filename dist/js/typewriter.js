const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0; // what charater to start on
    this.wait = parseInt(wait, 10); // base 10 number
    this.type();
    this.isDeleting = false; // represents if its deleteing or not
}

// Type Method
TypeWriter.prototype.type = function() {
    // get the current index of the word
    const current = this.wordIndex % this.words.length;
    // get the full text of current word
    const fullText = this.words[current];

    // check if deleting
    if(this.isDeleting) {
        // remove characters
        this.txt = fullText.substring(0, this.txt.length - 1);
    
    } else {
        // add a characters
        this.txt = fullText.substring(0, this.txt.length + 1);
    }

    // insert txt into element
    this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span>`

    // Initial Type Speed
    let typeSpeed = 300;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    // Check if word is complete
    if(!this.isDeleting && this.txt === fullText) {
        // Makes pause at end
        typeSpeed = 2000;
        // set deleteing to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // move to next word
        this.wordIndex++
        // pause before start typing
        typeSpeed = 500;
    }


    setTimeout(() => this.type(), typeSpeed)
}

// Init on DOM Load 
// event handler:
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-weight');
    // Initialize typewriter
    new TypeWriter(txtElement, words, wait);
}