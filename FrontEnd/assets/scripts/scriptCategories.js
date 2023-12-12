function categories(dataCategories) {
    console.log(dataCategories);
    for (let index = 0; index < dataCategories.length; index++) {
  
      const objectCategories = dataCategories[index];
  
      const filter = document.querySelector(".filter")
      const button = document.createElement("button")
  
      button.innerText = objectCategories.name
  
      filter.appendChild(button)
  
      button.dataset.categoryId = objectCategories.id
  
      button.addEventListener('click', function () {
        console.log(this.dataset.categoryId)
        
        const arrayFigure = document.querySelectorAll("figure")
  
  
        for (let index = 0; index < arrayFigure.length; index++) {
          const element = arrayFigure[index];
          console.log(element);
          console.log(this.dataset.categoryId);
          if (element.dataset.categoryId !== this.dataset.categoryId) {
            element.classList.add('hidden');
          } else {
            element.classList.remove('hidden');
          }
        }
      })
    }
    const buttonAllWork = document.getElementById("allWork")
    const arrayFigure = document.querySelectorAll("figure")
  
    buttonAllWork.addEventListener('click',function(){
      for (let index = 0; index < arrayFigure.length; index++) {
        const element = arrayFigure[index];
        console.log(element);
        console.log(this.dataset.categoryId);
        if (element.classList.contains('hidden')) {
  
          element.classList.remove('hidden');
  
        }
      }
    })
  }