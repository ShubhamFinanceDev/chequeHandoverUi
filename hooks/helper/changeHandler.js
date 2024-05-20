const changeHandlerHelper = (e, state, setState, customChangesFn = () => { }) => {
    const prevState = { ...state }

    let { name, value, checked, type, files } = e.target;

    if (type === "number") {
        value *= 1
    }

    if (type == "checkbox") {
        let checkboxValueArray = prevState[name]
        if (Array.isArray(checkboxValueArray)) {
            if (!checked) {
                prevState[name] = [...checkboxValueArray.filter((d) => d != value)]
            } else {
                prevState[name] = [...checkboxValueArray, value]
            }
        } else {
            prevState[name] = checked
        }

        customChangesFn(prevState, e.target)
        setState(prevState)
        return
    } else if (type === 'file') {
        files = Array.from(files);
        prevState[name] = files
    } else {
        prevState[name] = value
    }

    customChangesFn(prevState, e.target)
    setState(prevState)
}

module.exports = { changeHandlerHelper }
