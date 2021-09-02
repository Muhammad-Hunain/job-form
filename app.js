const submit = () =>{
var name = document.getElementById('name').value;
var email = document.getElementById('email').value;
var myfile = document.getElementById('select').value;
if(name=="" || email=="" ){
    alert("Please enter the value");
}
else{
var obj ={
    name:name,
    email:email,
    myfile:files.name,
}
firebase.database().ref(`/${name}`).set(obj)
alert("Your Form Submitted Successfully");
}

document.getElementById('name').value = "";
document.getElementById('email').value ="";
document.getElementById('select').removeAttribute('disabled')
document.getElementById('upload').setAttribute('disabled',true)
}

var files = [];

const select= () =>{
    var input = document.createElement('input');
    input.type='file';
    input.accept='image/*';

    input.onchange=(d1)=>{
        files=d1.target.files[0];
        console.log(files);
    document.getElementById('upload').removeAttribute('disabled')
    document.getElementById('select').setAttribute('disabled',true)
    }
    input.click()
}

const upload=() =>{
    var refTask = firebase.storage().ref();
    var uploadTask = refTask.child(`images/${files.name}`).put(files) 

    uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //   console.log('File available at', downloadURL);
    // });
    var Url_File = uploadTask.snapshot.ref.getDownloadURL().then(function (URL) {
      alert("your CV uploaded")
      console.log('File available at', URL);
    
  });
  }
);

}



