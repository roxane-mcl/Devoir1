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
};