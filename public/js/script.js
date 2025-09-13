function showSection(sectionId, event) {
  document.querySelectorAll(".analyzer-section").forEach(sec => sec.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
  if (event) event.target.classList.add("active");
}

const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";

async function analyzeText() {
  const text = document.getElementById("textInput").value.trim();
  const resultElement = document.getElementById("textResult");

  if (!text) {
    resultElement.innerText = "⚠️ Please enter some text first.";
    return;
  }

  resultElement.innerText = "Analyzing text...";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a spam detection assistant. Classify if input is spam or not." },
          { role: "user", content: text }
        ]
      })
    });

    const data = await response.json();
    resultElement.innerText = "Result: " + data.choices[0].message.content.trim();
  } catch (err) {
    console.error(err);
    resultElement.innerText = "❌ Error analyzing text.";
  }
}

async function analyzeImage() {
  const fileInput = document.getElementById("imageInput");
  const resultElement = document.getElementById("imageResult");

  if (!fileInput.files[0]) {
    resultElement.innerText = "⚠️ Please upload an image.";
    return;
  }

  resultElement.innerText = "Analyzing image...";

  try {
    const base64Image = await toBase64(fileInput.files[0]);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an assistant that detects spam or scam content in images." },
          {
            role: "user",
            content: [
              { type: "text", text: "Does this image contain spam, scam, or misleading content?" },
              { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    resultElement.innerText = "Result: " + data.choices[0].message.content.trim();
  } catch (err) {
    console.error(err);
    resultElement.innerText = "❌ Error analyzing image.";
  }
}

async function analyzeVideo() {
  const fileInput = document.getElementById("videoInput");
  const resultElement = document.getElementById("videoResult");

  if (!fileInput.files[0]) {
    resultElement.innerText = "⚠️ Please upload a video.";
    return;
  }

  resultElement.innerText = "Analyzing video with Sora (prototype)...";

  setTimeout(() => {
    resultElement.innerText = (Math.random() > 0.5)
      ? "✅ Video seems safe."
      : "⚠️ Spam-like patterns detected in video.";
  }, 2000);
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = error => reject(error);
  });
}
