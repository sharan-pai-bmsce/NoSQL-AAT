window.addEventListener('DOMContentLoaded',(e)=>{
    fetch('http://localhost:3000/admin/categories',{
        'method': 'GET',
        'headers':{
            'Content-Type': 'application/json'
        }
    })
    .then((res)=>{
        if(res.status === 200)
            return res.json();
        throw new Error(res.json().then((err)=>err.message))
    })
    .then((data)=>{
        document.getElementById('present-categories').innerHTML = data.categories.map((ele)=>{
            return `
            <div class='border border-dark'>
                <div class='row'>
                    <div class='col-md-6'>
                        Category:  ${ele.category}
                    </div>
                    <div class='col-md-6'>
                       Sub Category:  ${ele.subCategory}
                    </div>
                </div><div> Tests: [`+ele.attributes.map(attr=>attr.test)+`]</div>
            </div>
            `
        })
    })
    .catch(err=>alert(err))
})

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
    const category = document.getElementById('category-input').value;
    const subCategory = document.getElementById('subCategory-input').value;
    const tests = document.querySelectorAll('.test');
    const units = document.querySelectorAll('.unit');
    const reference = document.querySelectorAll('.reference');
    console.log(tests);
    const attributes = [];
    tests.forEach((ele,index)=>{
        attributes.push({
            'test': ele.value,
            'isSubheading': true,
            'unit': units[index].value===''?undefined:units[index].value,
            'reference': reference[index].value===''?undefined:reference[index].value
        });
    });
    console.log(attributes);
    fetch('http://localhost:3000/admin/categories',{
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
        },
        'body': JSON.stringify({
            category: category,
            subCategory: subCategory,
            attributes: attributes
        })
    })
    .then(res=>{
        if(res.status === 201){
            return res.json();
        }
        throw new Error(res.json().then(err=>err.message));
    })
    .then((data)=>{
        document.getElementById('present-categories').innerHTML += `<div class='border border-dark mt-3'>
        <div class='row'>
            <div class='col-md-6'>
                Category: ${category}
            </div>
            <div class='col-md-6'>
                Sub-Category: ${subCategory}
            </div>
        </div><div> Tests: [`+attributes.map(attr=>attr.test)+`]</div>
    </div>`
    })
    .catch(err=>alert(err));
})