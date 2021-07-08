self.addEventListener("message", function(msg) {
  console.log(msg);
  let ctx = msg.data.getContext('2d')
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.moveTo(10, 10);
  ctx.lineTo(20, 20);
  ctx.stroke();
  ctx.closePath();
});
