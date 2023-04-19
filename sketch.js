// let canvas;
// let capturer;
// let captureVideo = false;
// let totalFrames = 100;
// let frameCounter = 0;

// function setup() {
//   canvas = createCanvas(400, 400);
//   capturer = new CCapture({ format: 'webm', framerate: 30 });
// }

// function draw() {
//   background(50);
//   ellipse(frameCount % width, height / 2, 50);

//   console.log("yo")
//   if (captureVideo) {
//   console.log("yo2")

//     capturer.capture(canvas.elt);
//     frameCounter++;

//     if (frameCounter >= totalFrames) {
//       capturer.stop();
//       capturer.save();
//       captureVideo = false;
//     }
//   }
// }

// function mouseClicked() {
//   if (!captureVideo) {
//     frameCounter = 0;
//     capturer.start();
//     captureVideo = true;
//   }
// }


// const canvas = document.getElementById("myCanvas");
// const ctx = canvas.getContext("2d");
// const startCaptureButton = document.getElementById("startCapture");

// const capturer = new CCapture({ format: "webm", framerate: 30 });
// const totalFrames = 100;
// let frameCounter = 0;
// let captureVideo = false;

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   ctx.beginPath();
//   ctx.arc((frameCounter * 5) % canvas.width, canvas.height / 2, 25, 0, 2 * Math.PI);
//   ctx.fillStyle = "blue";
//   ctx.fill();

//   // Capture frames if captureVideo is true
//   if (captureVideo) {
//     capturer.capture(canvas);
//     frameCounter++;

//     if (frameCounter >= totalFrames) {
//       capturer.stop();
//       capturer.save();
//       captureVideo = false;
//     }
//   }

//   requestAnimationFrame(draw);
// }

// startCaptureButton.addEventListener("click", () => {
//   if (!captureVideo) {
//     frameCounter = 0;
//     capturer.start();
//     captureVideo = true;
//   }
// });

// requestAnimationFrame(draw);

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

document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("inputVideo");
  const canvas = document.getElementById("videoCanvas");
  const ctx = canvas.getContext("2d");
  const playCanvasButton = document.getElementById("playCanvas");

  video.addEventListener("loadedmetadata", () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  });

  function drawVideoOnCanvas() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (!video.paused && !video.ended) {
      requestAnimationFrame(drawVideoOnCanvas);
    }
  }

  playCanvasButton.addEventListener("click", () => {
    video.play();
    drawVideoOnCanvas();
  });

  video.addEventListener("ended", () => {
    video.pause();
  });
});