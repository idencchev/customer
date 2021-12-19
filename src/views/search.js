import { searchCar } from '../../api/data.js';
import { html, page } from '../lib.js';

const searchTemplate = (onSearch, data, params = '') => html`
    <div class="content">
    
        <input id="search-input" type="text" name="search" placeholder="For example: CU57ABC" .value=${params}>
        <button @click=${onSearch} class="button-list">Search</button>
    
        <h2>Results:</h2>
        <div class="search-result">
        ${data.results != undefined ? data.results.map(searchCart) : html`<p class="no-result">No result.</p>`}
       
            </div>
    
    </div>`;

const searchCart = (data) => html`
<form class="create">
    <section class="input-section1">
        <div class="form-outline mb-4">
            <label class="form-label" for="form3Example1cg">Register Number</label>
            <input type="text" id="form3Example1cg" name="RegNumber" class="form-control form-control-lg"
                placeholder="Example: PN54DTR" style="text-transform: uppercase;" .value=${data.RegNumber} />
        </div>
        <div class="form-outline mb-4">
            <label class="form-label" for="form3Example3cg">Make</label>
            <input type="text" id="form3Example3cg" name="make" class="form-control form-control-lg"
                placeholder="Example: Volkswagen" .value=${data.make} />
        </div>
        <div class="form-outline mb-4">
            <label class="form-label" for="form3Example4cg">Model</label>
            <input type="text" id="form3Example4cg" name="model" class="form-control form-control-lg"
                placeholder="Example: Golf 2.0 TDI EVO 150PS" .value=${data.model} />
        </div>
        <div class="form-outline mb-4">
            <label class="form-label" for="form3Example4cg">Year</label>
            <input type="text" id="form3Example4cg" name="year" class="form-control form-control-lg"
                placeholder="Example: 2010" .value=${data.year} />
        </div>
        <div class="form-outline mb-4">
            <label class="form-label" for="form3Example4cg">Owner Name</label>
            <input type="text" id="form3Example4cg" name="ownerName" class="form-control form-control-lg"
                placeholder="Example: John Doe" .value=${data.ownerName} />
        </div>
        <div class="form-outline mb-4">
            <label class="form-label" for="form3Example4cg">Phone Number</label>
            <input id="phone" name="customerPhone" class="form-control form-control-lg no-arrow" type="number"
                placeholder="Example: 07852365465" .value=${data.customerPhone} />
        </div>
    </section>


    <section class="input-section2">
        <div class="form-outline mb-4">
            <label class="form-label" for="form3Example4cg">To do list</label>
            <textarea id="form3Example4cg" name="workField"
                class="form-control form-control-lg">${data.workField}</textarea>
        </div>
        <div class="form-outline mb-4">
            <label class="form-label" for="form3Example4cg">Parts Prices and Providers</label>
            <textarea id="form3Example4cg" name="prices" class="form-control form-control-lg">${data.prices}</textarea>
        </div>
    </section>
    <div class="form-outline mb-4">
        <label class="form-label" for="form3Example4cg">Mechanic Name</label>
        <input type="text" id="form3Example4cg" name="mechanic" class="form-control form-control-lg"
            placeholder="Example: Viktor" .value=${data.mechanic} />
    </div>
    <div class="d-flex justify-content-center">
        <input class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" type="submit" value="Submit">
    </div>

</form>`;

export async function searchPage(ctx) {
    const params = ctx.querystring.split('=')[1];
    let data = [];

    if (params) {
        data = await searchCar(params);
    }
    
    ctx.render(searchTemplate(onSearch, data, params));
}

async function onSearch() {
    const search = document.getElementById('search-input').value
    if (search) {
        page.redirect(`/search?query=${encodeURIComponent(search)}`)
    }

}
