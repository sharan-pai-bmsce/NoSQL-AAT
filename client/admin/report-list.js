
window.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/admin/reports', {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            if (res.status === 200)
                return res.json();
            throw new Error('Validation Error')
        })
        .then((data) => {
            console.log(data);
            document.getElementById('report-display').innerHTML = data.reports.map((report) => {
                return `<div class="border border-dark">
                <div class="row">
                    <div class="col-md-6">
                        <h5>Category: ${report.testId.category}</h5>
                    </div>
                    <div class="col-md-6">
                        <h5>Sub Category: ${report.testId.subCategory}</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <h5>Name: ${report.userId.name}</h5>
                    </div>
                    <div class='col-md-6'>
                        <h5>Handling Doctor: ${report.doctor.name} </h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <h5>Appointment Time: ${report.appointmentTime}</h5>
                    </div>
                    <div class="col-md-6">
                        <h5>Report Id: ${report._id}</h5>
                    </div>
                </div>
                <div style='text-align: right'>
                    <input type='button' class='btn expand' value='details'></input>
                </div>
                </div>`
            });
            document.querySelectorAll('.expand').forEach(element => {
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    const reportId = e.target.parentElement.previousSibling.previousSibling.children[1].children[0].innerText.split(' ')[2];
                    // console.log(reportId);
                    window.localStorage.setItem('reportId',reportId);
                    window.location.href = './report-details.html';
                });
            });
        })
        .catch((err) => alert(err))
})