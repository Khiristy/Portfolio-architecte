
const Modale = {
    init: function () {
        this.modale = document.getElementById('modale')
        this.modaleOpen = document.getElementById('modaleOpen')
        this.modaleClose = document.getElementById('modaleClose')
        this.body = document.body
        this.event()
    },
    event: function () {
        const that = this
        modaleOpen.addEventListener('click', function () {
            that.modale.classList.add('modale_show')
            that.body.classList.add('overlay')
        })
        modaleClose.addEventListener('click', function () {
            that.modale.classList.remove('modale_show')
            that.body.classList.remove('overlay')
        })
    } 
}


Modale.init();

