let totalTorque = 0
let previewEl = null
let rightWeight = 0
let leftWeight = 0

const history = document.getElementById("history")
const plank = document.querySelector(".seesaw-plank")
const rect = plank.getBoundingClientRect()

const randomColorGenerator = () => '#' + Math.floor(Math.random()*16777215).toString(16)
    
// Random Weight between 1 and 10 
const randomWeight = () => Math.floor(Math.random() * 10) + 1

// let nextWeight = randomWeight()
const randomWeightBall = () => {
    return {
        weight: randomWeight(),
        color: randomColorGenerator()
    }
}

let nextWeight = randomWeightBall()


// Torque Logic
const computeTorque = (x, weight, plankWitdh = 400) => {
    const pivotX = plankWitdh / 2
    const distance = x - pivotX
    const torque = weight * distance
    return torque
}

// Rotation Logic, Rotation between -30 and 30 degrees
const computeRotation = () => {
    const angle = Math.max(-30, Math.min(30, totalTorque / 10))
    return angle
}

const createWeightElement = (x, weight, color, className) => {
    const element = document.createElement('div')
    element.classList.add(className)

    // Weight Position
    element.style.left = `${x}px`
    element.style.width = `${15 + weight * 3}px`
    element.style.height = `${15 + weight * 3}px`
    
    element.style.backgroundColor = color

    // Text Styling
    element.textContent = weight
    element.style.display = "flex"
    element.style.alignItems = "center"
    element.style.justifyContent = "center"
    element.style.fontSize = "16px"
    element.style.fontWeight = "bold"

    return element
}


const handlePlankHover = () => {
    plank.addEventListener("mousemove", (event) => {
        const x = event.clientX - rect.left

        if (!previewEl) {
            previewEl = createWeightElement(x, nextWeight.weight, nextWeight.color , "weight-hover")
            plank.appendChild(previewEl)
        }
        // Update preview position
        previewEl.style.left = `${x}px`
    })

    // Remove preview element when:
    plank.addEventListener("mouseleave", handlePlankHoverEnd)
    plank.addEventListener("click", handlePlankHoverEnd)
}

const handlePlankHoverEnd = () => {
    if (previewEl) {
        previewEl.remove()
        previewEl = null
    }
}

const updateStats = (x, weight, color, angle) => {
    if (x > 200) {
        rightWeight += weight
        document.getElementById("right-weight-value").textContent = rightWeight
        updateHistory(x, weight, "right", color)
    }
    else if (x < 200) {
        leftWeight += weight
        document.getElementById("left-weight-value").textContent = leftWeight
        updateHistory(x, weight, "left", color)
    } 
    else {
        console.log("Weight is in the center!")
        updateHistory(x, weight, "center", color)
    }
    document.getElementById("angle-value").textContent = angle + "°"
}

const updateHistory = (x, weight, side, color) => {
    const span = document.createElement("span")
    span.classList.add("history-item")
    span.textContent = `📦 ${weight}kg dropped on the ${side} side, ${x-200}px from the center`
    span.style.borderColor = color
    history.prepend(span)
}

const updateNextWeightStat = (weight, color) => {
    document.getElementById("next-weight-value").textContent = weight
    document.getElementById("next-weight-value").style.color = color
}

updateNextWeightStat(nextWeight.weight, nextWeight.color)

const handlePlankClick = () => {
    const plankStyle = plank.style
    plank.addEventListener('click', (event) => {
        if (!previewEl) return;

        const x = event.clientX - rect.left

        previewEl.classList.remove('weight-hover')
        previewEl.classList.add('weight')

        previewEl = null

        // Update physics & Apply rotation
        const torque = computeTorque(x, nextWeight.weight)
        totalTorque += torque
        const rotation = computeRotation()
        plankStyle.transform = `rotate(${rotation}deg)`

        updateStats(x, nextWeight.weight, nextWeight.color, rotation)

        console.log({totalTorque, rotation, lastAddedWeight: nextWeight.weight, color: nextWeight.color})

        // Next turn
        nextWeight = randomWeightBall()

        updateNextWeightStat(nextWeight.weight, nextWeight.color)

    })
}

handlePlankClick()
handlePlankHover()