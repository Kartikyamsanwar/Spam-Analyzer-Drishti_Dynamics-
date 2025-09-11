function showSection(sectionId) {
  document.querySelectorAll(".analyzer-section").forEach(sec => sec.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));

  document.getElementById(sectionId).classList.add("active");
  event.target.classList.add("active");
}

// Fake analyzer (Prototype Simulation)
function fakeAnalyze(type) {
  let resultElement;
  if (type === "text") resultElement = document.getElementById("textResult");
  if (type === "image") resultElement = document.getElementById("imageResult");
  if (type === "video") resultElement = document.getElementById("videoResult");

  resultElement.innerText = "Analyzing " + type + "...";
  setTimeout(() => {
    resultElement.innerText = (Math.random() > 0.5) ? "✅ Not Spam" : "⚠️ Spam Detected";
  }, 1500);
}
