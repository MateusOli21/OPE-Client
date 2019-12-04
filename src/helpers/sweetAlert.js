export const showError = (self, err, message) =>
  self.$swal.fire({
    type: 'error',
    title: 'Oops...',
    showCloseButton: true,
    showConfirmButton: false,
    timer: 5000,
    text: message,
    footer: `<small>Erro: ${err}</small>`
  })

export const showLoader = (self, message) => {
  self.$swal.fire({
    title: message,
    onBeforeOpen: () => {
      self.$swal.showLoading()
    }
  })
}

export const showWarning = (self, message) => {
  self.$swal.fire({
    type: 'warning',
    title: 'Oops...',
    showCloseButton: true,
    showConfirmButton: false,
    timer: 4000,
    text: message
  })
}
