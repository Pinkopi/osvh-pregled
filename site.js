(function(){
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var splash = document.getElementById("splash");
  if (splash && !reduced) setTimeout(function(){ splash.classList.add("go"); }, 700);
  var cur = document.getElementById("cursor");
  var portal = document.getElementById("portal");
  var stage = document.getElementById("stage");
  var fine = matchMedia("(pointer:fine)").matches;
  if (fine && cur) {
    addEventListener("pointermove", function(e){
      cur.style.left = e.clientX + "px";
      cur.style.top = e.clientY + "px";
      if (!portal || portal.classList.contains("open")) return;
      var r = portal.getBoundingClientRect();
      var px = (e.clientX - (r.left + r.width/2)) / (r.width/2);
      var py = (e.clientY - (r.top + r.height/2)) / (r.height/2);
      px = Math.max(-1, Math.min(1, px));
      py = Math.max(-1, Math.min(1, py));
      portal.style.transform = "rotateY(" + (px*14) + "deg) rotateX(" + (-py*10) + "deg)";
    });
  }
  if (portal) {
    portal.addEventListener("click", function(e){
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      var to = portal.href;
      portal.classList.add("open");
      portal.style.transform = "none";
      setTimeout(function(){ location.href = to; }, reduced ? 0 : 1100);
    });
  }
  var acc = 0;
  addEventListener("wheel", function(e){
    if (reduced || !stage) return;
    var world = document.getElementById("world");
    if (world && world.scrollHeight > world.clientHeight + 8 && world.scrollTop + world.clientHeight < world.scrollHeight - 4 && e.deltaY > 0) {
      return;
    }
    acc += e.deltaY;
    var t = Math.max(0, Math.min(1, acc / 420));
    stage.style.transform = "scale(" + (1 + t*0.18) + ")";
    if (acc > 640 && portal && !portal.classList.contains("open")) portal.click();
    if (acc < 0) acc = 0;
  }, {passive:true});
  var btn = document.getElementById("menu");
  var sheet = document.getElementById("sheet");
  if (btn && sheet) btn.addEventListener("click", function(){ sheet.classList.toggle("open"); });
})();
