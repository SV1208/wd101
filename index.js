// check for age to be between 18 and 55
const dob = document.getElementById('dob');
dob.addEventListener('input', ()=>validate(dob));

function validate(element){
    const today = new Date();
    const birthDate = new Date(element.value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age<18){
        element.setCustomValidity("Age must be greater than equal to 18!");
        element.reportValidity();
    } else if (age>55)
    {
        element.setCustomValidity("Age must be less than equal to 55!");
        element.reportValidity();
    }
    else {
        element.setCustomValidity('');
    }
}

// saving and retrieving form local storage
let userForm = document.getElementById("user-form");

const retrieveEntries = () =>{
    let entries = localStorage.getItem("user-entries");
    if (entries){
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}

let userEntries = retrieveEntries();

const dispalyEntries = () => {

    const tableEntries = retrieveEntries().map((entry)=>{
        const nameCell = `<td>${entry.name}</td>`;
        const emailCell = `<td>${entry.email}</td>`;
        const passwordCell = `<td>${entry.password}</td>`;
        const dobCell = `<td>${entry.dob}</td>`;
        const acceptedTermsCell = `<td>${entry.acceptedTerms}</td>`;

        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptedTermsCell}</tr>`;
        return row;
    }).join("\n");
    
    console.log(tableEntries);
    const table = `
        <table>
        <tr><th>Name</th><th>Email</th><th>Password</th><th>Date of Birth</th><th>Accepted Terms?</th></tr>
        ${tableEntries}
        </table>`;
    
    let details = document.getElementById('user-entries');
    details.innerHTML =table;
}

const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTerms = document.getElementById("acceptTerms").checked;

    const entry = {name, email, password, dob, acceptedTerms}
    userEntries.push(entry)
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    dispalyEntries();
};    

userForm.addEventListener("submit", saveUserForm);
dispalyEntries();
