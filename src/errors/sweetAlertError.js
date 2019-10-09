export const showError = (self, err, message) =>
  self.$swal.fire({
    type: "error",
    title: "Oops...",
    showCloseButton: true,
    showConfirmButton: false,
    timer: 5000,
    text: message,
    footer: `<small>Erro: ${err}</small>`
  });
