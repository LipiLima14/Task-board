const columns = document.querySelectorAll(".column_cards")
const cards = document.querySelectorAll(".card")
let numberCards = document.querySelectorAll(".number_cards")
let titles = document.querySelectorAll(".column_title")

let draggedCard

const saved = () => {
    columns.forEach((column) => column.click())
}

const dragStart = (event) => {
    draggedCard =  event.target
    event.dataTransfer.effectAllowed = "move"
}

const dragOver = (event) => {
    event.preventDefault()
}

const dragEnter = ({ target }) => {
    if (target.classList.contains("column_cards")) {
        target.classList.add("column_heighlight")
    }
}

const drop = ({ target }) => {
    if (target.classList.contains("column_cards")) {
        target.classList.remove("column_heighlight")
        target.append(draggedCard)
        saved()
    }
}

const dragLeave = ({ target }) => {
    target.classList.remove("column_heighlight")
}

const createCard = ({ target }) => {
    if (!target.classList.contains("column_cards")) return

    const card =  document.createElement("section")

    card.className = "card"
    card.draggable = "true"
    card.contentEditable = "true"

    card.addEventListener("focusout", () => {
        card.contentEditable = "false"
        if (!card.textContent) card.remove()
        saved()
    })

    card.addEventListener("dblclick", () => {
        card.contentEditable = "true"
        card.focus()
        if (!card.textContent) card.remove()
    })

    card.addEventListener("dragstart", dragStart)

    target.append(card)
    card.focus()
}

const addNumber = ({ target }) => {
    const array = Array.from(target.children)
    const index = target.getAttribute("data-number")
    
    numberCards[index].textContent = array.length
}

const editTitle = ({ target }) => {
    target.contentEditable = "true"
    target.style.cursor = "text"
    target.focus()

    target.addEventListener("focusout", () => {
        target.contentEditable = "false"
        target.style.cursor = "pointer"
    })
}

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver)
    column.addEventListener("dragenter", dragEnter)
    column.addEventListener("dragleave", dragLeave)
    column.addEventListener("drop", drop)
    column.addEventListener("dblclick", createCard)
    column.addEventListener("click", addNumber)
})

titles.forEach((title) => {
    title.addEventListener("click", editTitle)
})