/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
import { getAuthenticatedUser, setAuthenticatedUser } from "../../utils/auths";

import Navigate from '../Router/Navigate';

const ProfilePage = async () => {
    const main = document.querySelector("main");
    // const pageDiv = document.querySelector("#myPage");
    // console.log(pageDiv);

    // pageDiv.innerHTML = "";

    // get authentificated user data 

    const userData = getAuthenticatedUser("user");

    const userName = userData?.username;
    // eslint-disable-next-line no-console
    console.log(userName);


    // the main content of the profil page
    const content = `
    <div class="container-profil "> 
    
   
        <div class="row">

            <div class="col mt-5 pt-5">
                 <p class="pProfilePage fs-2 helloProfile text-danger"> Hello ${userData?.username} </p>
              
             </div>
        </div>
        <p class="text-center fs-3 pProfilePage">Here you can change your username or password</p>
        <div class="row">
        <div class="col text-center">
        <button id="userName" class="fs-6 pProfilePage" >Modifier le pseuso</button> 
        <div id="ChangeUserName" class="pProfilePage">
        </div>
        </div>
        <div class="col text-center ">
        <button class="fs-6 pProfilePage" id="password">Modifier le mot de passe</button>
        <div id="ChangePassword" class="pProfilePage">
        </div>        
        </div>
    </div>
    `;

    // pageDiv.innerHTML = content;

    main.innerHTML = content;


    // welcome message
    const text = document.querySelector(".helloProfile");
    // separate every single letter of the messege  in a span tag to animate it later 
    text.innerHTML = text.innerText
        .split("")
        // eslint-disable-next-line prefer-arrow-callback
        .map(function (char) {
            return `<span class="fs-2 text-danger pProfilePage ">${char}</span>`;
        })
        .join("");

    // Change username
    const changeUserNameDiv = document.getElementById("ChangeUserName");
    // use the button in purpose to display the form only if the user clicks on it 
    const buttonChangeUserName = document.getElementById("userName");
    buttonChangeUserName.addEventListener("click", displayUpdateUsernameForm);
    function displayUpdateUsernameForm(e) {
        e.preventDefault();
        const changeUserNameForm = `
    <form id="changeUserNameForm">
        <input type="text" id="nUserName" required="required" placeHolder="Nouveau nom d'utilisateur">
        <input type="submit" id="submitUsername" value="Changer">
        <div id="alertUpdateUsername"></div>
    </form>
    `;
        changeUserNameDiv.innerHTML = changeUserNameForm;
        const updateUsernameForm = document.getElementById("changeUserNameForm");
        // Add an event listener to the form on submit
        updateUsernameForm.addEventListener("submit", ChangeUsername);
    }
    // on submit , a request is sent to our api to change the username
    async function ChangeUsername(e) {
        e.preventDefault();
        const nUserName = document.getElementById("nUserName").value;
        const username = getAuthenticatedUser("user")?.username;
        // eslint-disable-next-line no-console
        //  console.log(`hhhhhhhhhhhhhhhhhh${username}`);
        const options = {
            method: "PUT",
            body: JSON.stringify({

                username: nUserName,
            }),
            headers: {
                "Content-type": "application/json",
            },
        };

        const response = await fetch(`${process.env.API_BASE_URL}/users/updateUsername/${username}`, options);
        if (!response.ok) { showErrorUsername(); };
        const authenticatedUser = await response.json();
        setAuthenticatedUser(authenticatedUser);
        Navigate('/logout');

    }
    // Change password 
    const changePasswordDiv = document.getElementById("ChangePassword");
    // A button to display password changing form 
    const buttonChangePassword = document.getElementById("password");
    buttonChangePassword.addEventListener("click", displayUpdatePasswordForm);
    // display a form to change the password and adding an event listener on it 
    function displayUpdatePasswordForm(e) {
        e.preventDefault();
        const changePasswordForm = `
    <form id="changePasswordForm">
        <input type="password" id="oldPassword" required="required" placeHolder="Ancien mot de passe">
        <input type="password" id="newPassword" required="required" placeHolder="Nouveau mot de passe">
        <input type="submit" id="submitPassword" value="Changer" >
        <div id="alertUpdatePwd"></div>
    </form>
    `;
        changePasswordDiv.innerHTML = changePasswordForm;
        const updatePasswordForm = document.getElementById("changePasswordForm");
        updatePasswordForm.addEventListener("submit", changePassword);
    }
    // On submit a request is sent to the api using 
    async function changePassword(e) {
        e.preventDefault();
        const nPassword = document.getElementById("newPassword").value;
        const oldPassword = document.getElementById("oldPassword").value;

        const username = getAuthenticatedUser("user")?.username;
        const options = {
            method: "PUT",
            body: JSON.stringify({
                oldPassword: oldPassword,
                nPassword: nPassword,
            }),
            headers: {
                "Content-type": "application/json",
            },
        };
        const response = await fetch(`${process.env.API_BASE_URL}/users/updatePassword/${username}`, options);
        if (!response.ok) { showErrorPwd(); }
        const authenticatedUser = await response.json();
        setAuthenticatedUser(authenticatedUser);

        Navigate('/logout');

    }

    // display an alert box and throw an error if the fetch failed 
    function showErrorPwd() {
        const alertDiv = document.getElementById("alertUpdatePwd");
        alertDiv.innerHTML = `<br><div class="alert alert-danger" role="alert">
                                 Le mot de passe est incorrect
                            </div>`;
        throw new Error("fetch error");
    }
    function showErrorUsername() {
        const alertDiv = document.getElementById("alertUpdateUsername");
        alertDiv.innerHTML = `<br><div class="alert alert-danger" role="alert">
                                 Ce nom d'utilisateur est déjà utilisé
                            </div>`;
        throw new Error("fetch error");
    }
};
export default ProfilePage;
