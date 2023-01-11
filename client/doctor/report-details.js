
const submitRemarks = (reportId,userId) => {
    document.getElementById('remarks-btn').addEventListener('click',(e)=>{
        const remarks = document.getElementById('remarks-input').value;
        e.preventDefault();
        // console.log({
        //             'remarks': remarks,
        //             'reportId': reportId,
        //             'userId': userId
        //         } );
        fetch('http://localhost:3000/doctor/remarks',{
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': JSON.stringify({
                'remarks': remarks,
                'reportId': reportId,
                'userId': userId
            }) 
        })
        .then((res)=>{
            if(res.status === 200)
                return res.json();
            throw new Error('Validation Failed')
        })
        .then((data)=>{
            window.location.href='./home.html';
        })
        .catch(err=>{
            alert(err)
        })
    })
}

window.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();
    const reportId = window.localStorage.getItem('reportId');
    window.localStorage.removeItem('reportId');
    if(!reportId){
        window.location.href = './home.html';
    }else
        fetch('http://localhost:3000/doctor/report/'+reportId,{
            'method':'GET',
            'headers':{
                'Content-Type': 'application/json'
            }
        })
        .then((res)=>{
            if(res.status === 200)
                return res.json();
            throw new Error('Validation Failed');
        })
        .then((data)=>{
            const report = data.report;
            console.log(data);
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
                    <h6>Category: ${report.details.category}</h6>
                </div>
                <div class="col-md-4">
                    <h6>Sub Category: ${report.details.subCategory}</h6>
                </div>
                <div class="col-md-4">
                    <h6>Reported Time: ${report.details.reportedDate}</h6>
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
                <tbody>`+report.details.attributes.map((attribute)=>{
                    return `
                    <tr>
                        <td>${attribute.test}</td>
                        <td>${attribute.value}</td>
                        <td>${!attribute.unit?'-':attribute.unit}</td>
                        <td>${!attribute.reference?'-':attribute.reference}</td>
                    </tr>
                    `
                })
        +`
            </tbody>
            </table>
            <div class='mt-3'>
            <label for=""><b>Remarks:</b></label>
            <textarea class="form-control" id="remarks-input"></textarea>
            <input type="button" id='remarks-btn' class='btn btn-dark' value="Submit">
            </div>
            <div class='mt-3 mb-3 pt-3 pb-3'>
            </div>
            `;
            submitRemarks(report._id,report.userId._id);
        })
        .catch((err)=>alert(err))
})