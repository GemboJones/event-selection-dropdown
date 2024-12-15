const ulElem = document.querySelector("ul");

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((event) => {
      const newListItem = document.createElement("li");
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
      const listItemContent = `<span class="checkbox"><i class="fa-solid fa-check check-icon"></i></span>
      <span class="item-text">${event.title} - ${event.date}</span>`;
      
      newListItem.insertAdjacentHTML("beforeend", listItemContent);
      ulElem.appendChild(newListItem);
    });

    const selectBtn = document.querySelector(".select-btn");
    selectBtn.addEventListener("click", () => {
      selectBtn.classList.toggle("open");
    });

    const input = document.querySelector("input");
    const allListItems = document.querySelectorAll("li");

    input.addEventListener("input", (e) => {
      const search = e.target.value.toLowerCase();
      allListItems.forEach((listItem) => {
                listItem.classList.toggle(
                  "hidden",
                  !listItem.innerText.toLowerCase().includes(search)
                );
      });
    });

    const dropdown = document.querySelector(".dropdown");
    const arrowButton = document.querySelector(".arrow-dwn");
    const arrow = document.querySelector("i");
    btnText = document.querySelector(".btn-text");
    document.addEventListener("click", (e) => {
      if (selectBtn.classList.contains("open") &&
        !dropdown.contains(e.target) &&
        e.target !== selectBtn &&
        e.target !== arrowButton &&
        e.target !== arrow &&
        e.target !== btnText
      ) {
        selectBtn.classList.remove("open");
      }
    });

    const formSubmit = document.querySelector("form");
    formSubmit.addEventListener("submit", (e) => {
      e.preventDefault();

      isChecked = document.querySelectorAll(".checked");
      if (isChecked && isChecked.length > 0) {
        const filteredEventIds = [];
        isChecked.forEach((element) => {
          filteredEventIds.push(element.id);
        });

        const filteredEvents = [];
        data.forEach((element) => {
          if (filteredEventIds.toString().includes(element.id)) {
            filteredEvents.push(element);
          }
        });
        console.log({ filteredEvents });

        selectBtn.classList.remove("open");
        btnText.innerText = "Select events";

        alert(`Your selected event IDs: \n${filteredEventIds}`);
      } else {
        alert("Ensure you select at least one event");
      }
      input.value = "";
      allListItems.forEach((listItem) => {
        listItem.classList.remove("hidden");
        listItem.classList.remove("checked");

      });
    });
  });
