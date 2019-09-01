function delete_confirmation(url) {
  if (confirm("Are you sure?")) {
    var form = document.createElement("form")
    form.method = "post"
    form.action = url

    document.body.appendChild(form)
    form.submit()
  }
}