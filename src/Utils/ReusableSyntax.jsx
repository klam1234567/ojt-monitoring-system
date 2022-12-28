//*Convert Array Object into Object
export const objectAssign = (ObjectArray, obj) => {
  return ObjectArray.map((info) => {
    return Object.assign(obj, info)
  })
}

export const coordinatorName = (fetchCoordinator, coordEmail) => {
  fetchCoordinator.filter((type) => type.email === coordEmail)
}
