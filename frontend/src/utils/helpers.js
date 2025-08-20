export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}


export function formatNumber(x) {
    const round = Math.round(x * 100) / 100;
    return round.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export function idString(str){
 let strArry= str.split(' ')
 let modifiedStr = strArry.join('_')
 let lowerString = modifiedStr.toLowerCase().replace(/ /g,"_")

 return lowerString
}