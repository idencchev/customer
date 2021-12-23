import { login } from '../../api/data.js';
import { updateUserNav } from '../app.js';
import { html, page } from '../lib.js';

const loginTemplate = (onLogin) => html`
<div class="container">
    <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-6">
            <div class="box">
                <div class="shape1"></div>
                <div class="shape2"></div>
                <div class="shape3"></div>
                <div class="shape4"></div>
                <div class="shape5"></div>
                <div class="shape6"></div>
                <div class="shape7"></div>
                <div class="float">
                    <form @submit=${onLogin} class="form" action="">
                        <div class="form-group">
                            <label for="username" class="text-white">Username:</label><br>
                            <input type="text" name="username" id="username" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="password" class="text-white">Password:</label><br>
                            <input type="password" name="password" id="password" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="submit" name="submit" class="btn btn-info btn-md" value="submit">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
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
        //  alert(error);
    }
}
