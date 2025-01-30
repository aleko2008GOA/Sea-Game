const drops = [];
for(var i = 0; i < 1420; i ++){
    drops.push(document.createElement('div'));
}

drops.forEach(drop => document.body.appendChild(drop))

let id = requestAnimationFrame(func);
function func(){
    document.querySelectorAll('div').forEach(div => {
        div.style.left = Math.random() * 100 + '%';
        div.style.top = Math.random() * 100 + '%';
    })
    requestAnimationFrame(func);
}