export default function ({ $axios, redirect }) {
  // $axios.onRequest((config) => {
  //   console.log('Making request to ', config.url)
  // })

  $axios.onResponse((response) => {
    if (response.status === 200 && response.data.isok) {
      return response.data
    }
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
