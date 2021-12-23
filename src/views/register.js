import { register } from '../../api/data.js';
import { updateUserNav } from '../app.js';
import { html, page } from '../lib.js';

const registerTemplate = (onRegister) => html`
                        <div class="form-control-login">
                            <h2 class="text-uppercase text-center mb-5">Create an account</h2>
                            <form @submit=${onRegister}>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example1cg">Username</label>
                                    <input type="text" id="form3Example1cg" name="username" class="form-control form-control-lg" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example3cg">Your Email</label>
                                    <input type="email" id="form3Example3cg" name="email" class="form-control form-control-lg" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example4cg">Password</label>
                                    <input type="password" id="form3Example4cg" name="password" class="form-control form-control-lg" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example4cdg">Repeat your password</label>
                                    <input type="password" id="form3Example4cdg" name="confirm-pass" class="form-control form-control-lg" />
                                </div>
                                <div class="d-flex justify-content-center">
                                    <input class="btn" type="submit" value="Register">
                                </div>
                            </form>
                        </div>`;

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

