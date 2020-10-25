const SendJsonResponse = (res, payload) => {
  res.status(200).json(payload)
}

export {
  SendJsonResponse
}
