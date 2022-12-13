// const path = require('node:path');
// const { parse } = require('../../../../api/utils/json.js');

const MemberPage = () => {
    const main = document.querySelector('main');
    main.innerHTML = `<h3>Member administration zone</h3>`;
    
    const jsonDbPath = path.join(__dirname, '../../../../api/data/users.json');

    function readAllUsers() {
 
        const users = parse(jsonDbPath);
      
        return users;
    };
    console.log(readAllUsers);
  };


  export default MemberPage;