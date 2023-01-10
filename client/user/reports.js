
const showFile = (blob)=>{
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    var newBlob = new Blob([blob], {type: "application/pdf"})
  
    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    } 
  
    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);
    var link = document.createElement('a');
    link.href = data;
    link.download="file.pdf";
    link.click();
    setTimeout(function(){
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
    }, 100);
  }


const download = (e) => {
    const reportId = e.target.parentElement.previousSibling.children[1].children[0].innerText.split(' ')[2];
    console.log(reportId);
    fetch('http://localhost:3000/reports/'+reportId,{
        'method': 'GET',
        'headers':{
            'Content-Type': 'application/json'
        }
    })
    .then((res)=>{
        if(res.status === 200){
            return res.blob();
        }
        throw new Error('Pdf not loading')
    })
    .then(showFile)
    .catch((err)=>alert(err));
}


window.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();
    fetch('http://localhost:3000/reports',{
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('userId')
        }
    })
    .then((res)=>{
        if(res.status === 200)
            return res.json();
        throw new Error();
    })
    .then((data)=>{
        console.log(data);
        document.getElementById('report-list').innerHTML = data.reports.map(report=>{
            let value = `
            <div class='border border-dark'>
                <div class="row">
                    <div class="col-md-6">
                        <h5>Category: ${report.categoryId.category}</h5>
                    </div>
                    <div class="col-md-6">
                        <h5>Sub Category: ${report.categoryId.subCategory}</h5>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <h5>Appointment Time: ${report.appointmentTime}</h5>
                    </div>
                    <div class="col-md-6">
                        <h5>Report Id: ${report.reportId}</h5>
                    </div>
                </div>`
                if(report.status === "Doctor Signature over. Report ready for download."){
                    value+=`<p><b>Status:</b> Doctor Signature over. Report ready for <a class='download'>download</a></p>`
                }else{
                    value+=`<p><b>Status:</b> ${report.status}</p>`
                }
            value+=`</div>`
            return value;
        });
        document.querySelectorAll('.download').forEach((element)=>{
            element.addEventListener('click',(e)=>{
                e.preventDefault();
                download(e);
            })
        })
        // document.getElementById('appointments').innerHTML
    })
    .catch(err=>alert(err));
})