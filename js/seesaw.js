let totalTorque = 0
let previewEl = null

const randomWeight = () => {
    return Math.floor(Math.random() * 10) + 1
}

const computeTorque = (x, weight, plankWitdh = 400) => {
    const pivotX = plankWitdh / 2
    const distance = x - pivotX
    const torque = weight * distance
    return torque
}

const computeRotation = () => {
    const angle = Math.max(-30, Math.min(30, totalTorque / 10))
    return angle
}

const createWeightElement = (x, weight, className) => {
    const element = document.createElement('div')
    element.classList.add(className)

    element.style.left = `${x}px`
    element.style.width = `${15 + weight * 3}px`
    element.style.height = `${15 + weight * 3}px`

    
    element.textContent = weight
    element.style.display = "flex"
    element.style.alignItems = "center"
    element.style.justifyContent = "center"
    element.style.fontSize = "16px"
    element.style.fontWeight = "bold"

    return element
}


const handlePlankHover = () => {
    const plank = document.querySelector(".seesaw-plank");

    plank.addEventListener("mousemove", (event) => {
        const rect = plank.getBoundingClientRect()
        const x = event.clientX - rect.left

        if (!previewEl) {
            const weight = randomWeight()
            previewEl = createWeightElement(x, weight, "weight-hover")
            previewEl.dataset.weight = weight
            plank.appendChild(previewEl)
        }

        previewEl.style.left = `${x}px`
        previewEl.style.width = `${12 + weight * 3}px`
        previewEl.style.height = `${12 + weight * 3}px`
    })

    plank.addEventListener("mouseleave", () => {
        if (previewEl) {
            previewEl.remove()
            previewEl = null
        }
    })
}

const handlePlankClick = () => {
    const plank = document.querySelector('.seesaw-plank')
    const plankStyle = plank.style
    plank.addEventListener('click', (event) => {
        const rect = plank.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        const weight = randomWeight()

        const weightEl = createWeightElement(x, weight, "weight")
        plank.appendChild(weightEl)

        const torque = computeTorque(x, weight)
        totalTorque += torque
        const rotation = computeRotation()
        plankStyle.transform = `rotate(${rotation}deg)`

        console.log({totalTorque, rotation, lastAddedWeight: weight})
    })
}

handlePlankClick()
handlePlankHover()