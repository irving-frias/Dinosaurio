var count = 0;
document.addEventListener('keydown', function(evento){
    if(evento.keyCode== 32){
        count++;
        console.log("salta");
        if (nivel.muerto == false )
        saltar();
        else{
            nivel.velocidad= 6;
            nube.velocidad= 3;
            cactus.x= ancho+100;
            nube.x= 400;
            nivel.marcador= 0;
            nivel.muerto= false;

            //if (count > 2){
            //    negroveloz.vy=0;
            //}
        } 
       
    }
});

var imgNegro, imgMaribel, imgSuelo, imgNube;

function cargaImagenes(){
    imgNegro= new Image();
    imgMaribel= new Image();
    imgSuelo= new Image();
    imgNube= new Image();

    imgNegro.src= 'imagenesvideo/cjj.png';
    imgMaribel.src= 'imagenesvideo/maribell.png';
    imgSuelo.src= 'imagenesvideo/pisoo.png';
    imgNube.src= 'imagenesvideo/nubee.png';
}


var alto=700;
var ancho=300;
var canvas,ctx;

function inicializa(){
canvas= document.getElementById('canvas');
ctx= canvas.getContext('2d');
cargaImagenes();
}

function borrarCanvas(){
 canvas.width = ancho;
 canvas.height = alto;
}
var suelo=350;
var negroveloz = {y: suelo, vy:0, gravedad:2, salto:35, vymax:9, saltando: false};
var nivel = {velocidad:6, marcador:0, muerto:false};
var velo = {velocidad:4};
var cactus = {x: ancho+100,y: suelo-20};
var nube ={x:400,y:100, velocidad:3};
var suelog ={x:0,y:suelo+50};

function dibujaNegro(){
    ctx.drawImage(imgNegro,0,0,297,393,25,negroveloz.y,50,250);
}


//-------------------------------------------------------------------------------------------------------



function dibujaCactus(){
    ctx.drawImage(imgMaribel,0,0,720,720,cactus.x,cactus.y,100,290);
}

function logicaCactus(){
    if (cactus.x < -100){
        cactus.x = ancho+100;
        nivel.marcador++;
        if (nivel.marcador>=5 && nivel.marcador>=10 && nivel.marcador>=14 && nivel.marcador>=20){
            nivel.velocidad++;
        }
    }
    else{
        cactus.x -= nivel.velocidad;
    }
}

//--------------------------------------------------------------------------------------------------------



function dibujaSuelo(){
    ctx.drawImage(imgSuelo,suelog.x,0,310,310,0,suelog.y,610,360);
}

function logicaSuelo(){
    if (suelog.x>150){
        suelog.x=0;
    }
    else{
        suelog.x +=nivel.velocidad;
    }
}


//---------------------------------------------------------------------------------------------------------

function dibujaNube(){
    ctx.drawImage(imgNube,0,0,512,409,nube.x,nube.y,50,130);
}

function logicaNube(){
    if (nube.x < -100){
        nube.x = ancho+100;
    }
    else{
        nube.x -= nube.velocidad;
    }
}

//------------------------------------------------------------------------------------------------------------

function saltar(){
    negroveloz.saltando = true;
    negroveloz.vy       = negroveloz.salto;
   // console.log(negroveloz.y);
    //if (negroveloz.y < 50) {
     //   negroveloz.saltando = false;
       // negroveloz.y = 300;
        //alert('No haga trampa compaaaa');
    //}
}

function gravedad(){
    if (negroveloz.saltando == true){
    
        if (negroveloz.y - negroveloz.vy - negroveloz.gravedad > suelo){
            negroveloz.saltando = false;
            negroveloz.vy       = 0;
            negroveloz.y        = suelo;
        }
        else {
            negroveloz.vy -= negroveloz.gravedad;
            negroveloz.y -= negroveloz.vy;   
        }
        
  }
}

function colision(){
//cactus.x
//negroveloz.y
 if (cactus.x>= 25 && cactus.x<=38){
     if(negroveloz.y>=suelo-200){
         nivel.muerto=true;
         nivel.velocidad=0;
         nube.velocidad=0;
     }
 }
}


function puntuacion(){
    ctx.font="40px impact";
    ctx.fillStyle= "#000000";
    ctx.fillText(nivel.marcador,250,60);
    if (nivel.muerto==true){
        ctx.font="50px Arial Black";
        ctx.fillText('WASTED NIGGA',30,300,100,100);
    }
}

//........................................................................................................
//Aqui ya viene lo chido




var FPS= 50;
setInterval(function(){
    principal();
},1000/FPS);





function principal(){
    borrarCanvas();
    gravedad();
    colision();
    logicaSuelo();
    logicaCactus();
    logicaNube();
    dibujaSuelo();
    dibujaCactus();
    dibujaNube();
    dibujaNegro();
    puntuacion();
}
