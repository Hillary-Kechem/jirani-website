const firebaseConfig = {
  apiKey: "AIzaSyCfq5LOYUewvB9TPbzM1NXz5KmMiY6oXbA",
  authDomain: "jirani-website.firebaseapp.com",
  databaseURL: "https://jirani-website-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jirani-website",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Simple password check (do NOT use in production!)
const adminPassword = "jirani123";

const loginDiv = document.getElementById("login");
const contentDiv = document.getElementById("content");
const loginMsg = document.getElementById("loginMsg");
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {
  const pass = document.getElementById("password").value;
  if (pass === adminPassword) {
    loginDiv.style.display = "none";
    contentDiv.style.display = "block";
    loadData();
  } else {
    loginMsg.textContent = "Incorrect password";
  }
});

// Load registrants and visitors data from Firebase
function loadData() {
  const registrantsRef = db.ref("registrants");
  const visitorsRef = db.ref("visitors");

  // Load registrants
  registrantsRef.on("value", snapshot => {
    const tbody = document.querySelector("#registrantsTable tbody");
    tbody.innerHTML = "";
    snapshot.forEach(childSnap => {
      const data = childSnap.val();
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${data.name || ""}</td>
        <td>${data.email || ""}</td>
        <td>${new Date(data.time).toLocaleString()}</td>
      `;
      tbody.appendChild(tr);
    });
  });

  // Load visitors
  visitorsRef.on("value", snapshot => {
    const tbody = document.querySelector("#visitorsTable tbody");
    tbody.innerHTML = "";
    snapshot.forEach(childSnap => {
      const data = childSnap.val();
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${new Date(data.time).toLocaleString()}</td>`;
      tbody.appendChild(tr);
    });
  });
}