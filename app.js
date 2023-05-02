/* Created by Tivotal */

let wrapper = document.querySelector(".wrapper");
let uploadBox = document.querySelector(".upload-box");
let widthInput = document.querySelector(".width input");
let heightInput = document.querySelector(".height input");
let ratioInput = document.querySelector(".ratio input");
let qualityInput = document.querySelector(".quality input");
let fileInput = document.querySelector(".fileInput");
let previewImg = document.querySelector(".previewImg");
let btn = document.querySelector(".btn");

let orgRatio;

let loadImage = (e) => {
  //getting first user selected file
  let file = e.target.files[0];

  //returning if file is not selected
  if (!file) return;

  //if file selected

  //passing selected file url as source to preview image
  previewImg.src = URL.createObjectURL(file);

  //once image loaded
  previewImg.addEventListener("load", () => {
    //displaying image height & width in respective inputs
    widthInput.value = previewImg.naturalWidth;
    heightInput.value = previewImg.naturalHeight;
    orgRatio = previewImg.naturalWidth / previewImg.naturalHeight;
    wrapper.classList.add("active");
  });
};

widthInput.addEventListener("keyup", () => {
  //getting height according to ratio checkbox status
  let height = ratioInput.checked
    ? widthInput.value / orgRatio
    : heightInput.value;
  heightInput.value = height;
});

heightInput.addEventListener("keyup", () => {
  //getting width according to ratio checkbox status
  let width = ratioInput.checked
    ? heightInput.value * orgRatio
    : widthInput.value;
  widthInput.value = width;
});

function downloadEditedImg() {
  //creating new canvas and a elements
  let canvas = document.createElement("canvas");
  let a = document.createElement("a");
  let ctx = canvas.getContext("2d");

  //if the quality checkbox checked passing .5 to quality value else passing 1
  //here .5 is 50% of image quality where as 1 is 100%
  //you can pass values between .1 to 1
  let imgQuality = qualityInput.checked ? 0.5 : 1.0;

  //setting camvas width and height according to input values
  canvas.width = widthInput.value;
  canvas.height = heightInput.value;

  //drawing image selected on canvas
  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

  //passing canvas data to href to a element
  a.href = canvas.toDataURL("image/jpeg", imgQuality);

  //passing current time as download data to a element
  a.download = new Date().getTime();

  //on a element click, downloads the image
  a.click();
}

uploadBox.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", loadImage);
btn.addEventListener("click", downloadEditedImg);
