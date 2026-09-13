const canvas=document.getElementById("fx"),ctx=canvas.getContext("2d");
let W,H,particles=[],rockets=[];
function resize(){W=canvas.width=innerWidth*devicePixelRatio;H=canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);W=innerWidth;H=innerHeight}
addEventListener("resize",resize);resize();
const rand=(a,b)=>Math.random()*(b-a)+a;
function burst(x,y,type="manu"){
  const hues=type==="sonu"?["#ff4fa3","#ffb5df","#b77cff","#ffd3ed"]:["#ff7ac7","#ffd27d","#a78bfa","#6ee7e7"];
  for(let i=0;i<95;i++) particles.push({x,y,vx:Math.cos(i/95*Math.PI*2)*rand(2,7),vy:Math.sin(i/95*Math.PI*2)*rand(2,7),life:rand(45,90),max:90,size:rand(1,3),c:hues[i%hues.length]});
}
function animate(){
 ctx.clearRect(0,0,innerWidth,innerHeight);
 particles=particles.filter(p=>p.life>0);
 particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.035;p.vx*=.985;p.life--;ctx.globalAlpha=Math.max(0,p.life/p.max);ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill()});
 ctx.globalAlpha=1;
 requestAnimationFrame(animate);
}
animate();
setInterval(()=>{if(document.querySelector(".birthday-page.active"))burst(rand(40,W-40),rand(60,H*.55),document.querySelector(".sonu-page.active")?"sonu":"manu")},1200);

document.querySelectorAll(".door").forEach(b=>b.onclick=()=>{document.getElementById("home").style.display="none";document.querySelectorAll(".birthday-page").forEach(p=>p.classList.remove("active"));document.getElementById(b.dataset.page).classList.add("active");burst(W/2,H*.35,b.dataset.page==="sonuPage"?"sonu":"manu")});
document.querySelectorAll(".back").forEach(b=>b.onclick=()=>{document.querySelectorAll(".birthday-page").forEach(p=>p.classList.remove("active"));document.getElementById("home").style.display="flex"});
document.querySelectorAll(".celebrate").forEach(b=>b.onclick=()=>{for(let i=0;i<5;i++)setTimeout(()=>burst(rand(80,W-80),rand(100,H*.65),b.dataset.burst),i*180);showToast(b.dataset.burst==="sonu"?"🎀 শুভ জন্মদিন সোনু কুইন!":"🌸 Happy Birthday Manu! 💖")});
function showToast(t){const e=document.getElementById("toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),2200)}

let spoken=new Set();
function speak(text,key){
 if(!("speechSynthesis" in window)||spoken.has(key))return;
 spoken.add(key);
 const u=new SpeechSynthesisUtterance(text);u.rate=.86;u.pitch=1.28;u.volume=1;
 speechSynthesis.cancel();speechSynthesis.speak(u);
}
const obs=new MutationObserver(()=>{if(document.getElementById("manuPage").classList.contains("active"))speak("Happy birthday to you, Manu.","manu");if(document.getElementById("sonuPage").classList.contains("active"))speak("Happy birthday Sonu queen. This is from Pikai da.","sonu")});
obs.observe(document.body,{attributes:true,subtree:true,attributeFilter:["class"]});
