const BASE_URL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/john_perkins/events";

let events = [];

const form = document.getElementById("addEvent");
form.addEventListener("submit", addEvent);

async function render() {
  events = await getEvents();

  const eventsElement = document.getElementById("events");

  const eventCards = events.map((event) => {
    const eventCard = document.createElement("div");
    eventCard.classList.add("event");
    eventCard.innerHTML = `
            <h3>${event.id}</h3>
            <h4>${event.name}</h4>
            <h4>${event.date}</h4>
            <h4>${event.location}</h4>
            <p>${event.description}<p>
        `;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => deleteEvent(event.id));
    eventCard.append(deleteButton);
    return eventCard;
  });

  eventsElement.replaceChildren(...eventCards);
}
render();

async function getEvents() {
  try {
    const response = await fetch(BASE_URL);
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error);
  }
}

async function addEvent(event) {
  try {
    event.preventDefault();

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name.value,
        date: new Date(form.date.value).toISOString(),
        location: form.location.value,
        description: form.description.value,
      }),
    });
    if (!response.ok) {
      throw new Error("Error Creating Event!");
    }

    // const json = await response.json();

    render();
  } catch (error) {
    console.error(error);
  }
}

async function deleteEvent(eventId) {
  try {
    const response = await fetch(BASE_URL + "/" + eventId, {
      method: "DELETE",
    });

    render();
  } catch (error) {
    console.error(error);
  }
}
