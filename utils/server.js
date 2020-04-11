const json_response = (res, payload) => {
  res.status(200).json(payload)
}

export {
  json_response
}