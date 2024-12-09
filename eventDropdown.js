const ulElem = document.querySelector("ul");

fetch("./data.json")
  .then((response) => response.json())
  .then((eventData) => {
    eventData.forEach((event) => {
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

const selectBtn = document.querySelector(".select-btn")
selectBtn.addEventListener("click", () => {
  selectBtn.classList.toggle("open");
});