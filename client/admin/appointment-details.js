
const generateReport = (appointmentId,userId,tests) => {
    document.getElementById('done').addEventListener('click',(e)=>{
        e.preventDefault();
        console.log(appointmentId,userId,tests);
        fetch('http://localhost:3000/admin/reportGen',{
            'method': 'PUT',
            'headers':{
                'Content-Type': 'application/json',
            },
            'body': JSON.stringify({
                'id': appointmentId,
                'userId': userId,
                'tests': tests
            })
        })
        .then((res)=>{
            if(res.status===201){
                return res.json();
            }
            throw new Error(res.json().then((err)=>err.message))
        })
        .then(data=>{
            window.location.href = './home.html'
        })
        .catch(err=>{
            alert(err)
        })
    })
}

const deleteAppointment = (appointmentId,userId) => {
    document.getElementById('delete').addEventListener('click',(e)=>{
        e.preventDefault();
        fetch('http://localhost:3000/admin/delete-appointment',{
            'method': 'DELETE',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
                id: appointmentId,
                userId: userId
            })
        })
        .then((res)=>{
            if(res.status===200){
                return res.json();
            }
            throw new Error(res.json().then(err=>err.message))
        })
        .then(data=>{
            window.location.href = './home.html';
        })
        .catch(err=>{
            alert(err);
        })
    })
}

window.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const appointmentId = window.localStorage.getItem('appointmentId');
    window.localStorage.removeItem('appointmentId');
    if (!appointmentId) {
        window.location.href = './home.html';
    } else
        fetch('http://localhost:3000/admin/appointmentDetail/' + appointmentId, {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.status === 200)
                    return res.json();
                throw new Error('Validation Failed');
            })
            .then((data) => {
                const appointment = data.user;
                console.log(appointment);
                document.getElementById('appointment-details').innerHTML = `<h3 style="text-align: center">Patient Information</h3>
            <hr>
            <div class="row pb-3">
                <div class="col-md-4">
                    <h6>Name: ${appointment.userId.name}</h6>
                </div>
                <div class="col-md-4">
                    <h6>Sex: ${appointment.userId.sex}</h6>
                </div>
                <div class="col-md-4">
                    <h6>DOB: ${appointment.userId.DOB}</h6>
                </div>
            </div>
            <h3 style="text-align: center">Report Information</h3>
            <hr>
            <div class="row pb-3">
                <div class="col-md-6">
                    <h6>Appointment Start Time: ${appointment.startTime}</h6>
                </div>
                <div class="col-md-6">
                    <h6>Appointment End Time: ${appointment.endTime}</h6>
                </div>
            </div>
            <div>
            <h6>Tests:</h6>
                <ul>
            `+appointment.tests.map((element)=>{
                return `<li>${element.category}--${element.subCategory}</li>`
            })
            +`</ul>
            </div>
            <div style='text-align: right'>
                <input type='button' class='btn btn-danger' id='delete' value='Delete Appointment'>
                <input type='button' class='btn btn-dark' id='done' value='Appointment Done'></input>
            </div>
            `
            deleteAppointment(appointmentId,appointment.userId._id);
            generateReport(appointmentId,appointment.userId._id,appointment.tests.map(element=>element._id));
            })
            .catch((err) => alert(err))
})