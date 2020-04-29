
const typeWriter = function (txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

typeWriter.prototype.type = function() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if(this.isDeleting){
        this.txt = fullTxt.substring(0, this.txt.length - 1)

    }else{
        this.txt = fullTxt.substring(0, this.txt.length + 1)
    }
    //Insert Text into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //Initial Type speed
    let typeSpeed = 300;

    if(this.isDeleting){
        typeSpeed /= 2;
    }
    //If word is Complete
    if(!this.isDeleting && this.txt === fullTxt){
        //Pause at the last
        typeSpeed = 2500;
        //set delete to true
        this.isDeleting = true;
    }else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        //Move to next word
        this.wordIndex++;
        typeSpeed = 500;
    
    }
    if (this.isDeleting === false && this.txt === '') {
        clearInterval(this.blinker);
    } 
    setTimeout(() => this.type(), typeSpeed);
}

document.addEventListener('DOMContentLoaded', init);

function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait =txtElement.getAttribute('.data-wait');

    new typeWriter(txtElement, words, wait);
}




