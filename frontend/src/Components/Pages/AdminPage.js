import { clearPage } from '../../utils/render';
import { getAllUsers, deleteOneUser } from '../../models/users.js'
import Navbar from '../Navbar/Navbar';

const AdminPage = () => {
  clearPage();
  Navbar();
  showUsersTable();
};

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



export default AdminPage;