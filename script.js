const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallery");
const OPENAI_API_KEY = "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";
const generateAiImages = (userPrompt, userImgQuantity) => {
    try{
        const response = await fetch ("
        https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "content-type": "application/json"
                "Authorization": `Bearer ${OPENAI_API_KEY}` 
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: userImgQuantity,
                size: "512x512",
                response_format: "b64_json"
            })
        })
        const {data} = await response.json();
        console.log(data)
    }catch(error){
        console.log(error)
    }
}

const handleFormSubmission = (e) => {
e.preventDefault();
const userPrompt = e.srcElement[0].value;
const userImgQuantity = e.srcElement[1].value;

const imgCardMarkup = Array.from ({length: userImgQuantity}, () => 
`<div class="img-card ">
<img src="images/loading.png" alt="image" />
<a href="#" class="download-btn"
  ><img src="images/dwn-btn.png" alt="download-btn"
/></a>
</div>'`
).join("");
   imageGallery.innerHTML = imgCardMarkup;
   generateAiImages(userPrompt, userImgQuantity);
}
generateForm.addEventListener("submit", handleFormSubmission);
