
var borrarIntervalo;
var top;
var left;
var right;
var sound;
let intervalY;
let intervalX;
let intervalo;
let movimiento;
let countX = 0
let activado = true
let shimeji;
addEventListener("message",(e)=>{
    if (!intervalo && e.data[0] == "activar" && (e.data[1] != undefined && e.data[1] != "")){
    shimeji = e.data[1]
    intervalo = setInterval(()=>{
        movimiento = Math.floor(Math.random()*7)+1
        postMessage(["animation","",`shimeji/${shimeji}/spr_${shimeji}d(0).png`]);
        clearInterval(intervalY);
        intervalY = null;
        clearInterval(intervalX);
        intervalX = null;

        if (movimiento == 1) {
            postMessage(["animation",`caminarR${shimeji} 1s steps(2,jump-none) 0s 5`,`shimeji/${shimeji}/spr_${shimeji}r(0).png`])
            intervalX = setInterval(()=>{
                right = 5;
                postMessage(["right",right])
                countX++
                if (countX == 23){
                    countX = 0
                    clearInterval(intervalX)
                    intervalX = null
                    setTimeout(()=>postMessage(["animation","",`shimeji/${shimeji}/spr_${shimeji}d(0).png`]),300)
                }
            },200);
        } else if (movimiento == 2) {
            postMessage(["animation",`caminarL${shimeji} 1s steps(2,jump-none) 0s 5`,`shimeji/${shimeji}/spr_${shimeji}l(0).png`])
            intervalX = setInterval(()=>{
                left = 5;
                postMessage(["left",left])
                countX++
                if (countX == 23){
                    countX = 0
                    clearInterval(intervalX)
                    intervalX = null
                    setTimeout(()=>postMessage(["animation","",`shimeji/${shimeji}/spr_${shimeji}d(0).png`]),300)
                }
            },200);
        } else if (movimiento == 3) {
            postMessage(["animation",`caminarL${shimeji} 0.8s steps(2,jump-none) 0s 5`,`shimeji/${shimeji}/spr_${shimeji}l(0).png`])
            intervalX = setInterval(()=>{
                left = 10;
                postMessage(["left",left])
                countX++
                if (countX == 20){
                    countX = 0
                    clearInterval(intervalX)
                    intervalX = null
                    setTimeout(()=>postMessage(["animation","",`shimeji/${shimeji}/spr_${shimeji}d(0).png`]),300)
                }
            },200);
        } else if (movimiento == 4) {
            postMessage(["animation",`caminarR${shimeji} 0.8s steps(2,jump-none) 0s 5`,`shimeji/${shimeji}/spr_${shimeji}r(0).png`])
            intervalX = setInterval(()=>{
                right = 10;
                postMessage(["right",right])
                countX++
                if (countX == 20){
                    countX = 0
                    clearInterval(intervalX)
                    intervalX = null
                    setTimeout(()=>postMessage(["animation","",`shimeji/${shimeji}/spr_${shimeji}d(0).png`]),300)
                }
            },200);
        } else if (movimiento == 5) {
            postMessage(["animation",`caminarB${shimeji} 1s steps(2,jump-none) 0s 5`,`shimeji/${shimeji}/spr_${shimeji}d(0).png`])
            intervalX = setInterval(()=>{
                bottom = 5;
                postMessage(["bottom",bottom])
                countX++
                if (countX == 23){
                    countX = 0
                    clearInterval(intervalX)
                    intervalX = null
                    setTimeout(()=>postMessage(["animation","",`shimeji/${shimeji}/spr_${shimeji}d(0).png`]),300)
                }
            },200);
        } else if (movimiento == 6) {
            postMessage(["animation",`caminarT${shimeji} 1s steps(2,jump-none) 0s 5`,`shimeji/${shimeji}/spr_${shimeji}u(0).png`])
            intervalX = setInterval(()=>{
                top = 5;
                postMessage(["top",top])
                countX++
                if (countX == 23){
                    countX = 0
                    clearInterval(intervalX)
                    intervalX = null
                    setTimeout(()=>postMessage(["animation","",`shimeji/${shimeji}/spr_${shimeji}d(0).png`]),300)
                }
            },200);
        } else if (movimiento == 7) {
            postMessage(["animation",`esp_${shimeji} 1s steps(3,jump-none) 0s 4`,`shimeji/${shimeji}/spr_${shimeji}_esp(0).png`])
            postMessage(["especial","sound"])
            setTimeout(()=>postMessage(["animation","",`shimeji/${shimeji}/spr_${shimeji}d(0).png`]),5000)
        };
    
    },6500)
    
}else if (e.data[0] == "desactivar"){
    clearInterval(intervalo)
    intervalo = null
}
})