// const path = require('node:path');
// const { parse } = require('../../../../api/utils/json.js');
/* eslint-disable no-plusplus */
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import { readAllUsers } from '../../models/users';
import { isAuthenticated } from '../../utils/auths';


const MemberPage = async () => {
    const main = document.querySelector('main');
    const authenticated = isAuthenticated();
    const users = await readAllUsers();

    main.innerHTML = `<h3>Member administration zone</h3>`;
    let table = `

    <div class="container col-6 mt-5">

    <form action="" method="post">


        <div class="row d-flex justify-content-end mx-1">
            <input type="submit" class="btn btn-primary text-white w-25" value="Save changes">
        </div>

        <table class="table mt-5 text-center bg-white">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Make Admin</th>
                    <th scope="col"></th>

                </tr>
            </thead>
            <tbody>`;

    users.forEach(user => {
        table += `
        <tr>
      <td class="fw-bold text-info" ${authenticated ? 'contenteditable="true"' : ''}>${user.username}</td>

       <td class="fw-bold text-info" ${authenticated ? 'contenteditable="true"' : ''}>${user.email}</td>

   
      <td class="text-info" ${authenticated ? 'contenteditable="true"' : ''}>${user.isAdmin}</td>
      ${authenticated
                ? `<td><button type="button" class="btn btn-info delete" data-element-id="${user.id}">Delete</button></td>
          <td><button type="button" class="btn btn-info update" data-element-id="${user.id}">Save</button></td>`
                : ''
            }
      
    </tr>
        

        `
    });
    table += `</tbody>

        </table>

    </form>

</div>
   
`
    main.innerHTML = table;
    const tableContent = document.querySelector('#table-content');
    //     let content = '';
    //    users.forEach(user => {
    //         content += `
    //         <tr>
    //       <td class="fw-bold text-info" ${authenticated ? 'contenteditable="true"' : ''}>${user.username}</td>

    //        <td class="fw-bold text-info" ${authenticated ? 'contenteditable="true"' : ''}>${user.email}</td>


    //       <td class="text-info" ${authenticated ? 'contenteditable="true"' : ''}>${user.isAdmin}</td>
    //       ${authenticated
    //                 ? `<td><button type="button" class="btn btn-info delete" data-element-id="${user.id}">Delete</button></td>
    //           <td><button type="button" class="btn btn-info update" data-element-id="${user.id}">Save</button></td>`
    //                 : ''
    //             }

    //     </tr>


    //         `
    //     });
    //     tableContent.innerHTML = content;
    //     tableContent.appendChildµ


    console.log(users);

};


export default MemberPage;