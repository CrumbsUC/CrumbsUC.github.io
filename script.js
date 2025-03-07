async function loadReviews() {
    let reviewsItemsParent = document.getElementById("review_items")

    const reviewHtmlResponse = await fetch("templates/review.html")
    const reviewHtmlText = await reviewHtmlResponse.text()

    const reviewJsonResponse = await fetch("config/reviews.json")
    const reviewJsonText = await reviewJsonResponse.text()

    const reviews = JSON.parse(reviewJsonText)

    let reviewItems = ""

    reviews.forEach(review => {
        let yellowStars = "";
        for (let i = 0; i < review.stars; i++) {
            yellowStars += "<span class='text-yellow-300'>🟊</span>"
        }
        let grayStars = ""
        for (let i = 0; i < (5-review.stars); i++) {
            grayStars += "<span class='text-gray-300'>🟊</span>"
            
        }

        reviewItems += reviewHtmlText.replaceAll("{stars}", yellowStars + grayStars).replaceAll("{url}", review.image).replaceAll("{title}", review.title).replaceAll("{user}", review.user).replaceAll("{description}", review.description).trim();
    });

    reviewsItemsParent.innerHTML = reviewItems;
}


async function loadGallery() {
    let galleryItemsParent = document.getElementById("gallery_items")

    const galleryHtmlResponse = await fetch("templates/gallery.html")
    const galleryHtmlText = await galleryHtmlResponse.text()

    const galleryJsonResponse = await fetch("config/gallery.json")
    const galleryJsonText = await galleryJsonResponse.text()

    const galleryImages = JSON.parse(galleryJsonText)

    let galleryItems = ""
    galleryImages.forEach(element => {
        galleryItems += galleryHtmlText.replaceAll("{url}", element.image).trim();
    });

    galleryItemsParent.innerHTML = galleryItems;
}

function viewFullScreen(url) {
    // Display the full-screen overlay
    let fullScreenElement = document.getElementById("fullscreen-overlay");
    fullScreenElement.style.display = "flex"; // Show as flex to center the content

    // Update the full-screen image source
    let fullScreenImage = document.getElementById("fullscreen-image");
    fullScreenImage.src = url;

    // Add fade-in animation
    let content = document.getElementById("fullscreen-content");
    content.classList.add("fade-in");
}

function disableFullScreen() {
    // Hide the full-screen overlay
    let fullScreenElement = document.getElementById("fullscreen-overlay");
    fullScreenElement.style.display = "none";
    
    // Optionally, remove the fade-in class for future use
    let content = document.getElementById("fullscreen-content");
    content.classList.remove("fade-in");
}

loadGallery()
loadReviews().then(() => {
    new Splide( '.splide',{
        type: "loop",
        autoplay: true,
        interval: 4500,
        lazyLoad: true,
        speed: 1500,

        classes: {
arrows: 'splide__arrows your-class-arrows',
arrow : 'splide__arrow hidden lg:flex',
prev  : 'splide__arrow--prev your-class-prev',
next  : 'splide__arrow--next your-class-next',
},
      } ).mount();
})
