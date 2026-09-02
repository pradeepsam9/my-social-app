// Your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmTVqT0-LzrOtmaXGEJ3wo60hcnxWZ17g",
  authDomain: "my-social-app-b623c.firebaseapp.com",
  databaseURL: "https://my-social-app-b623c-default-rtdb.firebaseio.com",
  projectId: "my-social-app-b623c",
  storageBucket: "my-social-app-b623c.firebasestorage.app",
  messagingSenderId: "107965850423",
  appId: "1:107965850423:web:eb78f1492e526fe28ff0b2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const postsRef = database.ref('posts');

// Save post to Firebase Cloud when clicking Post button
document.getElementById('postBtn').addEventListener('click', function() {
  const postInput = document.getElementById('postInput');
  const postText = postInput.value.trim();

  if (postText === "") {
    alert("Please write something first!");
    return;
  }

  // Push post data to database
  postsRef.push({
    text: postText,
    timestamp: new Date().toLocaleTimeString()
  });

  postInput.value = "";
});

// Real-time listener: Load posts live on screen
postsRef.on('child_added', function(snapshot) {
  const data = snapshot.val();
  const feedContainer = document.getElementById('feedContainer');

  const postElement = document.createElement('div');
  postElement.classList.add('post');

  const contentElement = document.createElement('p');
  contentElement.textContent = data.text;

  const timeElement = document.createElement('div');
  timeElement.classList.add('post-time');
  timeElement.textContent = data.timestamp;

  postElement.appendChild(contentElement);
  postElement.appendChild(timeElement);

  feedContainer.prepend(postElement);
});