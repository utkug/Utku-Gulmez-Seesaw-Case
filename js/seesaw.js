let totalTorque = 0
let previewEl = null

const plank = document.querySelector(".seesaw-plank")
const rect = plank.getBoundingClientRect()

// Random Weight between 1 and 10 
const randomWeight = () => Math.floor(Math.random() * 10) + 1

let nextWeight = randomWeight()

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

const createWeightElement = (x, weight, className) => {
    const element = document.createElement('div')
    element.classList.add(className)

    // Weight Position
    element.style.left = `${x}px`
    element.style.width = `${15 + weight * 3}px`
    element.style.height = `${15 + weight * 3}px`

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
            previewEl = createWeightElement(x, nextWeight, "weight-hover")
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

const handlePlankClick = () => {
    const plankStyle = plank.style
    plank.addEventListener('click', (event) => {
        const x = event.clientX - rect.left

        const weightEl = createWeightElement(x, nextWeight, "weight")
        plank.appendChild(weightEl)

        // Update physics & Apply rotation
        const torque = computeTorque(x, nextWeight)
        totalTorque += torque
        const rotation = computeRotation()
        plankStyle.transform = `rotate(${rotation}deg)`

        console.log({totalTorque, rotation, lastAddedWeight: nextWeight})

        // Next turn
        nextWeight = randomWeight()
    })
}

handlePlankClick()
handlePlankHover()