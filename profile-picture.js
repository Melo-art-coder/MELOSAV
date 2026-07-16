document.addEventListener("DOMContentLoaded",()=>{

const changeBtn=document.getElementById("changePhotoBtn");
const photoInput=document.getElementById("photoInput");
const profileImage=document.getElementById("profileImage");
const avatar=document.getElementById("userAvatar");

if(!changeBtn) return;

changeBtn.onclick=()=>{

photoInput.click();

};

photoInput.onchange=(e)=>{

const file=e.target.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=function(){

profileImage.src=reader.result;

profileImage.style.display="block";

avatar.style.display="none";

const user=getCurrentUser();

if(user){

user.profilePicture=reader.result;

updateUser(user);

}

};

reader.readAsDataURL(file);

};

const user=getCurrentUser();

if(user && user.profilePicture){

profileImage.src=user.profilePicture;

profileImage.style.display="block";

avatar.style.display="none";

}

});