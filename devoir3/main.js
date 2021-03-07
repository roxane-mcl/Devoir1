document.querySelectorAll('.draggableDiv').forEach(div => {
    div.onmousedown = function(e) {
        document.querySelectorAll('.draggableDiv').forEach(div => div.style.zIndex = 0);
        div.style.zIndex = 1;
        
        const rect = div.getBoundingClientRect();
        offsetX = rect.left - e.clientX;
        offsetY = rect.top - e.clientY;

        window.onmousemove = function(e) {
            div.style.left = e.clientX + offsetX +"px";
            div.style.top = e.clientY + offsetY +"px";
        }
        window.onmouseup = function(e) {
            window.onmousemove = null;
            window.onmouseup = null;
        }
    }
});




function placeImg(img) {
    const maxX = window.innerWidth - img.clientWidth;
    const maxY = window.innerHeight - img.clientHeight;

    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
}

function placeImgs() {
    document.querySelectorAll('.draggableDiv').forEach(placeImg);
}





window.onload = () => {
    placeImgs();
    setImgsDisplay();
    setDblClicks();
};






function setImgsDisplay() {
    document.querySelectorAll('.image1').forEach((img) => {
        img.style.display = 'block';
    });
    document.querySelectorAll('.image2').forEach((img) => {
        img.style.display = 'none';
    });
}

function toggleDisplay(event) {
    const target = event.target;
    const siblingClass = target.className == 'image1' ? '.image2' : '.image1'; // ternary (? == if, : == else) 
    const sibling = target.parentElement.querySelector(siblingClass);

    if (target.style.display == "block") {
        target.style.display = "none"
        sibling.style.display = "block"
    } else {
        target.style.display = "block";
        sibling.style.display = "none"
    }
}

function setDblClick(cls, callback) {
    document.querySelectorAll(cls).forEach((img) => {
        img.addEventListener("dblclick", callback);
    });
}

function setDblClicks() {
    setDblClick('.image1', toggleDisplay);
    setDblClick('.image2', toggleDisplay);
}