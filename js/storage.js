const storeStateOfSeesaw = (seesawState) => {
    window.localStorage.setItem('seesawState', JSON.stringify(seesawState))
}

const getStateOfSeesaw = () => {
    const savedData = window.localStorage.getItem('seesawState')
    if (savedData) {
        const seesawState = JSON.parse(savedData)
        return seesawState
    }
}

const resetStateOfSeesaw = () => {
    window.localStorage.removeItem('seesawState')
}