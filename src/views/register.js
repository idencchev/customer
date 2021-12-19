import { register } from '../../api/data.js';
import { updateUserNav } from '../app.js';
import { html, page } from '../lib.js';

const registerTemplate = (onRegister) => html`
<section class="vh-100 bg-image">
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div class="card" style="border-radius: 15px;">
                        <div class="card-body p-5">
                            <h2 class="text-uppercase text-center mb-5">Create an account</h2>

                            <form @submit=${onRegister}>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example1cg">Your Name</label>
                                    <input type="text" id="form3Example1cg" name="username"
                                        class="form-control form-control-lg" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example3cg">Your Email</label>
                                    <input type="email" id="form3Example3cg" name="email"
                                        class="form-control form-control-lg" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example4cg">Password</label>
                                    <input type="password" id="form3Example4cg" name="password"
                                        class="form-control form-control-lg" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example4cdg">Repeat your password</label>
                                    <input type="password" id="form3Example4cdg" name="confirm-pass"
                                        class="form-control form-control-lg" />
                                </div>
                                <div class="d-flex justify-content-center">
                                    <input class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                        type="submit" value="Register">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(onRegister));

    async function onRegister(e) {
        e.preventDefault();

        const form = new FormData(e.target);
        const username = form.get('username');
        const email = form.get('email');
        const password = form.get('password');
        const rePass = form.get('confirm-pass');

        try {
            if (username == '' || email == '' || password == '' || rePass == '') {
                throw new Error('All fields are required');
            }
            if (password != rePass) {
                throw new Error('The passwords not match');
            }

            await register(username, email, password);
            ctx.page.redirect('/');
            updateUserNav();
        } catch (err) {
            alert(err.message);
        }
    }
}

