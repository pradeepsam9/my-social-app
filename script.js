import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmTVqT0-LzrOtmaXGEJ3wo60hcnxWZ17g",
  authDomain: "my-social-app-b623c.firebaseapp.com",
  databaseURL: "https://my-social-app-b623c-default-rtdb.firebaseio.com",
  projectId: "my-social-app-b623c",
  storageBucket: "my-social-app-b623c.firebasestorage.app",
  messagingSenderId: "107965850423",
  appId: "1:107965850423:web:eb78f1492e526fe28ff0b2"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const postsRef = ref(database, "posts");

const postBtn = document.getElementById("postBtn");
const postInput = document.getElementById("postInput");
const usernameInput = document.getElementById("usernameInput");
const feed = document.getElementById("feed");

postBtn.addEventListener("click", () => {
  const content = postInput.value.trim();
  const author = usernameInput.value.trim() || "Anonymous";

  if (content !== "") {
    push(postsRef, {
      author: author,
      content: content,
      timestamp: new Date().toLocaleTimeString()
    });
    postInput.value = "";
  }
});

onValue(postsRef, (snapshot) => {
  feed.innerHTML = "";
  const data = snapshot.val();
  if (data) {
    Object.values(data).reverse().forEach((post) => {
      const postCard = document.createElement("div");
      postCard.classList.add("post-card");
      
      // Check if post is an object or an old plain string
      const author = (typeof post === "object" && post.author) ? post.author : "Anonymous";
      const message = (typeof post === "object") ? (post.content || "") : post;
      const time = (typeof post === "object" && post.timestamp) ? post.timestamp : "";

      postCard.innerHTML = `
        <strong>${author}</strong>
        <p>${message}</p>
        <small>${time}</small>
      `;
      feed.appendChild(postCard);
    });
  }
});