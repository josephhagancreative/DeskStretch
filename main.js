// Test Data
import { stretchesArr } from "./data.js"

// Elements
const btnRandomStretch = document.getElementById("btnRandomStretch")
const mainContainer = document.getElementById("main-container")
const form = document.getElementById("form")
const errorDiv = document.querySelector(".errorDiv")

// Checkboxes
const checkedboxesPosition = document.getElementsByName("position")
const allPositions = document.getElementById("allPositions")

const checkedboxesBodypart = document.getElementsByName("bodypart")
const allBodyparts = document.getElementById("allBodyparts")

const checked = document.querySelectorAll("input:checked")

allPositions.addEventListener("click", () =>
  checkAll(allPositions, checkedboxesPosition)
)
allBodyparts.addEventListener("click", () =>
  checkAll(allBodyparts, checkedboxesBodypart)
)

// Main event listener
btnRandomStretch.addEventListener("click", (e) => {
  e.preventDefault()
  const selected = checkIfSelection(checkedboxesPosition, checkedboxesBodypart)
  if (!selected) return
  // Create tags arrays
  const positionTags = createTagsArray(checkedboxesPosition)
  const bodyTags = createTagsArray(checkedboxesBodypart)
  // Filter tags against arrays
  const positionResult = filterSet(positionTags, stretchesArr)
  const bodypartResult = filterSet(bodyTags, positionResult)
  // Choose a random stretch from matching arrays
  const randomStretch = findRandomStretch(bodypartResult)

  // display stretch elements on page
  displayStretch(randomStretch)
})

// Helper Functions
// Create a set from an array and filter from another array
function filterSet(arrToSet, arrToFilter) {
  const filtered = new Set(arrToSet)
  const result = arrToFilter.filter((o) =>
    o.tags.some((tag) => filtered.has(tag))
  )
  return result
}

// Random array entry
function findRandomStretch(bodypartResult) {
  const result =
    bodypartResult[Math.floor(Math.random() * bodypartResult.length)]
  return result
}

// Check if atleast 1 position and body part are selected
function checkIfSelection(checkBoxes1, checkBoxes2) {
  let tags1 = []
  let tags2 = []
  for (let checkbox of checkBoxes1) {
    if (checkbox.checked) tags1.push(checkbox.value)
  }
  for (let checkbox of checkBoxes2) {
    if (checkbox.checked) tags2.push(checkbox.value)
  }
  if (tags1.length !== 0 && tags2.length !== 0) {
    return true
  } else {
    showAlert()
  }
}

// Set up alert message and turn boxes red
function showAlert() {
  errorDiv.innerText = "Please select at least one position and one body part"
  errorDiv.classList.add("show")
  form.classList.add("formError")
  setTimeout(() => {
    errorDiv.innerText = ""
    errorDiv.classList.remove("show")
    form.classList.remove("formError")
  }, 3000)
}

function createTagsArray(checkedBoxes) {
  let tags = []
  for (let checkbox of checkedBoxes) {
    if (checkbox.checked) tags.push(checkbox.value)
  }
  return tags
}

function checkAll(allButton, buttonArr) {
  for (let checkbox of buttonArr) {
    checkbox.checked = allButton.checked
  }
}

function displayStretch(stretch) {
  let stretchElement = document.createElement("div")
  let tagString = ""
  for (let i = 0; i < stretch.tags.length; i++) {
    tagString += `<p class="tag">${stretch.tags[i]}</p> \n`
  }
  stretchElement = `
  <div class="content">
    <div class="result-container">
      <div class="stretch-details">
      <h2 class="stretch-name">${stretch.stretchName}</h2>
      <p class="stretch-description">${stretch.stretchDesc}</p>
      <div class="tags-box">
        <h5 class="tag-title">Tags:</h5>${tagString}
      </div>
      <div id="timer" class="timer-box">
        00:00
      </div>
      <button class="btn" onClick="window.location.reload()">
    Find a new stretch
  </button>
    </div>
    <div class="stretch-img-box">
      <img class="stretch-img" src="${stretch.img}" alt="Stretch Image" />
    </div>
  </div>
   
    </div>
  `
  mainContainer.innerHTML = stretchElement
}
