function Gallery(data) {
  console.log(data);
  for (let index = 0; index < data.length; index++) {

    const work = data[index];

    const gallery = document.querySelector(".gallery")
    const figure = document.createElement("figure")
    figure.dataset.categoryId = work.categoryId

    const img = document.createElement("img")
    img.src = work.imageUrl
    img.alt = work.title

    const figcaption = document.createElement("figcaption")
    figcaption.innerText = work.title

    gallery.appendChild(figure)
    figure.appendChild(img)
    figure.appendChild(figcaption)

  }
}




