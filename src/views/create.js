import { create, register } from '../../api/data.js';
import { getUserData } from '../../api/util.js';
import { updateUserNav } from '../app.js';
import { html, page } from '../lib.js';

const createTemplate = (onCreate) => html`
    <h2 class="text-uppercase text-center mb-5">Add vehicle to the garrage database</h2>
    <form @submit=${onCreate} class="create">
        <section class="input-section1">
            <div class="form-outline mb-4">
                <label class="form-label" for="form3Example1cg">Register Number</label>
                <input type="text" id="form3Example1cg" name="RegNumber" class="form-control form-control-lg"
                    placeholder="Example: PN54DTR" style="text-transform: uppercase;" />
            </div>
            <div class="form-outline mb-4">
                <label class="form-label" for="form3Example3cg">Make</label>
                <input type="text" id="form3Example3cg" name="make" class="form-control form-control-lg"
                    placeholder="Example: Volkswagen" />
            </div>
            <div class="form-outline mb-4">
                <label class="form-label" for="form3Example4cg">Model</label>
                <input type="text" id="form3Example4cg" name="model" class="form-control form-control-lg"
                    placeholder="Example: Golf 2.0 TDI EVO 150PS" />
            </div>
            <div class="form-outline mb-4">
                <label class="form-label" for="form3Example4cg">Year</label>
                <input type="text" id="form3Example4cg" name="year" class="form-control form-control-lg"
                    placeholder="Example: 2010" />
            </div>
            <div class="form-outline mb-4">
                <label class="form-label" for="form3Example4cg">Owner Name</label>
                <input type="text" id="form3Example4cg" name="ownerName" class="form-control form-control-lg"
                    placeholder="Example: John Doe" />
            </div>
            <div class="form-outline mb-4">
                <label class="form-label" for="form3Example4cg">Phone Number</label>
                <input id="phone" name="customerPhone" class="form-control form-control-lg no-arrow" value="" type="number"
                    placeholder="Example: 07852365465">
            </div>
        </section>
    
    
        <section class="input-section2">
            <div class="form-outline mb-4">
                <label class="form-label" for="form3Example4cg">To do list</label>
                <textarea id="form3Example4cg" name="workField" class="form-control form-control-lg"></textarea>
            </div>
            <div class="form-outline mb-4">
                <label class="form-label" for="form3Example4cg">Parts Prices and Providers</label>
                <textarea id="form3Example4cg" name="prices" class="form-control form-control-lg"></textarea>
            </div>
        </section>
        <div class="form-outline mb-4">
            <label class="form-label" for="form3Example4cg">Mechanic Name</label>
            <input type="text" id="form3Example4cg" name="mechanic" class="form-control form-control-lg"
                placeholder="Example: Viktor" />
        </div>
        <div class="d-flex justify-content-center">
            <input class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" type="submit" value="Submit">
        </div>
    
    </form>`;

export function createPage(ctx) {
    ctx.render(createTemplate(onCreate));

    async function onCreate(e) {
        e.preventDefault();
        const form = [...new FormData(e.target)];

        try {
            const userData = getUserData();
            const data = form.reduce((acc, [key, value]) => Object.assign(acc, { [key]: value.trim() }), {});
            data.addedBy = userData.username;
            data.userId = userData.userId;

            if (Object.keys(data).some(x => data[x] === '')) {
                throw new Error('All fields are required');
            }
            await create(data);
            updateUserNav();
            e.target.reset();
            ctx.page.redirect('/search');
        } catch (err) {
            alert(err.message);
        }
    }
}

