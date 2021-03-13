const dino = document.getElementById("dino");

function jump() {
    if(dino.classList != "jump")
     {
        dino.classList.add("jump");

    setTimeout(function () {
        dino.classList.remove("jump");
    }, 400)
    }
    
} 

document.addEventListener("keydown", function (event) {
    jump(); 
    

})