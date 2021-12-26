import { deleteCar, paginateSearch } from '../../api/data.js';
import { parseQuery } from '../../api/util.js';
import { html, page } from '../lib.js';

const searchTemplate = (onSearch, data, param = '', queryStr, skip) => html`
    <div class="content">
        <input id="search-input" type="text" name="search" placeholder="CU57ABC or 12.12.2021" .value=${param}>
        <br>
        Register Number <input type="checkbox" id="regNumber" value="RegNumber">
        Date <input type="checkbox" id="date" value="date">
        <br>
        <select style="display:none">
            <option value="RegNumber">Register Number</option>
            <option value="date">Date</option>
        </select>
        <button @click=${onSearch} class="button-list">Search</button>
    
        <h2>Results:</h2>
        <div class="search-result">
            ${data.results.length ? data.results.map(searchCart) : html`<p class="no-result">No result.</p>`}
    
        </div>
        <div class="space-top">
            ${skip > 1 ? html`<a class="page-index btn btn-info" href="?${queryStr}${skip - 1}">&lt; Prev</a>` : null}
            ${skip < data.count ? html`<a class="page-index btn btn-info" href="?${queryStr}${skip + 1}">Next &gt;</a>` :
                null}
        </div>
    </div>`;

const searchCart = (data) => html`
<ul class="list-items-database">
    <li class="list-group-item-test">Register Number: ${data.RegNumber}</li>
    <li class="list-group-item-test">Make: ${data.make}</li>
    <li class="list-group-item-test">Model: ${data.model}</li>
    <li class="list-group-item-test">Year: ${data.year}</li>
    <li class="list-group-item-test">Owner Name: ${data.ownerName}</li>
    <li class="list-group-item-test">Phone Number: ${data.customerPhone}</li>
    <li class="list-group-item-test">To do list: ${data.workField}</li>
    <li class="list-group-item-test">Parts Prices and Providers: ${data.prices}</li>
    <li class="list-group-item-test">Mechanic Name: ${data.mechanic}</li>
    <li class="list-group-item-test">Date: ${data.date}</li>
    <li class="list-group-item-test">Added By: ${data.addedBy}</li>
    <a class="list-group-item-test editCar" href="/edit/${data.objectId}">Edit</a>
    <a class="list-group-item-test remove" id=${data.objectId} href="javascript:void(0)">Delete</a>
</ul>`;

export async function searchPage(ctx) {
    let data = { results: [] };
    const params = Object.entries(parseQuery(ctx.querystring)).splice(1, 2);

    if (params.length) {
        var [type, param] = params[0];
        var skip = Number(params[1][1]) || 1;
        var queryStr = encodeURIComponent(ctx.querystring.substring(0, ctx.querystring.length - 1));
        data = await paginateSearch(type, param, skip);
    }
    ctx.render(searchTemplate(onSearch, data, param, queryStr, skip));
    [...document.getElementsByClassName('remove')].forEach(el => el.addEventListener('click', onDelete));
}

async function onSearch() {
    const search = document.getElementById('search-input').value.trim();
    const regNumberCheckBox = document.getElementById('regNumber');
    const dateCheckBox = document.getElementById('date');

    if (search) {
        const query = {
            querystring: (checkBox) => `/search?query=type=${encodeURIComponent(`${checkBox.value}&${checkBox.value}=${search}&page= `)}`
        };

        if (dateCheckBox.checked == true) {
            page.redirect(query.querystring(dateCheckBox));
        } else if (regNumberCheckBox.checked == true) {
            page.redirect(query.querystring(regNumberCheckBox));
        }
    }
}

async function onDelete(e) {
    const check = confirm('Are you sure want to delete this car?');
    if (check) {
        await deleteCar(e.target.id);
        page.redirect(`/search?${window.location.href.split('?')[1]}`);
    }
}
