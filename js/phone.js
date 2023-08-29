
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

    if (!isShowAll) {
        phones = phones.slice(0, 10);
    }

    phones.forEach(phone => {
        // console.log(phone);
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
                <button class="btn btn-primary">Buy Now</button>
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

loadPhone();

