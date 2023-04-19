// // Video animation export

// document.addEventListener("DOMContentLoaded", function () {
//   const canvas = document.getElementById("myCanvas");
//   const ctx = canvas.getContext("2d");
//   const startCaptureButton = document.getElementById("startCapture");

//   const capturer = new CCapture({
//     format: "webm",
//     framerate: 30,
//     bitrate: 12000,
//     quality: 0.9,
//   });
//   const totalFrames = 100;
//   let frameCounter = 0;
//   let captureVideo = false;

//   function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     ctx.beginPath();
//     ctx.arc((frameCounter * 5) % canvas.width, canvas.height / 2, 25, 0, 2 * Math.PI);
//     ctx.fillStyle = "blue";
//     ctx.fill();

//     if (captureVideo) {
//       capturer.capture(canvas);
//       frameCounter++;

//       if (frameCounter >= totalFrames) {
//         capturer.stop();
//         capturer.save();
//         captureVideo = false;
//       }
//     }

//     requestAnimationFrame(draw);
//   }

//   startCaptureButton.addEventListener("click", () => {
//     if (!captureVideo) {
//       frameCounter = 0;
//       capturer.start();
//       captureVideo = true;
//     }
//   });

//   requestAnimationFrame(draw);
// });

// // Video frame extraction

// document.addEventListener("DOMContentLoaded", function () {
//   const video = document.getElementById("inputVideo");
//   const canvas = document.getElementById("videoCanvas");
//   const ctx = canvas.getContext("2d");
//   const playCanvasButton = document.getElementById("playCanvas");

//   video.addEventListener("loadedmetadata", () => {
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//   });

//   function drawVideoOnCanvas() {
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     if (!video.paused && !video.ended) {
//       requestAnimationFrame(drawVideoOnCanvas);
//     }
//   }

//   playCanvasButton.addEventListener("click", () => {
//     video.play();
//     drawVideoOnCanvas();
//   });

//   video.addEventListener("ended", () => {
//     video.pause();
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("inputVideo");
  const canvas = document.getElementById("videoCanvas");
  const ctx = canvas.getContext("2d");
  const playCanvasButton = document.getElementById("playCanvas");
  const exportCanvasButton = document.getElementById("exportCanvas");

  const capturer = new CCapture({
    format: "webm",
    framerate: 30
  });
  let circleX = 0;

  const totalFrames = 100;
  let frameCounter = 0;
  let captureVideo = false;

  video.addEventListener("loadedmetadata", () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  });

  function draw() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(circleX, canvas.height / 2, 25, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    circleX = (circleX + 5) % canvas.width;

    if (captureVideo) {
      console.log(frameCounter)
      capturer.capture(canvas);
      frameCounter++;

      if (frameCounter >= totalFrames) {
        capturer.stop();
        capturer.save();
        captureVideo = false;
      }
    }

    if (!video.paused && !video.ended) {
      requestAnimationFrame(draw);
    }
  }

  playCanvasButton.addEventListener("click", () => {
    video.play();
    draw();
  });

  exportCanvasButton.addEventListener("click", () => {

    if (!captureVideo) {
      video.play();
      draw();
      frameCounter = 0;
      captureVideo = true;
      console.log("start", captureVideo)
      capturer.start();
    }
  });

  video.addEventListener("ended", () => {
    video.pause();
  });
});