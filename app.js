// app.js

//Trying to figure out firebase
src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"
src="https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js"


// Firebase config
    const firebaseConfig = {
        apiKey: "AIzaSyDObwLn8SvKIUViHjOPvAbnQYZCDLq7ovw",
        authDomain: "bitpixreadme.firebaseapp.com",
        projectId: "bitpixreadme",
        storageBucket: "bitpixreadme.firebasestorage.app",
        messagingSenderId: "838918672873",
        appId: "1:838918672873:web:098129416e507d72313b78"
    };

// Initialize Firebase 

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();


const storageRef = firebase.storage().ref();
const imageRef = storageRef.child('images/Birthday1.jpg');

imageRef.getDownloadURL()
  .then((url) => {
    // Use this URL in an <img> tag
    const img = document.createElement('img');
    img.src = url;
    document.body.appendChild(img);
  })
  .catch((error) => {
    console.error("Error getting image URL", error);
  });



  import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const storage1 = getStorage();
const listRef = ref(storage1, 'images/');

listAll(listRef)
  .then((res) => {
    res.items.forEach((itemRef) => {
      getDownloadURL(itemRef).then((url) => {
        const img = document.createElement('img');
        img.src = url;
        document.body.appendChild(img);
      });
    });
  })
  .catch((error) => {
    console.error("Error listing files:", error);
  });








// Method 2: auto-generate with custom caption/description lookups
const groups = [
    "Birthday",
    "Family",
    "Grad",
    "Portrait",
    "Quince",
    "Wedding",
 ];
 
 
 // Override captions for unique text per photo
 const captions = {
    Birthday1: "Turning 5 with Family",
    Birthday2: "Blowing Candles",
    Birthday3: "Birthday Cake Close-up",
    Birthday4: "Birthday Party Guests",
    Birthday5: "Smiles at Five",
 
 
    Family1:   "Family Picnic 2021",
    Family2:   "Grandparents Reunion",
    Family3:   "Cousins Playing",
    Family4:   "Family Portrait Day",
    Family5:   "Holiday Gathering",
 
 
    Grad1:     "Graduation Ceremony",
    Grad2:     "Throwing Cap High",
    Grad3:     "Family Proud Moment",
    Grad4:     "Diploma Close-up",
    Grad5:     "Walking the Stage",
 
 
    Portrait1: "Studio Portrait",
    Portrait2: "Outdoor Portrait",
    Portrait3: "Black & White Portrait",
    Portrait4: "Candid Portrait",
    Portrait5: "Close-up Expression",
 
 
    Quince1:   "Quinceañera Waltz",
    Quince2:   "Elegant Quince Dress",
    Quince3:   "Father-Daughter Dance",
    Quince4:   "Quinceañera Cake",
    Quince5:   "Friends Group Photo",
 
 
    Wedding1:  "Bride & Groom Kiss",
    Wedding2:  "Floral Wedding Arch",
    Wedding3:  "First Dance",
    Wedding4:  "Wedding Rings",
    Wedding5:  "Reception Celebration",
 };
 
 
 // Override descriptions for each
 const descriptions = {
    Birthday1: "A special moment at my 5th birthday party.",
    Birthday2: "Enjoying cake time with friends.",
    Birthday3: "Close-up of the delicious birthday cake.",
    Birthday4: "Gathering of friends and family around the table.",
    Birthday5: "Cheerful smiles as I turn five.",
 
 
    Family1:   "All of us together enjoying the sunshine.",
    Family2:   "Catching up with grandparents after a long time.",
    Family3:   "Fun day with my cousins in the backyard.",
    Family4:   "Our annual formal family portrait.",
    Family5:   "Christmas lunch at home.",
 
 
    Grad1:     "Walking across the stage to receive my diploma.",
    Grad2:     "Celebratory cap toss moment.",
    Grad3:     "My family cheering me on.",
    Grad4:     "Holding my hard-earned diploma.",
    Grad5:     "Capturing the triumph of graduation.",
 
 
    Portrait1: "Professional headshot in the studio.",
    Portrait2: "Natural light portrait in the park.",
    Portrait3: "Classic monochrome portrait.",
    Portrait4: "Unposed moment captured.",
    Portrait5: "Detail of eyes and emotion.",
 
 
    Quince1:   "Dancing the traditional waltz.",
    Quince2:   "Showing off the beautiful gown.",
    Quince3:   "Heartfelt moment with my dad.",
    Quince4:   "Sweet quinceañera cake centerpiece.",
    Quince5:   "Celebrating with close friends.",
 
 
    Wedding1:  "First kiss as a married couple.",
    Wedding2:  "The beautiful ceremony backdrop.",
    Wedding3:  "Romantic first dance under lights.",
    Wedding4:  "Close-up of our wedding rings.",
    Wedding5:  "Dancing the night away.",
 };
 
 
 // Build the images array
 const images = [];
 groups.forEach(group => {
    for (let i = 1; i <= 5; i++) {
        const key = `${group}${i}`;
        images.push({
            src:         `images/${key}.jpg`,                // file path
            caption:     captions[key]     || key,           // custom or fallback
            description: descriptions[key] || ""            // custom or blank
        });
    }
 });
 
 
 let currentIndex = 0;
 // DOM references
 const gallery   = document.getElementById('gallery');
 const lightbox  = document.getElementById('lightbox');
 const lbImg     = document.getElementById('lightbox-img');
 const lbCap     = document.getElementById('lightbox-caption');
 const btnClose  = document.getElementById('lightbox-close');
 const btnPrev   = document.getElementById('lightbox-prev');
 const btnNext   = document.getElementById('lightbox-next');
 
 
 // Build thumbnails
 function displayThumbnails() {
    images.forEach((imgObj, i) => {
        const div = document.createElement('div');
        div.className = 'photo';
        div.innerHTML = `
      <img src="${imgObj.src}" alt="${imgObj.caption}" />
      <p class="caption">${imgObj.caption}</p>
      <p class="description">${imgObj.description}</p>
    `;
        div.addEventListener('click', () => openLightbox(i));
        gallery.appendChild(div);
    });
 }
 
 
 // Open lightbox
 function openLightbox(idx) {
    currentIndex = idx;
    updateLightbox();
    lightbox.classList.add('visible');
 }
 
 
 // Update lightbox content
 function updateLightbox() {
    const imgObj = images[currentIndex];
    lbImg.src = imgObj.src;
    lbImg.alt = imgObj.caption;
    lbCap.textContent = `${imgObj.caption} — ${imgObj.description}`;
 }
 
 
 // Close lightbox
 btnClose.addEventListener('click', () => lightbox.classList.remove('visible'));
 
 
 // Prev/Next controls
 btnPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
 });
 btnNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
 });
 
 
 // Click outside to close
 lightbox.addEventListener('click', e => { if (e.target === lightbox) btnClose.click(); });
 
 
 // Initialize
 displayThumbnails();
 