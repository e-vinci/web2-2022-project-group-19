import { readAllUsers} from '../../models/users';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';


const MemberPage = async () => {
    const main = document.querySelector('main');
    const authenticatedUser = getAuthenticatedUser();
    const authenticated = isAuthenticated();
    const users = await readAllUsers();

    main.innerHTML = `<h3 style="text-align: center;">Member administration zone</h3>`;
    let table = `
    <h3>Member administration zone</h3>
    <div class="container col-6 mt-5">

    <form action="" method="post">
        <table class="table mt-5 text-center bg-white">
            <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Make Admin</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Save column</th>

                </tr>
            </thead>
            <tbody>`;

    users.forEach(user => {
        table += `
        <tr>
            <td class="fw-bold text-info" ${authenticated ? 'contenteditable="true"' : ''}>${user?.username}</td>
      
           <td> <div class="form-check form-switch  ">
             <input class="form-check-input"  ${user?.isAdmin ? 'checked' : ''}  type="checkbox" id="flexSwitchCheckDefault" style="position: absolute;"></div></td>
            <td><button class="buttonDelete" type="button" class="btn btn-info delete" data-user-id="${user.id}">Delete</button></td>
            <td><button class="buttonUpdate" type="button" class="btn btn-info update" data-user-id="${user.id}">Save</button></td>

    </tr >`
    });
    table += `</tbody >
        </table >
    </form >
</div >

    `
    main.innerHTML = table;
    const deleteButton = document.querySelectorAll('.buttonDelete');
    deleteButton.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            //    console.log(e.target.dataset.userId)
            const iduser = e.target.dataset.userId;

            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authenticatedUser.token,

                },
            };

            const response = await fetch(`${process.env.API_BASE_URL}/users/${  iduser}`, options);

            if (response.ok) {
                document.location.reload();
            }

        });
    })


    const updateButton = document.querySelectorAll('.buttonUpdate');
    updateButton.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            //    console.log(e.target.dataset.userId)
            const iduser = e.target.dataset.userId;
            console.log(e.target.parentElement.parentElement.children[1].children[0].children[0].checked); // false treue
            console.log(e.target.parentElement.parentElement.children[0].innerText); // false treue

            const options = {
                method: 'PATCH',
                body: JSON.stringify({
                    username: e.target.parentElement.parentElement.children[0].innerText,
                    isAdmin: e.target.parentElement.parentElement.children[1].children[0].children[0].checked,

                }),

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authenticatedUser.token,

                },
            };

            const response = await fetch(`${process.env.API_BASE_URL}/users/${  iduser}`, options);

            if (response.ok) {
                document.location.reload();
            }

        });
    })
};

export default MemberPage;