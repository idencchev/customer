import { loginPage } from "./views/login.js";
import {page} from "./lib.js";
import { html, render } from "./lib.js";
import { registerPage } from "./views/register.js";
import { logout } from "../api/data.js";
import { getUserData } from "../api/util.js";
import { createPage } from "./views/create.js";
import { searchPage } from "./views/search.js";

const root = document.querySelector("main");

document.getElementById('logout').addEventListener('click', onLogout);

page(decorateContext);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/search', searchPage);
updateUserNav();
page.start();



function decorateContext(ctx, next) {
    ctx.render = (context) => render(context, root);
    next();
}



export function updateUserNav() {
    const userData = getUserData();
    let path = localStorage.getItem('path');
    localStorage.path = 'login';
    
    if (userData) {
        localStorage.path = 'search';
        document.getElementById('mainLink').href = `/search`;
        document.getElementById('welcomeMsg').textContent = `Welcome, ${userData.username}`;
        document.querySelectorAll('.user').forEach(user => user.style.display = '');
        document.querySelectorAll('.guest').forEach(guest => guest.style.display = 'none');
        page.redirect(`/${path}`);
    } else {
        localStorage.path = 'login';
        document.getElementById('mainLink').href = `/login`;
        document.getElementById('welcomeMsg').textContent = 'Welcome, Guest'
        document.querySelectorAll('.user').forEach(user => user.style.display = 'none');
        document.querySelectorAll('.guest').forEach(guest => guest.style.display = '');
        page.redirect(`/${path}`);
    }
}

   localStorage.removeItem('path'); 
   
async function onLogout() {
    await logout();
     updateUserNav();
    page.redirect('/login');
}
