export const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

//*Convert Array Object into Object
export const objectAssign = (ObjectArray, obj) => {
  return ObjectArray.map((info) => {
    return Object.assign(obj, info)
  })
}

export const coordinatorName = (fetchCoordinator, coordEmail) => {
  fetchCoordinator.filter((type) => type.email === coordEmail)
}

export const generateTaskCode = () => {
  var today = new Date()
  var dd = String(today.getDate()).padStart(2, "0")
  var mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
  var yyyy = today.getFullYear()

  today = `${mm}${dd}${yyyy}`

  const newTaskCode = `T-${today}-${Math.floor(
    Math.random() * (999 - 100 + 1) + 100
  )}`

  return newTaskCode
}
