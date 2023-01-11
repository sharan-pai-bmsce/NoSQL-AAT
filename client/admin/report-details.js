const submitRemarks = (reportId, userId, tests) => {

    document.getElementById('values-enterred').addEventListener('click', (e) => {
        e.preventDefault();
        const attributes = tests.attributes.map((ele) => {
            let value = document.getElementById(ele.test).value;
            value = value === '' ? 0 : JSON.parse(value);
            return { ...ele, value: value }
        });
        tests.attributes = attributes;
        console.log({
                'content': tests,
                'reportId': reportId,
                'userId': userId
            });
        fetch('http://localhost:3000/admin/reports',{
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': JSON.stringify({
                'content': tests,
                'reportId': reportId,
                'userId': userId
            }) 
        })
        .then((res)=>{
            if(res.status === 201)
                return res.json();
            throw new Error('Validation Failed')
        })
        .then((data)=>{
            window.location.href='./report-list.html';
        })
        .catch(err=>{
            alert(err)
        })
    })
}

window.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const reportId = window.localStorage.getItem('reportId');
    // window.localStorage.removeItem('reportId');
    if (!reportId) {
        window.location.href = './report-list.html';
    } else
        fetch('http://localhost:3000/admin/report/' + reportId, {
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
                const report = data.reports;
                console.log(report);
                document.getElementById('report-details').innerHTML = `
            <h3 style="text-align: center">Patient Information</h3>
            <hr>
            <div class="row pb-3">
                <div class="col-md-4">
                    <h6>Name: ${report.userId.name}</h6>
                </div>
                <div class="col-md-4">
                    <h6>Sex: ${report.userId.sex}</h6>
                </div>
                <div class="col-md-4">
                    <h6>DOB: ${report.userId.DOB}</h6>
                </div>
            </div>
            <h3 style="text-align: center">Report Information</h3>
            <hr>
            <div class="row pb-3">
                <div class="col-md-6">
                    <h6>Report Id: ${report._id}</h6>
                </div>
                <div class="col-md-6">
                    <h6>Appointment Time: ${report.appointmentTime}</h6>
                </div>
            </div>
            <div class="row pb-3">
                <div class="col-md-4">
                    <h6>Category: ${report.testId.category}</h6>
                </div>
                <div class="col-md-4">
                    <h6>Sub Category: ${report.testId.subCategory}</h6>
                </div>
                <div class="col-md-4">
                    <h6>Handling Doctor: ${report.doctor.name}</h6>
                </div>
            </div>
            <div class="row pb-3">
                <div class="col-md-6">
                    <h6>Processing: ${report.processing}</h6>
                </div>
                <div class="col-md-6">
                    <h6>Signed By Doctor: ${report.signed}</h6>
                </div>
            </div>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Test</th>
                    <th scope="col">Value</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Reference</th>
                </tr>
                </thead>
                <tbody>`+ report.testId.attributes.map((attribute) => {
                    return `
                    <tr>
                        <td>${attribute.test}</td>
                        <td><input type='text' class='form-control'`+ (report.processing ? 'disabled=true' : '') + `id='${attribute.test}' value=${!attribute.value?'':attribute.value}></input></td>
                        <td>${!attribute.unit ? '-' : attribute.unit}</td>
                        <td>${!attribute.reference ? '-' : attribute.reference}</td>
                    </tr>
                    `
                })
                    + `
            </tbody>
            </table>
            <div class='mt-3'>
            <input type="button" id='values-enterred' class='btn btn-dark' value="Submit">
            </div>
            <div class='mt-3 mb-3 pt-3 pb-3'>
            </div>
            `;
                submitRemarks(report._id, report.userId._id, report.testId);
            })
            .catch((err) => alert(err))
})