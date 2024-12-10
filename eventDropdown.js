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
        let isChecked = document.querySelectorAll(".checked"),
          btnText = document.querySelector(".btn-text");
        if (isChecked && isChecked.length > 0) {
          btnText.innerText = `${isChecked.length} Selected`;
        } else {
          btnText.innerText = "Select events";
        }
      });
      ulElem.appendChild(newListItem);

      let listItemContent = `<span class="checkbox"><i class="fa-solid fa-check check-icon"></i></span>
        <span class="item-text">${event.title} - ${event.date}</span>`;

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

  isChecked = document.querySelectorAll(".checked");
  if (isChecked && isChecked.length > 0) {

    let filteredEventIds = [];
    isChecked.forEach((element) => {
      filteredEventIds.push(element.id);
      element.classList.remove("checked");
    });

    let filteredEvents = [];
    eventData.forEach((element) => {
      if (filteredEventIds.toString().includes(element.id)) {
        filteredEvents.push(element);
      }
    });
    console.log({ filteredEvents });

    btnText = document.querySelector(".btn-text");
    selectBtn.classList.remove("open");
    btnText.innerText = "Select events";

    alert(`Your selected events: ${filteredEventIds}`);
  } else {
    alert("Ensure you select at least one event");
  }
});
