import { login, searchCar } from '../../api/data.js';
import { updateUserNav } from '../app.js';
import { html, page } from '../lib.js';

const searchTemplate = (onSearch) => html`
    <div class="content">
    
        <form @submit=${onSearch}>
            <i class="fa fa-search"></i>
            <input placeholder="For example: CU57ABC" name="find" id="find-car" type="text" cursor: pointer />
            <input type="submit" id="btn-find-car" href="btn-find-car" value="Find">
        </form>
    
    </div>`;

export function searchPage(ctx) {
    const params = ctx.querystring;
    console.log(ctx.params.querystring);
    ctx.render(searchTemplate(onSearch));
}

function onSearch(e) {
    e.preventDefault();
    console.log(new FormData(e.target).get('find'));
}