import axiosInstance from './axiosInstance'

export const getData = async () => {
  try {
    const response = await axiosInstance.get('/data')
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const postData = async (data: any) => {
  try {
    const response = await axiosInstance.post('/data', data)
    return response.data
  } catch (error) {
    console.error('Error posting data:', error)
    throw error
  }
}
