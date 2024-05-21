export const requiredFields = (requiredInputArray = [], state = {}) => {
    const errorArr = []
    const setError = (k) => errorArr.push(k)

    for (const k of requiredInputArray) {
        if (Array.isArray(state[k]) && state[k].length === 0) {
            setError(k)
        } else if (typeof state[k] === 'object' && Object.keys(state[k]).length === 0) {
            setError(k)
        } else if (state[k] === null || state[k] === undefined || state[k] === "") {
            setError(k)
        }
    }

    if (errorArr.length > 0) {
        console.log('+++ Required Fields Error', errorArr.join(","));
        throw new Error('Please fill in all required fields marked with an asterisk (*) to proceed.');
    }
}

export const conditionRequiredFields = (conditionCases = [], state = {}) => {
    for (const i of conditionCases) {
        const { condition = () => { }, requiredInputs = [] } = i
        if (condition(state)) {
            requiredFields(requiredInputs, state)
        }
    }
}