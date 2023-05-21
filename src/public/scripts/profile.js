const modal = document.querySelector('.modal')
modal.style.zIndex = -99
modal.style.opacity = 0

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

const updatePostButton = document.querySelectorAll('.updatePostButton')
const deletePostButton = document.querySelectorAll('.deletePostButton')
const cancelUpdatePostButton = document.querySelector('#cancel-update')

deletePostButton.forEach((button) => {
    button.addEventListener('click', () => {
        const form = button.parentNode.parentNode
        form.setAttribute('action', '/post?_method=DELETE')
        form.setAttribute('method', 'POST')
        form.submit()
    })
})

cancelUpdatePostButton.addEventListener('click', () => {
    const modal = document.querySelector('.modal')
    modal.style.zIndex = -99
    modal.style.opacity = 0
    document.body.style.overflowY = 'scroll'
})

updatePostButton.forEach((button) => {
    button.addEventListener('click', async () => {
        const {id} = button.parentNode.parentNode
        console.log(id)

        const post = await fetch(`/getPost?post_id=${id}`)
        .then((response) => response.json())
        .then((response) => response)

        const inputs = document.querySelectorAll('.update-input')

        inputs.forEach((input) => {
            if (input.name == 'hours') {
                input.value = post.departure_time.split('h')[0]
                return
            }

            if (input.name == 'minutes') {
                input.value = post.departure_time.split('h')[1]
                return
            }

            input.value = post[input.name]
        })

        const modal = document.querySelector('.modal')
        const panel = document.querySelector('.panel')
        modal.style.zIndex = 1031
        modal.style.opacity = 1
        panel.style.overflowY = 'scroll'
        //document.body.style.overflowY = 'hidden'
    })
})