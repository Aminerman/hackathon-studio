// Video animation export

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const startCaptureButton = document.getElementById("startCapture");

  const capturer = new CCapture({
    format: "webm",
    framerate: 30,
    bitrate: 12000,
    quality: 0.9,
  });
  const totalFrames = 100;
  let frameCounter = 0;
  let captureVideo = false;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc((frameCounter * 5) % canvas.width, canvas.height / 2, 25, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();

    if (captureVideo) {
      capturer.capture(canvas);
      frameCounter++;

      if (frameCounter >= totalFrames) {
        capturer.stop();
        capturer.save();
        captureVideo = false;
      }
    }

    requestAnimationFrame(draw);
  }

  startCaptureButton.addEventListener("click", () => {
    if (!captureVideo) {
      frameCounter = 0;
      capturer.start();
      captureVideo = true;
    }
  });

  requestAnimationFrame(draw);
});