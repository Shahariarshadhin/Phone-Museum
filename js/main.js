const searchphone = () => {
    //display spinner while loading
    toggleSpinner('block')
        //selecting the required elements
    const searchfield = document.getElementById('search-field');
    searchvalue = searchfield.value;
    const phoneBasicscontainer = document.getElementById('product-basic-info')
    const totalphonecontainer = document.getElementById('totalphon')
        // totalphonecontainer.style.display = 'none'

    //selecting the required error elements
    const errorMessageinv = document.getElementById('error-message-inv')
    errorMessageinv.style.display = 'none'
    const errorMessagenull = document.getElementById('error-message-null')
        // totalphonecontainer.style.display = 'none'

    //checking wherher the input value is empty or not
    if (searchvalue == '') {
        console.log('msd');
        toggleSpinner('none')
        errorMessagenull.style.display = 'block'
        phoneBasicscontainer.style.display = 'none'
        totalphonecontainer.style.display = 'none'
            // toggleSpinner('none', 'block')
    } else {
        phoneBasicscontainer.style.display = 'block'
        totalphonecontainer.style.display = 'block'
        errorMessagenull.style.display = 'none'
        console.log(searchvalue);
        //loading the api
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchvalue}`
        console.log(url);

        fetch(url)
            .then(response => response.json())
            .then(data => displayserachresult(data.data))

        searchfield.value = '';
    }

}



//addding Spinner
const toggleSpinner = (displayPropsp) => {
    document.getElementById('spinner').style.display = displayPropsp;

}

// display the JSON value in ui
const displayserachresult = (phones) => {
    console.log(typeof(phones));
    const totalphonecontainer = document.getElementById('totalphon')
    const phonecontainer = document.getElementById('phonecontainer')
    phonecontainer.innerHTML = '';
    const phoneBasicscontainer = document.getElementById('product-basic-info')
    phoneBasicscontainer.innerHTML = '';
    console.log(phones);
    const errorMessagenull = document.getElementById('error-message-null')
    errorMessagenull.style.display = 'none'
    const errorMessageinv = document.getElementById('error-message-inv')
    errorMessageinv.style.display = 'none'
        //checking wherher the input value is in the array or not
    if (phones.length == 0) {
        console.log('dsf');
        toggleSpinner('none')
        phoneBasicscontainer.style.display = 'none'
        totalphonecontainer.style.display = 'none'
        errorMessageinv.style.display = 'block'
    } else {
        // totalphonecontainer.style.display='block'
        errorMessageinv.style.display = 'none'
        phones.slice(0, 20).forEach((phone) => {
            console.log(phone);
            const div = document.createElement('div')
            div.classList.add('col')
                //creating the element for search results
            div.innerHTML = `
        <div class="card mx-auto" style="width: 15rem">
              <img src="${phone.image}" class="card-img-top p-3" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                  ${phone.brand}
                </p>
                <a class="mx-auto btn btn-primary" href="#top" onclick="loadDetails('${phone.slug}')">Show Details</a>
              </div>
        </div>
        `
            phonecontainer.appendChild(div)
        })
        toggleSpinner('none')
    }



}


//loading the phoner details from the details api
const loadDetails = (slug) => {
    toggleSpinner('block')
    console.log(slug);
    const url = ` https://openapi.programming-hero.com/api/phone/${slug}`
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(data => displayDetails(data))
}


//displaying the details of the phones in ui
const displayDetails = (details) => {
    console.log(details.data.brand);
    const phoneBasicscontainer = document.getElementById('product-basic-info')
    phoneBasicscontainer.style.display = 'block'
    phoneBasicscontainer.innerHTML = '';

    console.log(details.data.image);
    const mainFeatures = details.data.mainFeatures.sensors;

    console.log(mainFeatures);
    const div = document.createElement('div')
    div.classList.add('col')
        // creating the ditails information of the certain phone
    div.innerHTML = `
        <div class="card justify-content-center text-center mx-auto">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                  <a id="showBAsicinfo" class="nav-link active" aria-current="true" href="#"
                    >Basic info</a
                  >
                </li>
                
              </ul>
            </div>
            <img src="${details.data.image}" class="card-img-top w-25 mx-auto p-3" alt="..." />
            <div id='basicinfo' class="card-body">
              <h5 class="card-title">${details.data.name}</h5>
              <p id="relesedate" class="card-text fw-bold">
                ${details.data.releaseDate}
              </p>

              <div>
                  <div id="basicContainer"class="pb-3">
                    <p class="fw-bold">Basic Info</p>
                  </div>
                  <div id="detailsContainer"class="pb-3">
                    <p class="fw-bold">Details Info</p>
                  </div>
                  <div id="otherContainer">
                    <p class="fw-bold">Other Info</p>
                  </div>
              </div>

              <p id="stock" class="card-text mt-3 mb-4 w-50 mx-auto text-black fw-bold rounded-3">
              ${details.status}
              </p>
              <a href="#" class="btn btn-primary">Buy Now</a>
            </div>
            

            
          </div>
      
        `
    console.log(details);

    phoneBasicscontainer.appendChild(div)

    const basicContainer = document.getElementById('basicContainer')
    const detailsContainer = document.getElementById('detailsContainer')
    const otherContainer = document.getElementById('otherContainer')


    if (details.status == true) {
        document.getElementById('stock').innerText = 'In Stock';
    } else {
        document.getElementById('stock').innerText = 'Out of Stock';
    }
    if (details.data.releaseDate == '') {
        document.getElementById('relesedate').innerText = 'Relese Date: Sorry no date found!';
    } else {
        document.getElementById('relesedate').innerText = `Relese Date: ${details.data.releaseDate}`;
    }

    // const productDetails = document.getElementById('tbody')
    //getting the sensore data one by one
    mainFeatures.forEach(feature => {
        const basic_data = document.createElement('p')
        console.log(feature.indexOf(feature));
        // table_data.classList.add('rounded-3')
        //creating the table data for sensores
        basic_data.innerText = `${feature}
                            `
        basicContainer.appendChild(basic_data)
    })

    // const productDetailsinfo = document.getElementById('tbody-details')
    const detailFeatures = details.data.mainFeatures;
    console.log(detailFeatures.chipSet);
    //getting the sensore data one by one
    Object.keys(detailFeatures).forEach(data => {
        const detail_data = document.createElement('p')
            // table_data.classList.add('mx-auto')
            // console.log(feature.indexOf(feature));
            // table_data.classList.add('table-secondary')
            //creating the table data for sensores
        detail_data.innerText = `${data} : ${detailFeatures[data]}`
        detailsContainer.appendChild(detail_data)
    })


    // const productotherinfo = document.getElementById('tbody-other')
    const otherFeatures = details.data.others;
    if (otherFeatures == undefined) {
        const other_data = document.createElement('p')
            // console.log(feature.indexOf(feature));
            // table_data.classList.add('table-secondary')
            //creating the table data for sensores
        other_data.innerText = `Sorry others data not found!❌`
        otherContainer.appendChild(other_data)
    } else {
        console.log(otherFeatures);
        //getting the sensore data one by one
        Object.keys(otherFeatures).forEach(data => {
            const other_data = document.createElement('p')
                // console.log(feature.indexOf(feature));
                // table_data.classList.add('table-secondary')
                //creating the table data for sensores
            other_data.innerHTML = `${data}: ${otherFeatures[data]}`
            otherContainer.appendChild(other_data)
        })
    }

    toggleSpinner('none')






}