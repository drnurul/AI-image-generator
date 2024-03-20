const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallery");
const OPENAI_API_KEY = "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";

const updateImageCard = (imageDataArray) => {
    imageDataArray.forEach((imgObject, index) => {
        const imgCard = imageGallery.querySelectorAll(".img-card")[index];
        const imgElement = imgCard.querySelector("img");
        const downloadtn = imgCard.querySelector(".download-btn")
        const aiGeneratedImg = `data:img/jpeg;base64,${imgObject.b64_json}`;
        imgElement.src = aiGeneratedImg;
        imgElement.onload = () => {
            imgCard.classList.remove("loading");
            downloadtn.setAttribute("href", aiGeneratedImg);
            downloadtn.setAttribute("download", `${new Date().getTime()}.jpg`);
        };
    });
};

// Mark the function as async
const generateAiImages = async (userPrompt, userImgQuantity) => {
    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: parseInt(userImgQuantity),
                size: "512x512",
                response_format: "b64_json"
            })
        });
        if (!response.ok) throw new Error("Failed to generate images. Please try again.");

        const { data } = await response.json();
        updateImageCard([...data]);
        console.log(data);
    } catch (error) {
        alert(error.message);
    }
};

const handleFormSubmission = (e) => {
    e.preventDefault();
    const userPrompt = e.srcElement[0].value;
    const userImgQuantity = e.srcElement[1].value;

    const imgCardMarkup = Array.from({ length: userImgQuantity }, () =>
        `<div class="img-card ">
            <img src="images/loading.png" alt="image" />
            <a href="#" class="download-btn">
                <img src="images/dwn-btn.png" alt="download-btn"/>
            </a>
        </div>'`
    ).join("");
    imageGallery.innerHTML = imgCardMarkup;
    generateAiImages(userPrompt, userImgQuantity);
};

generateForm.addEventListener("submit", handleFormSubmission);
