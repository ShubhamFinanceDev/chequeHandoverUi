const changeHandlerHelper = (e, state, setState, customChangesFn = () => { }) => {
    const prevState = { ...state }

    let { name, value, checked, type, files } = e.target;

    if (type == "checkbox") {
        let checkboxValueArray = prevState[name]
        if (Array.isArray(checkboxValueArray)) {
            if (!checked) {
                prevState[name] = [...checkboxValueArray.filter((d) => d != value)]
                debugger
            } else {
                prevState[name] = [...checkboxValueArray, value]
                debugger
            }
        } else {
            prevState[name] = checked
        }

        customChangesFn(prevState, e.target)
        setState(prevState)
        return
    }

    if (type === "number") {
        value *= 1
    }
    if (type === 'file') {
        const [file] = files

        prevState[name] = {
            preview: URL.createObjectURL(file),
            extension: file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2),
            path: "",
            file: file
        }
    } else {
        prevState[name] = value
    }

    customChangesFn(prevState, e.target)
    setState(prevState)
}

module.exports = { changeHandlerHelper }
