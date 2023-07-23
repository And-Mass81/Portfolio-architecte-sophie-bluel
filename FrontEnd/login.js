

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
      if (!resp.ok) {
        throw new Error("password or user , no match")
      }
      return resp.json();
    })
    .then(data => {
      //console.log(data.token)
      localStorage.setItem("passOk", data.token);
      location.replace('index.html')


    })
    .catch(error => document.querySelector(".errorPass").style.display ="block");
})




