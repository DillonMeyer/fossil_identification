// /var/www/html/fossil_identification/main.js

const body = document.body;
const imageInput = document.getElementById("imageInput");
// imageInput.addEventListener("change", uploadImage);

// Handle drag events
body.addEventListener("dragover", (e) => {
  e.preventDefault();
  body.classList.add("dragover");
});

body.addEventListener("dragleave", () => {
  body.classList.remove("dragover");
});

body.addEventListener("drop", (e) => {
  e.preventDefault();
  body.classList.remove("dragover");

  const file = imageInput.files[0];
  if (file) uploadImage(file);
});

// Click anywhere to open file picker
body.addEventListener("click", () => {
  imageInput.click();
});

// Handle manual file selection
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (file) uploadImage(file);
});

async function uploadImage() {
  const fileInput = document.getElementById("imageInput");
  const file = fileInput.files[0];
  if (!file) return alert("Please select an image.");

  const formData = new FormData();
  formData.append("file", file);
  
  const response = await fetch("https:///api.djmlabs.xyz/predict", {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  // document.getElementById("result").innerHTML = `
  //   <p><strong>Prediction:</strong> ${data.prediction}</p>
  //   <p><strong>Confidence:</strong> ${(data.confidence * 100).toFixed(2)}%</p>
  // `;

  // let data = {
  //   "prediction": "trilobite",
  //   "confidence": 0.95
  // };

  document.getElementById('trilobite').style.opacity = 0;
  document.getElementById('ammonite').style.opacity = 0;
  document.getElementById('crinoid').style.opacity = 0;
  const prediction = document.getElementById(data.prediction)
  prediction.style.opacity = 1;
  
  const confidence = document.createElement('p');
  prediction.appendChild(confidence);
  confidence.innerText = `Confidence: ${(.99 * 100).toFixed(2)}%`;
  confidence.style.transform = 'translate(15px, 1px)';
  confidence.classList.add('opacity-in');
}