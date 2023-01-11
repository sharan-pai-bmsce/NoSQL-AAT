document.getElementById('user-login').addEventListener('click',(e)=>{
    e.preventDefault()
    let email = document.getElementById('user-email').value;
    let password = document.getElementById('user-password').value;
    console.log(email,password);
    fetch('http://localhost:3000/user-login',{
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('userId')
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },

        'body':JSON.stringify({
            email: email,
            password: password
        })
    })
    .then((res)=>{
        if(res.status===201)
            return res.json().then((data)=>{
                window.localStorage.setItem('userId',data.userId.toString())
                console.log(data);
                email.value = '';
                password = '';
                window.location.href = './user/home.html';
            });
        return new Error('User not validated')
    })
    .catch((err)=>{
        alert(err.message)
    })
})

document.getElementById('doctor-login').addEventListener('click',(e)=>{
    e.preventDefault()
    let email = document.getElementById('doctor-email').value;
    let password = document.getElementById('doctor-password').value;
    console.log(email,password);
    fetch('http://localhost:3000/doctor-login',{
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        'body':JSON.stringify({
            email: email,
            password: password
        })
    })
    .then((res)=>{
        if(res.status===201)
            return res.json().then((data)=>{
                console.log(data);
                email.value = '';
                password = '';
                window.location.href = './doctor/home.html';
            });
        return new Error('User not validated')
    })
    .catch((err)=>{
        alert(err.message)
    })
})

document.getElementById('admin-login').addEventListener('click',(e)=>{
    e.preventDefault()
    let email = document.getElementById('admin-email').value;
    let password = document.getElementById('admin-password').value;
    console.log(email,password);
    fetch('http://localhost:3000/admin-login',{
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        'body':JSON.stringify({
            email: email,
            password: password
        })
    })
    .then((res)=>{
        if(res.status===201)
            return res.json().then((data)=>{
                console.log(data);
                email.value = '';
                password = '';
                window.location.href = './admin/home.html';
            });
        throw new Error('User not validated')
    })
    .catch((err)=>{
        alert(err.message)
    })
})