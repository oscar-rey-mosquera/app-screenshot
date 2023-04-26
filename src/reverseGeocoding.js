import axios from 'axios'

const reverseGeocoding = async ({latitude, longitude}) => {
  const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
  return response.data
}

export default reverseGeocoding