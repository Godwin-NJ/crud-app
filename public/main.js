const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

// const database = {
//     data :  [
//         {
//         "id": 1,
//         "name" : 'Godwin Amadi',
//         "email" : "amadigodwin7@gmail.com",
//         "country" : "Nigeria"
//     }
// ]
// }


update.addEventListener('click', _ => {
   fetch('/data', {
       method: 'put',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
        name: 'Darth Vadar',
        email: "amadigodwin7@gmail.com",
        country : "Nigeria"
    })
   })
    .then(res => {
    if (res.ok) return res.json()
    })
    .then(response => {
        console.log(response)
    })
})


deleteButton.addEventListener('click', _ => {
  fetch('/data', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vadar'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
   .then(response => {
      if (response === 'No data to delete') {
        messageDiv.textContent = 'No Data to delete'
      } else {
        window.location.reload(true)
      }
    })
    .catch(error => console.error(error))
})