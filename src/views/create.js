import { create, register } from '../../api/data.js';
import { getUserData } from '../../api/util.js';
import { updateUserNav } from '../app.js';
import { html, page } from '../lib.js';

const createTemplate = (onCreate) => html`
    <div class="container register">
        <div class="row">
            <div class="col-md-3 register-left">
            </div>
            <div class="col-md-9 register-right">
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <h3 class="register-heading">Add vehicle to the garrage database</h3>
                        <form @submit=${onCreate}>
                            <div class="row register-form">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="RegNumber"
                                            placeholder="Register Number: PN54DTR" style="text-transform: uppercase;" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="make"
                                            placeholder="Make: Volkswagen" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="model"
                                            placeholder="Model: Golf 2.0 TDI EVO 150PS" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="year" placeholder="Year: 2012" />
                                    </div>
                                    <div class="form-group">
                                        <textarea type="text" class="form-control" name="workField"
                                            placeholder="To do list: ..." rows="8" cols="100"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="ownerName"
                                            placeholder="Owner Name: John Doe" />
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" name="customerPhone" type="text"
                                            placeholder="Phone Number: 07852365465" />
                                    </div>
    
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="mechanic"
                                            placeholder="Mechanic Name: Viktor" />
                                    </div>
                                    <div class="form-group">
                                        <input type="date" class="form-control" name="date" />
                                    </div>
                                    <div class="form-group">
                                        <textarea type="text" class="form-control" name="prices"
                                            placeholder="Parts Prices and Providers: ..." rows="8" cols="100"></textarea>
                                    </div>
                                    <input type="submit" class="btnRegister" value="Submit" />
                                </div>
    
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

export function createPage(ctx) {
    ctx.render(createTemplate(onCreate));

    async function onCreate(e) {
        e.preventDefault();
        const form = [...new FormData(e.target)];

        try {
            const userData = getUserData();
            const data = form.reduce((acc, [key, value]) => Object.assign(acc, { [key]: value.trim() }), {});
            data.RegNumber = userData.RegNumber.toLowerCase();
            data.date = data.date.split('-').reverse().join('.');
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

