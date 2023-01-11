document.getElementById('add-button').addEventListener('click', (e) => {
    e.preventDefault();
    let doc = document.getElementById('my-table').insertRow();
    doc.innerHTML =  `
        <td><input type="text" class="form-control test"></td>
        <td><input type='text' class='form-control unit'></td>
        <td><input type="text" class="form-control reference"></td>
    `
    // document.getElementById('tests').innerHTML = doc;
})

document.getElementById('submit').addEventListener('click',(e)=>{
    e.preventDefault();
})