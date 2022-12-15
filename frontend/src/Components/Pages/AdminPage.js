
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


  export default AdminPage;