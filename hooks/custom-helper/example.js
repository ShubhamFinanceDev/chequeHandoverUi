export const changeHandlerCases = (prevState, { name, value }) => {

}

export const fileChangeHandlerCases = (prevState, { type, name, files, value }) => {
    if (type == 'file') {
        const allowedTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/csv',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
            'application/pdf'
        ];

        files = Array.from(files);
        files = files.filter(file => allowedTypes.includes(file.type)).map((f) => {
            f.preview = URL.createObjectURL(f)
            f.extension = f.name.slice((f.name.lastIndexOf(".") - 1 >>> 0) + 2)
            return f
        })
        prevState[name] = files
    }
    prevState[name] = value

}