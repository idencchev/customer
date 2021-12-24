import { editCar, getCar } from '../../api/data.js';
import { getUserData } from '../../api/util.js';
import { updateUserNav } from '../app.js';
import { html, page } from '../lib.js';

const editTemplate = (carData, onEdit) => html`
    <div class="container register">
        <div class="row">
            <div class="col-md-3 register-left">
            </div>
            <div class="col-md-9 register-right">
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <h3 class="register-heading">Edit vehicle information</h3>
                        <form @submit=${onEdit}>
                            <div class="row register-form">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="RegNumber"
                                            placeholder="Register Number: PN54DTR" style="text-transform: uppercase;" .value=${carData.RegNumber}/>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="make"
                                            placeholder="Make: Volkswagen" .value=${carData.make}/>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="model"
                                            placeholder="Model: Golf 2.0 TDI EVO 150PS" .value=${carData.model}/>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="year" placeholder="Year: 2012" .value=${carData.year}/>
                                    </div>
                                    <div class="form-group">
                                        <textarea type="text" class="form-control" name="workField"
                                            placeholder="To do list: ..." rows="8" cols="100">${carData.workField}</textarea>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="ownerName"
                                            placeholder="Owner Name: John Doe" .value=${carData.ownerName} />
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" name="customerPhone" type="text"
                                            placeholder="Phone Number: 07852365465" .value=${carData.customerPhone} />
                                    </div>
    
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="mechanic"
                                            placeholder="Mechanic Name: Viktor" .value=${carData.mechanic}/>
                                    </div>
                                    <div class="form-group">
                                        <input type="date" class="form-control" name="date" .value=${carData.date}/>
                                    </div>
                                    <div class="form-group">
                                        <textarea type="text" class="form-control" name="prices"
                                            placeholder="Parts Prices and Providers: ..." rows="8" cols="100">${carData.prices}</textarea>
                                    </div>
                                    <input type="submit" class="btnRegister" value="Edit" />
                                </div>
    
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

export async function editPage(ctx) {
    const carId = ctx.params.id;
    const carData = await getCar(carId);

    ctx.render(editTemplate(carData, onEdit));

    async function onEdit(e) {
        e.preventDefault();
        const form = [...new FormData(e.target)];

        try {

            const data = form.reduce((acc, [key, value]) => Object.assign(acc, { [key]: value.trim() }), {});
            data.date = data.date.split('-').reverse().join('.');

            if (Object.keys(data).some(x => data[x] === '')) {
                throw new Error('All fields are required');
            }

            await editCar(carData.objectId, data);
            updateUserNav();
            e.target.reset();
            page.redirect(`/search`);
        } catch (err) {
            alert(err.message);
        }
    }
}

