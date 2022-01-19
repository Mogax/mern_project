export const dateParser = (num) => {
    let options = {hour: "2-digit", minute:"2-digit", second: "2-digit", weekday:"long", year: "numeric", month:"short", day: "numeric"};
    return new Date(Date.parse(num)).toLocaleDateString('fr-FR', options).toString().replaceAll(",", " à");
}

export const timestampParser = (num) => {
    let options = {hour: "2-digit", minute:"2-digit", second: "2-digit", weekday:"long", year: "numeric", month:"short", day: "numeric"};
    return new Date(num).toLocaleDateString('fr-FR', options).toString().replaceAll(",", " à");
}

export const isEmpty = (value) => {
    return value===undefined || value===null || (typeof value === "object" && Object.keys(value).length === 0 )|| (typeof value==="string" && value.trim().length === 0)
}
