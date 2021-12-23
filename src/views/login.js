import { login } from '../../api/data.js';
import { updateUserNav } from '../app.js';
import { html, page } from '../lib.js';

const loginTemplate = (onLogin) => html`
            <div class="form-control-login">
                <h2 class="text-uppercase text-center mb-5">Login</h2>
                <form @submit=${onLogin}>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example1cg">Username</label>
                        <input type="text" id="form3Example1cg" name="username" class="form-control form-control-lg" />
                    </div>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example4cg">Password</label>
                        <input type="password" id="form3Example4cg" name="password" class="form-control form-control-lg" />
                    </div>
                    <div class="d-flex justify-content-center">
                        <input class="btn" type="submit" value="Login">
                    </div>
                </form>
            </div>`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(onLogin));
}

async function onLogin(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    try {
        if (form.get('username') == '' || form.get('password') == '') {
            throw new Error('All fields are required!');
        }
        await login(form.get('username'), form.get('password'));

        page.redirect('/');
        updateUserNav();
    } catch (err) {
        alert(error);
    }
}