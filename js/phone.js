
const loadPhone = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones);
}

const displayPhone = phones => {
    const productContainer = document.getElementById('product-container');
    phones.forEach(phone => {
        console.log(phone);
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
}




loadPhone();






