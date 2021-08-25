
const submit = () =>{
var name = document.getElementById('name').value;
var email = document.getElementById('email').value;
var myfile = document.getElementById('myfile').value;
var obj ={
    name:name,
    email:email,
    myfile :myfile,
}



firebase.database().ref(`/${name}`).set(obj)

}













