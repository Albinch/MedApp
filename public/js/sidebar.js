document.getElementById('sidebar-trigger').addEventListener('click', function(){
    let sidebar = document.getElementById('sidebar');
    if(sidebar.offsetWidth !== 0){
        sidebar.classList.remove('show');
        sidebar.classList.toggle('hide');
    }
    else{
        sidebar.classList.remove('hide');
        sidebar.classList.toggle('show');
    }
});