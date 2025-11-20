let totalTorque = 0

const randomWeight = () => {
    return Math.floor(Math.random() * 10) + 1
}

const computeTorque = (x, weight, plankWitdh = 400) => {
    const pivotX = plankWitdh / 2
    const distance = x - pivotX
    const torque = weight * distance
    return torque
}

const computeRotation = (k = 0.1) => {
    const angle = Math.max(-30, Math.min(30, totalTorque / 10))
    return angle
}


const handlePlankClick = () => {
    const plank = document.querySelector('.seesaw-plank')
    const plankStyle = plank.style
    plank.addEventListener('click', (event) => {
        const rect = plank.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        const weight = randomWeight()
        const torque = computeTorque(x, weight)
        totalTorque += torque
        const rotation = computeRotation()
        plankStyle.transform = `rotate(${rotation}deg)`

        console.log({totalTorque, rotation, lastAddedWeight: weight})
    })
}

handlePlankClick()