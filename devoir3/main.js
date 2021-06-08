document.querySelectorAll('.draggableDiv').forEach(div => {
    div.onmousedown = function(e) {
        draggableDivs = document.querySelectorAll('.draggableDiv');

        // on enregistre l'ordre d'empilement z initial du div qu'on vas mettre à l'avant-plan
        zIndexInitial = parseInt(div.style.zIndex);

        // on effectue les changement d'ordre d'empilement z sur toutes les images 
        for(i = 0; i < draggableDivs.length; i++) {
            if(draggableDivs[i].style.zIndex == zIndexInitial) {
                // le div actuel est celui avec lequel l'utilisateur vient d'interagir; on veut le mettre à l'avant-plan
                // on lui donne l'index z maximal, qui correspond au nombre de divs existants
                draggableDivs[i].style.zIndex = draggableDivs.length;
            } else if(draggableDivs[i].style.zIndex > zIndexInitial) {
                // le div actuel était empilé par-dessus le div avec lequel l'utilisateur vient d'interagir; on veut réduire son ordre dans l'empilement
                // on soustrait 1 à son ordre d'empilement précédent
                draggableDivs[i].style.zIndex = parseInt(draggableDivs[i].style.zIndex) - 1;
            }
        }
        // une fois cette boucle exécuté, toutes les images ont encore des indexes d'empilement z dans [1, <nombre de divs>].
        // l'ordre d'empilement relatif d'une image à une autre reste identique sauf pour l'image que l'on vient de mettre au premier plan.
        
        // il semble y avoir un décalage entre le style appliqué à l'image (ce qu'on controlle réellement pour la déplacer) et ce que getBoundingClientRect retourne. cette solution élimine le "saut" que fait l'image au tout début du déplacement
        offsetX = parseInt(div.style.left) - e.clientX;
        offsetY = parseInt(div.style.top) - e.clientY;

        window.onmousemove = function(e) {
            div.style.left = offsetX + e.clientX + "px";
            div.style.top = offsetY + e.clientY + "px";
        }

        window.onmouseup = function(e) {
            window.onmousemove = null;
            window.onmouseup = null;
        }
    }
});

function placeImg(img) {
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 250; //avec clientwidth ça retourne 0 pcq pas défini dans le CSS; à régler

    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
}

function placeImgs() {
    draggableDivs = document.querySelectorAll('.draggableDiv');
    for(i = 0; i < draggableDivs.length; i++) {
        // on spécifie un ordre d'empilage z initial; les valeurs occupent la plage [1, <nombre de divs>]
        draggableDivs[i].style.zIndex = i + 1;
        // on place les images dans l'espace x y
        placeImg(draggableDivs[i]);
    }
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