const ulElem = document.querySelector("ul");
let eventData = [];

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    eventData = data;
    data.forEach((event) => {
      let newListItem = document.createElement("li");
      newListItem.id = `${event.id}`;
      newListItem.className = "item";
      newListItem.addEventListener("click", () => {
        newListItem.classList.toggle("checked");
        let checked = document.querySelectorAll(".checked"),
          btnText = document.querySelector(".btn-text");
        if (checked && checked.length > 0) {
          btnText.innerText = `${checked.length} Selected`;
        } else {
          btnText.innerText = "Select events";
        }
      });

      let listItemContent = `<span class="checkbox"><i class="fa-solid fa-check check-icon"></i></span>
        <span class="item-text">${event.title} - ${event.date}</span>`;

      ulElem.appendChild(newListItem);
      newListItem.insertAdjacentHTML("beforeend", listItemContent);
    });
  });

const selectBtn = document.querySelector(".select-btn");
selectBtn.addEventListener("click", () => {
  selectBtn.classList.toggle("open");
});

let formSubmit = document.querySelector("form");
formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();

  let isChecked = document.querySelectorAll(".checked");
  if (isChecked && isChecked.length > 0) {
    
    let selectedEventIds = [];
    isChecked.forEach((element) => {
      element.classList.remove("checked");
      selectedEventIds.push(element.id);
    });

    btnText = document.querySelector(".btn-text");
    selectBtn.classList.remove("open");
    btnText.innerText = "Select events";

    let filteredEvents = { filteredEvents: [] };
    eventData.forEach((element) => {
      if (selectedEventIds.toString().includes(element.id)) {
        filteredEvents.filteredEvents.push(element);
      }
    });
    console.log(filteredEvents);

    alert(`Your selected events: ${selectedEventIds}`);
  } else {
    alert("Ensure you select at least one event");
  }
});
