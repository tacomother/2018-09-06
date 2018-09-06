$.fn.parallax = function(resistance, mouse) {
  $el = $(this);
  TweenLite.to($el, 0.2, {
    x: -((mouse.clientX - window.innerWidth / 2) / resistance),
    y: -((mouse.clientY - window.innerHeight / 2) / resistance)
  });
};
$(".main").mousemove(function(e) {
  $(".stars").parallax(0, e);
  $(".moon-group").parallax(30, e);
  $(".cloud-group-1").parallax(-10, e);
  $(".cloud-group-2").parallax(-30, e);
});
