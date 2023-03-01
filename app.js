const loadData = (search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data.data, dataLimit))
}
const showData = (data, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    const noPhone = document.getElementById('no-phone')
    phoneContainer.innerText = ''
    const showAll = document.getElementById('show-all')
    if(dataLimit && data.length >10){
        data = data.slice(0,10)
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }

    if(data.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }
    data.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card p-4 ">
            <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
            <h4 class="card-title">Phone Name: ${phone.phone_name}</h4>
            <h5 class="card-title">Brand Name: ${phone.brand}</h5>
            <button onclick="showDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#allDataModal">Show Details</button>
        </div>
        `
        phoneContainer.appendChild(phoneDiv)
    });
    spinner(false)
}
const processSearch = (dataLimit)=>{
    spinner(true)
    const phoneText = document.getElementById('serch-text');
    const phoneValue = phoneText.value
    loadData(phoneValue, dataLimit)
    phoneText.value = '';
}
document.getElementById('search-btn').addEventListener('click',function (){
    processSearch(10);
})
document.getElementById('serch-text').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});
const spinner = isLoading =>{
    const loader = document.getElementById('loder')
    if(isLoading === true){
        loader.classList.remove('d-none')
    }
    else{
        loader.classList.add('d-none')
    }
}
const showBtn = ()=>{
    processSearch()
}
const showDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    const modalTitle = document.getElementById('allDataModalLabel')
    modalTitle.innerText = data.data.name;
    const modalBody = document.getElementById('dataBody')
    modalBody.innerHTML = `
        <p>${data.data.releaseDate}</p>
        <p>Storage: ${data.data.mainFeatures.storage ? data.data.mainFeatures.storage : 'no storage'
        }</p>
        <p>Display Size: ${data.data.mainFeatures.displaySize
            ? data.data.mainFeatures.displaySize
            : 'no data'
        }</p>
        <p>chipSet: ${data.data.mainFeatures.chipSet ? data.data.mainFeatures.chipSet : 'no chipSet'
        }</p>

    `
}
loadData('iphone')