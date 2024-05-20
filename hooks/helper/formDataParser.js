export function formDataParser(data) {
    const formData = new FormData();
    for (let k in data) {
        if (Array.isArray(data[k]) && data[k].length != 0) {
            for (const i of data[k]) {
                formData.append(k, i);
            }
        } else if (data.hasOwnProperty(k)) {
            formData.append(k, data[k]);
        }
    }
    return formData;
}