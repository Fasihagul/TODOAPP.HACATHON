const firebaseConfig = {
  apiKey: "AIzaSyBh9LKWYGxTMXQ1E3WS0N0kzUSg3tdIdEI",
  authDomain: "todoapp-25965.firebaseapp.com",
  databaseURL: "https://todoapp-25965-default-rtdb.firebaseio.com",
  projectId: "todoapp-25965",
  storageBucket: "todoapp-25965.firebasestorage.app",
  messagingSenderId: "390020697091",
  appId: "1:390020697091:web:83ec99264b07182b451236"
};
const frb = firebase.initializeApp(firebaseConfig);

// global variable
var ulElement = document.getElementById("list");
 
firebase.database()
.ref("todos")
.on('child_added',(data)=>{
 
 
     var liElement = document.createElement("li");

     var liText = document.createTextNode(data.val().value);

     liElement.appendChild(liText);

     console.log(liText)
    // delete button create

    var delBtnElement = document.createElement("button");
delBtnElement.style.width= '110px';   
delBtnElement.style.height= '25px';         
 delBtnElement.style.borderImage= 'linear-gradient(45deg, pink, lightblue, lightgreen) 1'; 
delBtnElement.style.borderRadius= '5px';    
delBtnElement.style.outline= 'none'; 
delBtnElement.style.fontSize=' 15px';       
   
    var delBtnText = document.createTextNode("Delete");

    delBtnElement.appendChild(delBtnText);

    delBtnElement.setAttribute("id",data.val().key)
  /////  delBtnText.setAttribute("id",data.val().key)///////


    delBtnElement.setAttribute("onclick", "deleteSingleTodo(this)");

    liElement.appendChild(delBtnElement);

    // edit button create

    var EditBtnElement = document.createElement("button");

    EditBtnElement.style.width= '110px';   
    EditBtnElement.style.height= '25px';         
    EditBtnElement.style.borderImage= 'linear-gradient(45deg, pink, lightblue, lightgreen) 1'; 
    EditBtnElement.style.borderRadius= '5px';    
    EditBtnElement.style.outline= 'none'; 
    EditBtnElement.style.fontSize=' 15px'; 

    var EditBtnText = document.createTextNode("Edit");


    EditBtnElement.appendChild(EditBtnText);

    liElement.appendChild(EditBtnElement);

    EditBtnElement.setAttribute("onclick", "editSingleTodo(this)");

    EditBtnElement.setAttribute("id",data.val().key)
    ulElement.appendChild(liElement);
    input.value = "";
  }


)




function addtodo() {
  var input = document.getElementById("input");

console.log(input.value)
        var key =firebase.database().ref("todos").push().key;
let obj={
value:input.value,
 key:key,
};
firebase.database().ref("todos").child(key).set(obj)
}


function deleteAllTodos() {
var list=document.getElementById("list")
  ulElement.innerHTML = "";
firebase.database().ref("todos").remove()
}

function deleteSingleTodo(e) {
console.log(e.id);

  firebase.database().ref("todos").child(e.id).remove()
  e.parentNode.remove();
 }

function editSingleTodo(a) {

  var val=a.parentNode.firstChild.nodeValue;
  var updateVal = prompt("Enter updated value ");
var edittodo={
value:updateVal,
key:a.id

}
firebase.database().ref("todod").child(a.id).set(edittodo)
  a.parentNode.firstChild.nodeValue = updateVal;
}