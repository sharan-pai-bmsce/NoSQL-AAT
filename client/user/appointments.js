window.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/appointments', {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('userId')
        }
    })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            throw new Error('Error')
        })
        .then((data) => {
            document.getElementById('appointments').innerHTML = data.appointments.map((appointment) => {
                return `<div class="border border-dark">
                <div class="row">
                    <div class="col-md-6">
                        <h5>Start Time: ${appointment.startTime}</h5>
                    </div>
                    <div class="col-md-6">
                        <h5>End Time: ${appointment.endTime}</h5>
                    </div>
                </div>` +
                    appointment.tests.map((test) => `
                <div class="row">
                    <div class="col-md-6">
                        <h5>Category: ${test.category}</h5>
                    </div>
                    <div class="col-md-6">
                        <h5>Sub-Category: ${test.subCategory}</h5>
                    </div>
                </div>
            <h5>Tests: <ul>`+ test.attributes.map((attribute) => `<li>${attribute.test}</li>`) + `</ul></h5>`) + `
        </div>`
            })
    })
        .catch(err => alert(err))
})

document.getElementById('logout').addEventListener('click',(e)=>{
    e.preventDefault();
    window.localStorage.removeItem('userId');
    window.location.href = '../index.html';
})