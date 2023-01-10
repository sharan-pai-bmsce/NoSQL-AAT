const getCategory = () => {
    return fetch('http://localhost:3000/categories',{
        'method': 'GET',
        'headers':{
            'Content-Type': 'application/json'
        }
    }).then((res)=>{
        if(res.status === 200){
            return res.json();
        }
        throw new Error('No categories')
    })
}

const submitForm = (e,date) => {
    const startTime = date.valueOf()+(JSON.parse(document.getElementById('start-time').value.split(':')[0])*60*60*1000)
    const endTime = date.valueOf()+(JSON.parse(document.getElementById('end-time').value.split(':')[0])*60*60*1000)
    // const endTime = date+'T'+document.getElementById('end-time').value+':00';
    const tests = []
    document.querySelectorAll('.category-select').forEach((element)=>{
        tests.push(element.value)
    });
    /*console.log(JSON.parse(document.getElementById('start-time').value.split(':')[0]),date.toLocaleDateString(),new Date(date.toLocaleDateString()),{
        'method': 'POST',
        'headers':{
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('userId')
        },
        'body': JSON.stringify({
            start: startTime,
            end: endTime,
            subCategories: tests
        })})*/
    fetch('http://localhost:3000/appointment',{
        'method': 'POST',
        'headers':{
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('userId')
        },
        'body': JSON.stringify({
            start: startTime,
            end: endTime,
            subCategories: tests
        })
    })
    .then((res)=>{
        if(res.status === 201){
            return res.json();
        }
        throw new Error('Appointment not created')
    })
    .then((data)=>{
        console.log(data);
        document.getElementById('appointment-form').innerHTML = '';
        document.getElementById('slots').innerHTML = '';
        alert('Appointment Created')
    })
    .catch(err=>alert(err))
}

const createForm = (e,date) => {
    const timeSlot = e.target.parentElement.children[0].innerText.split('-');
    getCategory()
    .then((data)=>{
        let results = data.categories.map((elements)=>{
            return `<option value="${elements.subCategory}">${elements.category+'-'+elements.subCategory+' includes '+elements.attributes.map((ele)=>ele.test)}</option>`
        })
        let value = `<input type="text" class="form-control" id="start-time" disabled="true" value="${timeSlot[0]}:00">
        <input type="text" id="end-time" disabled="true" class="form-control" value="${timeSlot[1]}:00">
        <select type="text" class="form-select category-select" id="sub-categories">${results}</select>
        <input type="submit" id="book-appointment" value="Book Appointment">`
        document.getElementById('appointment-form').innerHTML = value;
        document.getElementById('book-appointment').addEventListener('click',(e)=>{
            e.preventDefault();
            submitForm(e,date);
        })
    }).catch((err)=>{
        alert(err)
    })
}

document.getElementById('date-submit').addEventListener('click', (e) => {
    e.preventDefault()
    let date = new Date(document.getElementById('date-input').value);
    let temp = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    console.log(date);
    fetch('http://localhost:3000/time/' + temp, {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            if (res.status === 200) {
                return res.json().then((times) => {
                    let curr = 9;
                    console.log(times);
                    if (date.valueOf() > new Date().valueOf()) {
                        curr = 9;
                    } else
                        curr = new Date().getHours() < 9 ? 9 : new Date().getHours() + 1;

                    let tempTimes = {}
                    times.slots.forEach((element) => {
                        let tempHour = new Date(element.time).getHours()-5;
                        tempTimes[tempHour] = element.count;
                    });
                    console.log(tempTimes);
                    let value = `<div class='row'>
                <div class='col-md-6'>Time Slot</div>
                <div class='col-md-6'>Available Appointments</div>
                </div>`
                    for (let i = curr; i <= 16; i++) {

                        value += `<div class='row appointment'>
                    <div class='col-md-6'>${i}-${i + 1}</div>
                    <div class='col-md-6'>${10 - (!tempTimes[i] ? 0 : tempTimes[i])}</div>
                    </div>`
                    }
                    document.getElementById('slots').innerHTML = value;
                    let appointments = document.querySelectorAll('.appointment')
                    appointments.forEach((appointment) => {
                        // console.log(appointment);
                        appointment.addEventListener('click', (e) => {
                            e.preventDefault();
                            createForm(e,date);
                        });
                    })
                })
            }
            return new Error('No date')
        })
        .catch(err => alert(err))
});

document.getElementById('logout').addEventListener('click',(e)=>{
    e.preventDefault();
    window.localStorage.removeItem('userId');
    window.location.href = '../index.html';
})