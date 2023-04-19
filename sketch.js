


document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("inputVideo");
  const canvas = document.getElementById("videoCanvas");
  const ctx = canvas.getContext("2d");
  const playCanvasButton = document.getElementById("playCanvas");
  const exportCanvasButton = document.getElementById("exportCanvas");

  const croppedCanvas = document.getElementById("cropCanvas");
  const croppedCtx = croppedCanvas.getContext("2d");


  const image = new Image();
  image.src = "./matieux.png";

  // let cropper;

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

    // cropper = new Cropper(canvas, {
    //   autoCrop: false,
    //   background: false,
    // });
  });

  function draw() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(circleX, canvas.height / 2, 25, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    circleX = (circleX + 5) % canvas.width;

    // const aspectRatio = image.width / image.height;
    // const imageWidth = 200;
    // const imageHeight = imageWidth / aspectRatio;
    // ctx.drawImage(image, circleX, canvas.height / 2 - imageHeight / 2, imageWidth, imageHeight);

    // Calculate the image size based on the current frame count
    const scaleFactor = frameCounter / totalFrames;
    const imageWidth = canvas.width * scaleFactor;
    const imageHeight = canvas.height * scaleFactor;

    // Draw the image at the center of the canvas, zooming in from zero
    ctx.drawImage(image, (canvas.width - imageWidth) / 2, (canvas.height - imageHeight) / 2, imageWidth, imageHeight);



    if (captureVideo) {
      // const croppedData = cropper.getCroppedCanvas();
      console.log(frameCounter)
      // capturer.capture(croppedCanvas);
      capturer.capture(canvas); 
      frameCounter++;

      // croppedCtx.clearRect(0, 0, croppedCanvas.width, croppedCanvas.height);

      // const offsetX = (croppedCanvas.width - croppedData.width) / 2;
      // const offsetY = (croppedCanvas.height - croppedData.height) / 2;
      // croppedCtx.drawImage(croppedData, offsetX, offsetY);

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