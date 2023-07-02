const botao_sidebar= document.getElementById('sidebarCollapse')
const sidebar= document.getElementById('sidebar')
const overlay= document.getElementById('overlay')
let Sidebar_open = false
function OpenSidebar(){
    Sidebar_open = true
    overlay.style.display = 'block'
    sidebar.style.width = '250px'
}
function CloseSidebar(){
    Sidebar_open = false
    overlay.style.display = 'none'
    sidebar.style.width = '0px'
}
botao_sidebar.addEventListener('click', function (){
    if(!Sidebar_open){
        OpenSidebar()
    }
})
overlay.addEventListener('click', function (){
    if(Sidebar_open){
        CloseSidebar()
    }
})