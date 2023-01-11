const getList = (temp) => {
    console.log(temp);
    fetch('http://localhost:3000/admin/appointments/' + temp, {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            if (res.status === 200) {
                return res.json(); 
            }
            throw new Error('No date')
        })
        .then((data)=>{
            console.log(data);
            document.getElementById('appointment-list').innerHTML = data.appoint.map((appointment)=>{
                return `<div class="border border-dark">
                <div class="row">
                    <div class="col-md-6">
                        <h5>Start Time: ${appointment.startTime}</h5>
                    </div>
                    <div class="col-md-6">
                        <h5>End Time: ${appointment.endTime}</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <h5>Name: ${appointment.userId.name}</h5>
                    </div>
                    <div class="col-md-6">
                        <h5>Email: ${appointment.userId.email}</h5>
                    </div>
                </div>
                <div style='text-align: right'>
                    <input type='hidden' value='${appointment._id}'></input>
                    <input type='button' class='btn expand' value='details'></input>
                </div>
                </div>`
            })
            document.querySelectorAll('.expand').forEach(element => {
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    const appointmentId = e.target.previousSibling.previousSibling.value;
                    window.localStorage.setItem('appointmentId',appointmentId);
                    window.location.href = './appointment-details.html';
                });
            });
        })
        .catch(err => alert(err))
}


window.addEventListener('DOMContentLoaded',(e)=>{
    const time = window.localStorage.getItem('temp');
    if(time!==null){
        getList(time)
        window.localStorage.removeItem('temp')
    }
})

document.getElementById('date-submit').addEventListener('click', (e) => {
    e.preventDefault()
    let date = new Date(document.getElementById('date-input').value);
    let temp = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    window.localStorage.setItem('temp',temp);
    getList(temp);
});