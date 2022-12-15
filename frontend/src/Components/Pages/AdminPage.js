
import { getUsers } from "../../models/users";

const AdminPage = async () => {
    const main = document.querySelector('main');
    const title =  `<h3>Administration zone</h3>`;
    const users = await getUsers();

    let listOfUsers=``;
    // eslint-disable-next-line no-plusplus
    for(let i = 0; i < users.length; i++){
      listOfUsers += `
      <p><b>${users[i].id} : ${users[i].username}</b><a>
      `;
    }

    main.innerHTML = title + listOfUsers;

  };

/*
function showUsersTable(){
    
    const page = document.createElement('div');

    // create a table of users
    const table = document.createElement('table');
    const users = getAllUsers();
    for(const user of users){
        const row = document.createElement('tr');
        // create a table cell for each user property
        for (const key in user) {
            const cell = document.createElement('td');
            cell.innerText = user[key];
            row.appendChild(cell);
        }
        // add the delete button to the row
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteOneUser(user.username));
        row.appendChild(deleteButton);
        // add the row to the table
        table.appendChild(row);
    }
    // append the table to the page component
    page.appendChild(table);
    // append the page component to the document
    document.body.appendChild(page);
}
*/

export default AdminPage;