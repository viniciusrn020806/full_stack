let canvas = document.getElementById("animacao")
let ctx = canvas.getContext ('2d')



let neymar = {
    x: 150,
    y: 150,
    raio: 30,
    img: new Image(),
    desenha: function(){
        this.img.src='neymar.png';
        ctx.beginPath();
        ctx.drawImage(this.img, this.x - this.raio, this.y - this.raio, 2*this.raio, 2*this.raio);
        ctx.closePath();
    }
}
function animacao(){
    ctx.clearRect(0,0,300,300)
    neymar.desenha();
    requestAnimationFrame(animacao)
}
animacao();
document.addEventListener('mousemove',function(evento){
    let rect = canvas.getBoundingClientRect();
    let x_mouse = evento.clientX - rect.left;
    let y_mouse = evento.clientY - rect.top;
    console.log(x_mouse,y_mouse);
    neymar.x = x_mouse;
    neymar.y = y_mouse;
    
    let limiteX = canvas.width - neymar.raio;  // Limite horizontal (direita)
    let limiteY = canvas.height - neymar.raio;  // Limite vertical (baixo)

  

})
