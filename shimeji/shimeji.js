const btn = document.getElementById("btn")
const inputDos = document.getElementById("input2")
const audioContainer = document.getElementById("audio-container")

var boolean = true;
btn.onclick = () =>{
    if (boolean){
        worker.postMessage(["activar","susie"])
        boolean = false
    }
    else{
        worker.postMessage(["desactivar"])
        boolean = true
    }
}

inputDos.addEventListener("change",(e)=>{
    switch (inputDos.value){
        case "susie":
            crearShimeji(inputDos.value)
            break
        case "ralsei":
            crearShimeji(inputDos.value)
            break
        case "kris":
            crearShimeji(inputDos.value)
            break
        case "lancer":
            crearShimeji(inputDos.value)
            break
        default:
            alert("error")
    }
    inputDos.value = ""
})


const crearShimeji = (shimejiCreate)=>{
    let shimejiElement = document.createElement("DIV")
    shimejiElement.classList.add(`${shimejiCreate}`)
    shimejiElement.classList.add("shimeji")
    shimejiElement.style.left = "300px"
    shimejiElement.style.bottom = "200px"
    shimejiElement.style.backgroundImage = `url("shimeji/${shimejiCreate}/spr_${shimejiCreate}d(0).png")`
    document.body.append(shimejiElement)
    let shimeji = document.querySelectorAll(".shimeji")
    let index;

    for (let i=0; i < shimeji.length;i++){
        if(shimeji[i].getAttribute("class").includes(`${shimejiCreate}`)){
            index = i
        }
    }
    const worker = new Worker("workerShimeji.js");

    const audio = new Audio(`shimeji/${shimejiCreate}/sound/${shimejiCreate}Esp.mp3`);

    worker.postMessage(["activar",shimejiCreate])
    let elementStyle = document.createElement("STYLE")
    elementStyle.textContent = `
    @keyframes caminarR${shimejiCreate} {
        25% {
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}r(1).png");
        }
        
        50% {
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}r(0).png");
        }
    
        75% {
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}r(3).png");
        }
        100% {
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}r(0).png")
        }
    }
    
    @keyframes caminarL${shimejiCreate} {
        25% {
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}l(1).png");
        }
        
        50% {
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}l(0).png");
        }
    
        75% {
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}l(3).png");
        }
        100% {
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}l(0).png")
        }
    }
    
    @keyframes caminarB${shimejiCreate} {
        25% {
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}d(1).png");
        }
        
        50% {
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}d(0).png");
        }
    
        75% {
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}d(3).png");
        }
        100% {
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}d(0).png")
        }
    }
    
    @keyframes caminarT${shimejiCreate} {
        25% {
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}u(1).png");
        }
        
        50% {
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}u(0).png");
        }
    
        75% {
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}u(3).png");
        }
        100% {
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}u(0).png")
        }
    }
        
    @keyframes esp_${shimejiCreate} {
        16.6% {
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}_esp(0).png");
        }
        33.2%{
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}_esp(1).png");
        }
        49.8%{
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}_esp(2).png");
        }
        66.4%{
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}_esp(3).png");
        }
        83%{
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}_esp(4).png");
        }
        100%{
            background-image: url("shimeji/${shimejiCreate}/spr_${shimejiCreate}_esp(5).png")
        }
    }`
    document.head.appendChild(elementStyle)
    
    let left = parseInt(shimejiElement.style.left)
    let bottom = parseInt(shimejiElement.style.left)
    worker.addEventListener("message",(e)=>{
        if (e.data[0] == "animation"){
            shimejiElement.style.animation = e.data[1]
            shimejiElement.style.backgroundImage = `url("${e.data[2]}")`
        }


        if (parseInt(shimejiElement.style.left) >= document.body.clientWidth){
            if (e.data[0] == "left"){
                shimejiElement.style.left = parseInt(shimejiElement.style.left) - e.data[1] + "px"
                left = parseInt(shimejiElement.style.left)         
            }
        }else if (parseInt(shimejiElement.style.left) <= 0) {
            if (e.data[0] == "left"){
                shimejiElement.style.left = "0px"
                left = 0
            }
            else if (e.data[0] == "right"){
                left = e.data[1] + left
                shimejiElement.style.left = left + "px"                
            }
        } else if (parseInt(shimejiElement.style.bottom) <= 0) {
            if (e.data[0] == "bottom"){
                shimejiElement.style.bottom = "0px"
                bottom = 0
            }
            else if (e.data[0] == "top"){
                shimejiElement.style.bottom = parseInt(shimejiElement.style.bottom) + e.data[1] + "px"
                bottom = parseInt(shimejiElement.style.bottom)          
            }
        } else if (parseInt(shimejiElement.style.bottom) >= document.body.clientHeight) {
            if (e.data[0] == "bottom"){
                shimejiElement.style.bottom = parseInt(shimejiElement.style.bottom) - e.data[1] + "px"
                bottom = parseInt(shimejiElement.style.bottom)  
            }
            else if (e.data[0] == "top"){     
            }
        }
        else {
            if (e.data[0] == "right"){
                left = e.data[1] + left
                shimejiElement.style.left = left + "px"                
            }else if (e.data[0] == "left"){
                shimejiElement.style.left = parseInt(shimejiElement.style.left) - e.data[1] + "px"
                left = parseInt(shimejiElement.style.left)         
            }else if (e.data[0] == "bottom"){
                shimejiElement.style.bottom = parseInt(shimejiElement.style.bottom) - e.data[1] + "px"
                bottom = parseInt(shimejiElement.style.bottom)         
            } else if (e.data[0] == "top"){
                shimejiElement.style.bottom = parseInt(shimejiElement.style.bottom) + e.data[1] + "px"
                bottom = parseInt(shimejiElement.style.bottom)         
            }
        }
    
        if (e.data[0] == "especial"){
            audio.play();
        }

        if (isNaN(parseInt(shimejiElement.style.left)))left = 0
        if (isNaN(parseInt(shimejiElement.style.bottom)))bottom = 0
    });
}




