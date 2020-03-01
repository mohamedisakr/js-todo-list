// ============================= variables ===============================
const itemForm = document.querySelector("#itemForm");
const itemInput = document.querySelector("#itemInput");
const itemList = document.querySelector(".item-list");
const clearButton = document.querySelector("#clear-list");
const feedback = document.querySelector(".feedback");
// ============================= end of variables ===============================

// ============================= Todo List =====================================
let itemData = [];
// ============================= end of Todo List ===============================

// ============================= Form submission =====================================
itemForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const textValue = itemInput.value;
  if (textValue === "") {
    showFeedback("Please enter valid value", "danger");
  } else {
    // add item to html body
    addItem(textValue);

    // clear the input box
    itemInput.value = "";

    // add item to the todo list
    itemData.push(textValue);
    console.log(itemData);

    // add item to the local storage

    // add event listeners to icons
    handleItem(textValue);
  }
});
// ============================= end of Form submission ===============================

// ============================= Helper Functions =====================================
// Show feedback
function showFeedback(text, action) {
  feedback.classList.add("showItem", `alert-${action}`);
  feedback.innerHTML = `<p>${text}</p>`;

  setTimeout(function() {
    feedback.classList.remove("showItem", `alert-${action}`);
  }, 4000);
}

// add item
function addItem(textValue) {
  const div = document.createElement("div");
  div.classList.add("item", "my-3");
  div.innerHTML = ` 
  <h5 class="item-name text-capitalize">${textValue}</h5>
  <div class="item-icons">
    <a href="#" class="complete-item mx-2 item-icon">
        <i class="far fa-check-circle"></i>
    </a>
    <a href="#" class="edit-item mx-2 item-icon">
        <i class="far fa-edit"></i>
    </a>
    <a href="#" class="delete-item item-icon">
        <i class="far fa-times-circle"></i>
    </a>
  </div>`;
  itemList.appendChild(div);
}

function handleItem(textValue) {
  const items = itemList.querySelectorAll(".item");
  items.forEach(function(item) {
    if (item.querySelector(".item-name").textContent === textValue) {
      // complete event listener
      item
        .querySelector(".complete-item")
        .addEventListener("click", function() {
          item.querySelector(".item-name").classList.toggle("completed");
          this.classList.toggle("visibility");
        });
      // edit event listener
      item.querySelector(".edit-item").addEventListener("click", function() {
        itemInput.value = textValue;
        itemList.removeChild(item);
        itemData = itemData.filter(item => item !== textValue);
      });
      // delete event listener
      item.querySelector(".delete-item").addEventListener("click", function() {
        itemList.removeChild(item);
        itemData = itemData.filter(item => item !== textValue);
        showFeedback("Item deleted", "success");
      });
    }
  });
}

// TODO clear button handler

// ============================= end of Helper Functions ===============================
