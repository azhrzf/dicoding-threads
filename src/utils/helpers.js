function countDays (date) {
  const pastDate = new Date(date)
  const currentDate = new Date()

  const diffTime = Math.abs(currentDate - pastDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

export { countDays }
