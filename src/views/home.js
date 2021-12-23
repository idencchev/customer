import { getUserData } from '../../api/util.js';
import { html, render } from '../lib.js';

const homeTemplate = () => html`
<div class="text-center my-5">
    <img class="img-fluid rounded-circle mb-4" src="/assets/tools.png" alt="..." />
    <h1 id="welcomeMsg" class="text-white fs-3 fw-bolder">Welcome, ${getUserData() ? getUserData().username : 'Guest'}!</h1>

</div>`;

export function homePage(ctx) {
    ctx.render(homeTemplate());
}

