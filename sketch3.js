// Video frame extraction

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