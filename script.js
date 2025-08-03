const firebaseConfig = {
  apiKey: "AIzaSyCfq5LOYUewvB9TPbzM1NXz5KmMiY6oXbA",
  authDomain: "jirani-website.firebaseapp.com",
  databaseURL: "https://jirani-website-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jirani-website",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const ref = db.ref("registrants");

document.getElementById("joinForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (name && email) {
    ref.push({ name, email, time: new Date().toISOString() });
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
  }
});

ref.on("value", snapshot => {
  const count = snapshot.numChildren();
  document.getElementById("counter").textContent = `${count} people have joined`;
});