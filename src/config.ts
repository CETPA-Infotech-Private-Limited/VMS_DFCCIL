const devConfig = {
  production: false,
  apiUrl: 'https://uat.vmsservices.cetpainfotech.com/api'
}

const prodConfig = {
  production: true,
  apiUrl: 'https://production-api.example.com/api'
}

export const environment = import.meta.env.MODE === 'production' ? prodConfig : devConfig
