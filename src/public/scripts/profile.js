const formProfile = document.querySelector('#form-profile')

const updateButton = document.querySelector('#update-button')
const logoutButton = document.querySelector('#logout-button')
const deleteButton = document.querySelector('#delete-button')

updateButton.addEventListener('click', () => {
    formProfile.setAttribute('action', '/profile?_method=PUT')
    formProfile.submit()
})

logoutButton.addEventListener('click', () => {
    formProfile.setAttribute('action', '/login?_method=DELETE')
    formProfile.submit()
})

deleteButton.addEventListener('click', () => {
    formProfile.setAttribute('action', '/profile?_method=DELETE')
    formProfile.submit()
})