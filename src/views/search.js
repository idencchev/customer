import { searchCar } from '../../api/data.js';
import { html, page } from '../lib.js';

const searchTemplate = (onSearch, data, param = '') => html`
    <div class="content">
    
        <input id="search-input" type="text" name="search" placeholder="CU57ABC or 12.12.2021" .value=${param}>
        <select>
            <option value="RegNumber">Register Number</option>
            <option value="date">Date</option>
        </select>
        <button @click=${onSearch} class="button-list">Search</button>
    
        <h2>Results:</h2>
        <div class="search-result">
            ${data.results.length ? data.results.map(searchCart) : html`<p class="no-result">No result.</p>`}
    
        </div>
    
    </div>`;

const searchCart = (data) => html`
<ul class="list-items-database">
    <li class="list-group-item-test">Register Number: ${data.RegNumber.toUpperCase()}</li>
    <li class="list-group-item-test">Make: ${data.make}</li>
    <li class="list-group-item-test">Model: ${data.model}</li>
    <li class="list-group-item-test">Year: ${data.year}</li>
    <li class="list-group-item-test">Owner Name: ${data.ownerName}</li>
    <li class="list-group-item-test">Phone Number: ${data.customerPhone}</li>
    <li class="list-group-item-test">To do list: ${data.workField}</li>
    <li class="list-group-item-test">Parts Prices and Providers: ${data.prices}</li>
    <li class="list-group-item-test">Mechanic Name: ${data.mechanic}</li>
    <li class="list-group-item-test">Date: ${data.date}</li>
</ul>`;

export async function searchPage(ctx) {
    const params = ctx.querystring.split('&')[1];
    let data = { results: [] };

    if (params != undefined) {
        var [type, param] = params.split('=');
        data = await searchCar(type, param);
    }
    ctx.render(searchTemplate(onSearch, data, param));
}

async function onSearch() {
    const search = document.getElementById('search-input').value.trim();
    const select = document.querySelector('select').value;

    if (search) {
        page.redirect(`/search?query=type=${encodeURIComponent(`${select}&${select}=${search}`)}`);
    }
}