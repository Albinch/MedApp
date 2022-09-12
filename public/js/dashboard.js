document.querySelectorAll('.tab').forEach(item => {
    item.addEventListener('click', event => {
        document.querySelectorAll('.tab').forEach(button => button.classList.remove('active'));
        item.classList.toggle('active');
    });
});

document.querySelector('#open-modal').addEventListener('click', function(e){
    document.querySelector('.modal').classList.remove('hidden');
});

document.querySelector('.modal').addEventListener('click', function(e){
    let modal = document.querySelector('.modal');
    if(e.target !== modal && e.target !== modal.querySelector('.container')) return;
    modal.classList.add('hidden');
})