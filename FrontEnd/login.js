

let form = document.getElementById('formLog')

form.addEventListener('submit', function (x) {
  x.preventDefault()
  let email = document.getElementById('eMail').value
  let passWord = document.getElementById('passW').value

  fetch('http://localhost:5678/api/users/login', {
    method: "POST",
    headers: { "Content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      email: email,
      password: passWord
    })


  })
    .then(resp => {
      if( !resp.ok){
        //location.replace('index.html')
        throw new Error("password or user , no match")
      }
      return resp.json();
    })
    .then(data => {
      //location.replace('index.html')
      console.log(data.token)
    })
    .catch(error => console.log('error in login'));
})





/* const formLogIn = document.getElementById('formLog')

formLogIn.addEventListener('submit', function (x) {
    x.preventDefault();
    const preFormload = new FormData(formLogIn);
    const formload = new URLSearchParams(preFormload )
    console.log([...formLogIn]);

    fetch('http://localhost:5678/users/login',{
        method: "POST",
        body: formload,
         
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log('error in login'));
  
})  */

//http://localhost:5678/api/users/login 'http://httpbin.org/post' body: JSON.stringify(formLogIn)