var MyDate = new Date()

MyDate.setMonth(MyDate.getMonth() + 1)

export const MyDateString =
  MyDate.getFullYear() +
  "-" +
  ("0" + MyDate.getMonth()).slice(-2) +
  "-" +
  ("0" + MyDate.getDate()).slice(-2)

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

export const sectionList = ["4-A", "4-B", "4-C", "4-D", "IT-A", "IT-B", "IT-C"]

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

export const filteredByIDSubmittedTask = (itemArray, paramsId) => {
  return itemArray.filter((type) => {
    return type.id === paramsId
  })
}

export const filteredBySection = (itemArray, studentSection) => {
  return itemArray.filter((type) => {
    return type.section === studentSection
  })
}

export const filterByStudentUUID = (itemArray, uid) => {
  return itemArray.filter((type) => {
    return type.authId === uid
  })
}

export const filterByUUID = (itemArray, uid) => {
  return itemArray.filter((type) => {
    return type.coordinatorUUID === uid
  })
}

export const eliminateDuplicates = (obj) => {
  return obj.filter((value, index) => {
    const _value = JSON.stringify(value)

    return (
      index ===
      obj.findIndex((obj) => {
        return JSON.stringify(obj) === _value
      })
    )
  })
}

export const mergeByProperty = (target, source, prop) => {
  source.forEach((sourceElement) => {
    let targetElement = target.find((targetElement) => {
      return sourceElement[prop] === targetElement[prop]
    })
    targetElement
      ? Object.assign(targetElement, sourceElement)
      : target.push(sourceElement)
  })
}
