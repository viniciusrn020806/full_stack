let canvas2 = document.getElementById("canvas2")
let ctx2 = canvas2.getContext ('2d')

ctx2.beginPath();
ctx2.lineWidth = 2
ctx2.fillStyle = 'gray';
ctx2.fillRect(0,220,300,150);
ctx2.closePath();

ctx2.beginPath();
ctx2.lineWidth = 2;
ctx2.fillStyle = 'yellow';
ctx2.arc(220,80,40,2*Math.PI,0*Math.PI);
ctx2.fill();
ctx2.closePath();

ctx2.beginPath();
ctx2.lineWidth = 2
ctx2.fillStyle = 'brown';
ctx2.fillRect(120,150,60,70);
ctx2.closePath();

ctx2.beginPath();
ctx2.lineWidth = 2
ctx2.fillStyle = 'brown';
ctx2.fillRect(40,185,15,35);
ctx2.closePath();

ctx2.beginPath();
ctx2.lineWidth = 2
ctx2.fillStyle = 'brown';
ctx2.fillRect(250,230,15,35);
ctx2.closePath();

ctx2.beginPath();
ctx2.lineWidth = 2;
ctx2.fillStyle = 'green';
ctx2.arc(48,180,20,2*Math.PI,0*Math.PI);
ctx2.fill();
ctx2.closePath();

ctx2.beginPath();
ctx2.lineWidth = 2;
ctx2.fillStyle = 'green';
ctx2.arc(258,220,20,2*Math.PI,0*Math.PI);
ctx2.fill();
ctx2.closePath();

ctx2.beginPath();
ctx2.lineWidth = 2
ctx2.fillStyle = 'aqua';
ctx2.fillRect(155,162,20,20);
ctx2.closePath();

ctx2.beginPath();
ctx2.lineWidth = 2
ctx2.fillStyle = 'aqua';
ctx2.fillRect(126,162,20,20);
ctx2.closePath();

ctx2.beginPath();
ctx2.lineWidth = 2
ctx2.fillStyle = 'black';
ctx2.fillRect(143,183,16,37);
ctx2.closePath();

ctx2.beginPath();
ctx2.lineWidth = 2;
ctx2.fillStyle = 'orange';
ctx2.lineTo(150,120);
ctx2.lineTo(120,150);
ctx2.lineTo(180,150);
ctx2.fill();
ctx2.closePath();

ctx2.beginPath();
ctx2.lineWidth = 2;
ctx2.fillStyle = 'blue';
ctx2.arc(0,230,40,1.5*Math.PI,0.5*Math.PI);
ctx2.fill();
ctx2.closePath();

ctx2.beginPath();
ctx2.lineWidth = 2
ctx2.fillStyle = 'blue';
ctx2.fillRect(0,230,40,80);
ctx2.closePath();

ctx2.beginPath();
ctx2.lineWidth = 2
ctx2.fillStyle = 'blue';
ctx2.fillRect(30,260,80,70);
ctx2.closePath();

ctx2.beginPath();
ctx2.lineWidth = 2;
ctx2.fillStyle = 'blue';
ctx2.arc(100,300,40,1.5*Math.PI,0.5*Math.PI);
ctx2.fill();
ctx2.closePath();