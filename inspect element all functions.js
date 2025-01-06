javascript:(function(){
  let box = document.createElement("div");
      box.id ="dsr-edit-box-id-010";
      box.style ="position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); width:80%; height:auto; background:rgba(0,0,0,0.2); border-radius:5px; overflow:hidden; box-shadow:2px 3px 5px 1px white; border:1px solid white; transition:0.3s; z-index:999999999999; -webkit-user-select:none; -ms-user-select:none; user-select:none;";
  let top = document.createElement("div");
      top.className ="top";
      top.style ="position:relative; background:; padding:3%; display:flex; justify-content:center; align-items:center;";
      let i = document.createElement("i");
          i.style ="display:inline-block; width:15%; height:7px; background:grey; border-radius:3px; box-shadow:0 0 10px 5px white;";
          i.setAttribute("wpsdsr","false");
          let isDragging = false, offsetX = 0, offsetY = 0;
          function startDrag(e){
             isDragging = true;
             const event = e.touches ? e.touches[0] : e;
             offsetX = event.clientX - box.offsetLeft;
             offsetY = event.clientY - box.offsetTop;
          };
          function onDrag(e){
             if(!isDragging) return;
             const event = e.touches ? e.touches[0] : e; 
             box.style.left = event.clientX - offsetX + "px";
             box.style.top = event.clientY - offsetY + "px";
          };
          function stopDrag(){ isDragging = false; };
          i.addEventListener("mousedown", startDrag);
          i.addEventListener("touchstart", startDrag);
          document.addEventListener("mousemove", onDrag);
          document.addEventListener("touchmove", onDrag);
          document.addEventListener("mouseup", stopDrag);
          document.addEventListener("touchend", stopDrag);
          
      let p = document.createElement("p");
          p.innerHTML="x";
          p.style="position:absolute; right:0; top:50%; transform:translateY(-50%); display:flex; justify-content:center; align-items:center; width:20px; height:20px; border-radius:50%; font-weight:bolder; font-size:25px; color:tomato; cursor:pointer;";
          p.onclick = function(){ document.body.removeChild(box); };
      top.appendChild(i);
      top.appendChild(p);
      
  let con = document.createElement("div");
      con.className ="con";
      con.style ="border-top:1px solid grey; display:flex; justify-content:center; align-items:center;";
       
      function createButton(ele,text,onClick){
         let button = document.createElement(ele);
         button.innerHTML = text;
         button.style ="background:#eee; font-size:12px; font-weight:bold; color:#333; width:30%; margin:5% 1.6666666666666%; padding:3% 1%; text-align:center; white-space:nowrap; overflow:auto; border-radius:5px;";
         button.onclick = function(){ onClick(this); };
         return button;
      };
      con.appendChild(createButton("p","Inspect Edit",function(e){
         var script = document.createElement('script');
         script.src = "//cdn.jsdelivr.net/npm/eruda";
         document.body.appendChild(script);
         script.onload = function(){ eruda.init(); if(confirm("Console open Succesful, this control hide")){ document.body.removeChild(box); } };
      }));
      con.appendChild(createButton("p","Alert HTML",function(e){
         if(confirm("Do you want to copy this HTML or still view it ?")){
            if(confirm("Do you want to copy manually ?")){
               let existingTextarea = document.querySelector("div#dsr-edit-box-id-010 textarea");
               if(existingTextarea){ existingTextarea.remove(); }
               let textra = document.createElement('textarea');
                   textra.style ="width:98%; color:#333; font-size:12px; font-weight:bold; min-height:150px; max-height:500px; margin:2px 1%; padding:2%; background:#eee; border:1px solid white; border-radius:5px;";
                   textra.value = document.documentElement.outerHTML;
                   textra.setAttribute("placeholder","Document HTML Code, And secret code");
                   textra.onkeyup = function(){ if(textra.value.trim() === "#this-hide" || textra.value.trim() === "#this-remove"){ textra.remove(); } };
               box.appendChild(textra);
            }else{ navigator.clipboard.writeText(document.documentElement.outerHTML).then(() =>{ alert('Text copied to clipboard!'); }).catch(err =>{ alert('Failed to copy text: ' + err); }); }
         }else{ alert(document.documentElement.outerHTML); }
      }));
      con.appendChild(createButton("p","Edit Elements",function(e){
         if(confirm("Enable edit mode for all elements ?")){
            document.querySelectorAll("body").forEach(element =>{ 
               element.contentEditable = true;
               document.querySelector("div#dsr-edit-box-id-010").contentEditable = false;
            });
         }
      }));
      
    box.appendChild(top);
    box.appendChild(con);
  document.body.appendChild(box);
})();