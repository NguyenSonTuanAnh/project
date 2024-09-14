/*ChangeStatus*/
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const currentStatus = button.getAttribute("data-status");
            const currentID = button.getAttribute("data-id");

            let statusChange = currentStatus == "active" ? "inactive" : "active";


            const action = path + `/${statusChange}/${currentID}?_method=PATCH`

            formChangeStatus.action = action;

            formChangeStatus.submit();
        });
    });
};

//preview image
const uploadtImg = document.querySelector("[upload-img]");
if (uploadtImg) {
    const uploadImageInput = document.querySelector("[upload-img-input]");
    const previewImg = document.querySelector("[upload-img-preview]");
    uploadImageInput.addEventListener("change", (event) => {
        const [file] = event.target.files;
        if (file) {
            previewImg.src = URL.createObjectURL(file);
        }
    });
};