//Ocultar todas las secciones
document.getElementById('two').style.display = 'none';
document.getElementById('three').style.display = 'none';
document.getElementById('four').style.display = 'none';
document.getElementById('final1').style.display = 'none';
document.getElementById('final2').style.display = 'none';
//Petición de nombre, generación de bienvenida personalizada y pase a siguiente sección (sección 2)
const welcomeGamer = function welcome(){
  const gamer = document.getElementById('name').value;
  if(gamer==''){
    alert('Debes ingresar un nombre para jugar.');}
  else{
    const choices = document.getElementById('choices');  
    choices.textContent = `BIENVENIDO,  
                          ${gamer} A LEE-GG` ;
   if (document.getElementById('two').style.display == 'none'){
     document.getElementById('two').style.display = 'block';
     document.getElementById('one').style.display = 'none';
   }
  }}
//Elección de categoría
//Series
function category1(){
      document.getElementById('two').style.display = 'none';
  if (document.getElementById('three').style.display == 'none'){    
    document.getElementById('three').style.display = 'block';
    document.getElementById('3a').style.display='block';
    document.getElementById('3b').style.display='none';
  }}
//Peliculas
function category2(){
      document.getElementById('two').style.display = 'none';
  if (document.getElementById('four').style.display == 'none'){    
     document.getElementById('four').style.display = 'block';
      document.getElementById('4a').style.display='block';
      document.getElementById('4b').style.display='none';
  }}
//SCORE SERIES: Recolección de respuestas y sumatoria de puntajes
let score1= new Array();
//Series. Pregunta 1
  document.getElementById('o1').addEventListener('click', incorrecta1);
  document.getElementById('o2').addEventListener('click', correcta1);
  document.getElementById('o3').addEventListener('click', incorrecta1);
//Series. Pregunta 2
  document.getElementById('o4').addEventListener('click', correcta1);
  document.getElementById('o5').addEventListener('click', incorrecta1);
  document.getElementById('o6').addEventListener('click', incorrecta1);
//Series. Pregunta 3
  document.getElementById('o7').addEventListener('click', incorrecta1);
  document.getElementById('o8').addEventListener('click', incorrecta1);
  document.getElementById('o9').addEventListener('click', correcta1);
//Agrega puntaje 1 al score1
function correcta1(){
 if(score1.length<1){
    score1.push(1);
     document.getElementById('three').style.display='block';
     document.getElementById('3a').style.display='none';
     document.getElementById('3b').style.display='block';
     document.getElementById('3c').style.display='none';  
  } else if(score1.length<2){
    score1.push(1);
     document.getElementById('three').style.display='block';
     document.getElementById('3a').style.display='none';
     document.getElementById('3b').style.display='none';
     document.getElementById('3c').style.display='block';
  } else if(score1.length<3){
    score1.push(1);
     document.getElementById('three').style.display='none';
     document.getElementById('final1').style.display='block';
 } document.getElementById('scoreseries').innerHTML=(`${(score1[0]+score1[1]+score1[2])} pts`);
}
//Agrega puntaje 0 al score1
function incorrecta1(){
 if(score1.length<1){
    score1.push(0);
     document.getElementById('three').style.display='block';
     document.getElementById('3a').style.display='none';
     document.getElementById('3b').style.display='block';
     document.getElementById('3c').style.display='none';  
  } else if(score1.length<2){
    score1.push(0);
     document.getElementById('three').style.display='block';
     document.getElementById('3a').style.display='none';
     document.getElementById('3b').style.display='none';
     document.getElementById('3c').style.display='block';
  } else if(score1.length<3){
    score1.push(0);
     document.getElementById('three').style.display='none';
     document.getElementById('final1').style.display='block';
 } document.getElementById('scoreseries').innerHTML=(`${(score1[0]+score1[1]+score1[2])} pts`);
}
//SCORE PELICULAS: Recolección de respuestas y sumatoria de puntajes
let score2= new Array();
//Películas. Pregunta 1
  document.getElementById('o10').addEventListener('click', incorrecta2);
  document.getElementById('o11').addEventListener('click', correcta2);

//Películas. Pregunta 2
  document.getElementById('o13').addEventListener('click', incorrecta2);

  document.getElementById('o15').addEventListener('click', correcta2);
//Películas. Pregunta 3
  document.getElementById('o16').addEventListener('click', correcta2);

  document.getElementById('o18').addEventListener('click', incorrecta2);
//Agrega puntaje 1 al score2
function correcta2(){
 if(score2.length<1){
    score2.push(1);
     document.getElementById('four').style.display='block';
     document.getElementById('4a').style.display='none';
     document.getElementById('4b').style.display='block';
     document.getElementById('4c').style.display='none';  
  } else if(score2.length<2){
    score2.push(1);
     document.getElementById('four').style.display='block';
     document.getElementById('4a').style.display='none';
     document.getElementById('4b').style.display='none';
     document.getElementById('4c').style.display='block';
  } else if(score2.length<3){
    score2.push(1);
     document.getElementById('four').style.display='none';
     document.getElementById('final2').style.display='block';
  } document.getElementById('scoremovies').innerHTML=(`${(score2[0]+score2[1]+score2[2])} pts`);
}
//Agrega puntaje 0 al score1
function incorrecta2(){
 if(score2.length<1){
    score2.push(0);
     document.getElementById('four').style.display='block';
     document.getElementById('4a').style.display='none';
     document.getElementById('4b').style.display='block';
     document.getElementById('4c').style.display='none';  
  } else if(score2.length<2){
    score2.push(0);
     document.getElementById('four').style.display='block';
     document.getElementById('4a').style.display='none';
     document.getElementById('4b').style.display='none';
     document.getElementById('4c').style.display='block';
  } else if(score2.length<3){
    score2.push(0);
     document.getElementById('four').style.display='none';
     document.getElementById('final2').style.display='block';
  } document.getElementById('scoremovies').innerHTML=(`${(score2[0]+score2[1]+score2[2])} pts`);
 }
//Regresar
function reload() {
  document.getElementById('one').style.display='block';
  document.getElementById('final1').style.display='none';
  document.getElementById('final2').style.display='none';
  document.getElementById('name').value="";
}
//Al fin. Uf. Sólo falta la cuenta regresiva :O