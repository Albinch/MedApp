document.addEventListener("DOMContentLoaded", function(){
    sendGoodResponsesRequest();
    sendWeaknessesRequest();
});

function sendGoodResponsesRequest(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/qcm/:goodResponses');

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            drawChart(parseFloat(xhr.responseText));
        }
    }

    xhr.send();
}

function sendWeaknessesRequest(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/qcm/:weaknesses');

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            let weaknesses = JSON.parse(xhr.responseText);
            for(let weakness in weaknesses){
                let DOM_weaknesses = document.getElementById('weakness-subjects');
                DOM_weaknesses.innerHTML += '<span>- ' + weaknesses[weakness].subject + '</span>';
            }
        }
    }

    xhr.send();
}

function drawChart(goodResponsesPercentage){
    const data = {
        labels: ['Bonnes réponses', 'Mauvaises réponses'],
        datasets: [{
            label: 'reponses',
            data: [goodResponsesPercentage * 100, (1 - goodResponsesPercentage) * 100],
            backgroundColor: [
                '#2B8C44',
                '#D90D1E'
            ]
        }]
    }

    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    }

    const pieChart = new Chart(
        document.getElementById('pieChart'),
        config
    );
}

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
});