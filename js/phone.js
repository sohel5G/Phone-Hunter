
const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText ? searchText : 'iphone'}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowAll);
}

const displayPhone = (phones, isShowAll) => {
    const productContainer = document.getElementById('product-container');
    productContainer.textContent = '';

    if (phones.length > 10 && !isShowAll) {
        document.getElementById('btn-show-all').classList.remove('hidden');
    } else {
        document.getElementById('btn-show-all').classList.add('hidden');
    }

    if (phones.length <= 0) {
        productContainer.innerHTML = `<h1 class="text-center">No Data found, please try different keyword</h1>`
        productContainer.classList.remove('grid');
        toggleLoadingSpinner(false);
        return;
    } else {
        productContainer.classList.add('grid');
    }

    if (!isShowAll) {
        phones = phones.slice(0, 10);
    }

    phones.forEach(phone => {

        const div = document.createElement('div');
        div.innerHTML = `
        
        <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p><b>Phone brand</b> : ${phone.brand}</p>
            <p><b>Phone Id</b> : ${phone.slug}</p>
            <div class="card-actions">
                <button onclick="handleShowDetails('${phone.slug}'); show_phone_details.showModal()" class="btn btn-primary">Show Details</button>
            </div>
        </div>        

        `;
        div.classList = 'card bg-base-100 shadow-xl';
        productContainer.appendChild(div);
    });

    toggleLoadingSpinner(false);
}

const handleSearch = (isShowAll) => {

    toggleLoadingSpinner(true);

    const searchInput = document.getElementById('search-input');
    searchInputValue = searchInput.value;
    loadPhone(searchInputValue, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true);
}


const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phoneData = data.data;

    showDetails(phoneData);
}
const showDetails = phoneData => {
    console.log(phoneData);

    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
    
    <img class="w-[250px] mx-auto" src="${phoneData.image}" alt="">
    <h3 id="show-details-title" class="font-bold text-3xl mt-4 mb-4">${phoneData?.name}</h3>
    <p class="text-xl py-2"><b>Display Size :</b>  ${phoneData?.mainFeatures?.displaySize} </p>
    <p class="text-xl py-2"><b>Memory :</b>  ${phoneData?.mainFeatures?.memory} </p>
    <p class="text-xl py-2"><b>Storage :</b>  ${phoneData?.mainFeatures?.storage} </p>
    <p class="text-xl py-2"><b>ChipSet :</b>  ${phoneData?.mainFeatures?.chipSet} </p>
    <p class="text-xl py-2"><b>Release Date :</b>  ${phoneData?.releaseDate || 'No Release Date Available'} </p>

    `;

}

loadPhone();


