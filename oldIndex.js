const BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/room1'

let events = []

const eventsContainer = document.getElementById("events")

const form = document.getElementById("addEvent")
form.addEventListener("submit", addEvent)


async function getEvents(){
    try{
        const response = await fetch(`${BASE_URL}/events`)
        const json = await response.json()

        return json.data
    } catch(err) {
        console.error(err)
    }
}

event.preventDefault()
async function addEvent(event) {
    try {
        event.preventDefault()

        const id = form.id.value
        const name = form.name.value
        const date = form.date.value
        const location = form.location.value
        const description = form.description.value

        const response = await fetch(`${BASE_URL}/events`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: id,
                name: name,
                date: date,
                location: location,
                description: description
            })
        })
        if (!response.ok) {
            throw new Error("Error creating event!")
        }

        const json = await response.json()

        render()
    }   catch (error) {
        console.error(error)
    }
}

function renderEvents(){
    const htmlEvents = events.map(event => {
        let div = document.createElement("div")

        div.className = "eventCard"

        div.innerHTML = `<h3>#${event.id}</h3>
                        <h4>${event.name}</h4>
                        <h4>${event.date}</h4>
                        <h4>${event.location}</h4>
                        <p>${event.description}</p>`

    return div
    })

    eventsContainer.replaceChildren(...htmlEvents)
}

async function startApp() {
    events = await getEvents()

    renderEvents()
}

startApp()