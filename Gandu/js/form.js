//validation message
const validationMessage = {
    name: {
        success : "Name is valid",
        unsuccessful : "Name is no valid"
    },
    userName: {
        success : "User Name is valid",
        unsuccessful : "User Name is no valid no white space allowed"
    },
    password: {
        success : "Password is valid",
        unsuccessful : "Password is not valid"
    },
    re_typePassword: {
        success : "Password Matched!!!",
        unsuccessful : "Password doesn't match"
    },
    contactNumber: {
        success : "Contact number is valid",
        unsuccessful : "Contact number contains number only or individual a pattern"
    },
    email: {
        success : "Email is valid",
        unsuccessful : "Email is not valid"
    },

}
//form data 
const formData = {
    name: "", //this is name 
    userName: "", //this is user Name default is empty string 
    password: "", //this is password default is empty string 
    gender: "", //this is gender default is empty string 
    skill: [], //this is skill default is empty string 
    contact: "", //this is contact default is empty string 
    email: "", //this is email default is empty string 
    college: "" //this is college Name default is empty string 
}

//patter 
const formPattern = {
    password: /^[a-zA-Z0-9]{7,20}$/,
    contact: /^(?:\+88|01)?\d{11}\r?$/ ,
    email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ 
}

//input handler to get all form data in a dynamic way
function inputHandler (name) {
    const inputDataIdName = `#${name}`  //this is the id name 
    const getData = document.querySelector (inputDataIdName).value //select the data from
    //validation part
    if (name == "college") { 
        storeDataHandler (getData, name) //if the name is college then it will store the data direct without validation
    }else {
        mainValidationHandler(name, getData) //other wise validation part start
    }
    
    //update the value 
}

//checked handler 
function checkedHandler (name, id) {
    const inputDataIdName = `#${id}`  //this is the id name 
    const isChecked  = document.querySelector (inputDataIdName).checked  //find the value of checked
    const value = document.querySelector (inputDataIdName).value  //pick the checked input data and get the input value
    if (isChecked) { //if it is new checked then it will execute  otherwise delete the exist value in the else block
        formData[name].push (value) 
    }else {
        const index = formData[name].indexOf(value) //get the index of unchecked value to remove it from form 
        formData[name].splice (index, 1) 
    }
}
//input handler to get checked data in dynamic way 
function radioHandler (name, id) {
    const checkedValue = document.querySelector (`#${id}`).value //this is the id name  and find the value
    storeDataHandler(checkedValue, name) //store all radio input value
}
//submit Handler 
const submitButton = document.querySelector("#submit") //pick the submit button
submitButton.addEventListener ("click", (e) => { //if user click on submit button it will happen
    e.preventDefault(); 
    printFormData() //call this function and print the form data as input
})

//main validation controller
function mainValidationHandler (name, data) {
    const inputName = name //receive the  input field name
    const inputData = data //receive the  input field value 
    let output
    if (inputName == "name") output = nameValidation (inputData, inputName) 
    else if (inputName ==  "userName") output = userNameValidation(inputData, inputName)
    else if (inputName ==  "password") output = passwordValidation(inputData, inputName)
    else if (inputName ==  "passwordRepeat") output = retypePasswordValidation(inputData, inputName)
    else if (inputName ==  "contact") output = contactNumberValidation(inputData, inputName)
    else if (inputName ==  "email") output = emailValidation(inputData, inputName)
    if (output.status) {
        alert (output.message)
    }else {
        alert (output.message)
    }
}
// //name validation 
// function nameValidation (data, name) {
//     const inputData = data //store the input data here
//     if (inputData.length != 0 ) { //check is it empty or not
//         storeDataHandler(inputData, name) //store the name value in the form data
//         return {
//             status: true,
//             message: validationMessage.name.success
//         }
//     }else {
//         return {
//             status: false,
//             message: validationMessage.name.unsuccessful
//         } 
//     }
// }

//user name validation 
function userNameValidation (data, name) {
    const inputData = data //store the input data here
    if (inputData.split (" ").length == 1 && inputData.length != 0) { //check that is there have any white space or is it a empty one or not
        storeDataHandler(inputData, name)
        return {
            status: true,
            message: validationMessage.userName.success
        }
    }else {
        return {
            status: false,
            message: validationMessage.userName.unsuccessful
        }
    }
}

// cancel button handler 
const cancelButtonSelector = document.querySelector("#cancle")
cancelButtonSelector.addEventListener ("click", (e) => {
    e.preventDefault()
    console.log(`Hello`);
})

//password validation 
function passwordValidation (data, name) {
    const inputData = data //store the input data here
    const pattern = formPattern.password //this is the password validation pattern
    const isValid = regexValidation(pattern, inputData)
    if (isValid){ //if the validation gives true then it will execute
        storeDataHandler(inputData, name)
        return {
            status: true,
            message: validationMessage.password.success
        };
    }
    else return {
        status: false,
        message: validationMessage.password.unsuccessful
    }
}

//retypePassword validation
function retypePasswordValidation (data, name) {
    const inputData = data //store the input data here
    if (formData.password == "" ) { //check that is already password is inputed  or not
        return {
            status: false,
            message: "Password Required"
        };
    }else {
        const {password} = formData //get the existing inputed password from form data
        const regex = new RegExp(password) //check that both password is matched or not
        const res = inputData.search (regex) //it will five 0 or -1 0 means true and -1 means false
        if (res == 0) { //if both password matched then it will happen
            return {
                status: false,
                message: validationMessage.re_typePassword.success
            }
        }else return {
                status: false,
                message: validationMessage.re_typePassword.unsuccessful
            }
    }
}

//contact number validation 
function contactNumberValidation (data, name) {
    const inputData = data //store the input data here
    const inputName = name //store the input name here
    const pattern = formPattern.contact //this is the validation pattern of contact number of bangladesh
    const isValid = regexValidation (pattern, inputData) //it will return true or false 
    if (isValid ) { //if the contact number validated then it will happen
        storeDataHandler(inputData, inputName)
        return {
            status: true,
            message: validationMessage.contactNumber.success
        };
    }else return {
            status: false,
            message: validationMessage.contactNumber.unsuccessful
        };
}

//email validation
function emailValidation (data, name) {
    const inputName = name //store the input name here
    const inputData = data //store the input data here
    const validationPattern = formPattern.email//this is email validation pattern
    const isValidEmail = regexValidation (validationPattern, inputData) //it will give true or false
    if (isValidEmail) { //if email vaidation successful then it will happen
        storeDataHandler(inputData, inputName) //store the email data into form data
        return  {
            status: true,
            message: validationMessage.email.success
        }
    }
    else return  {
        status: false,
        message: validationMessage.email.unsuccessful
    }
}

//store data 
function storeDataHandler (data, name) {
    formData[name] = data //store the data according to the name in a dynamic way
    return 0
}

//regex validation 
const regexValidation = (regex, data) => {
    const inputRegex = regex //store the input regex here
    const inputData = data //store the input data here
    const isValid = inputData.search (inputRegex) //it will give - 1 or 0 0 for true and -1 for false
    if (isValid == 0) { //if the regex pattern will match the it will happen
        return true
    }else return false
}

function printFormData () {
    let data = "" 
    for (let property in formData) {
        data += `${property}: ${formData[property]} `
    }
    alert (data)
}

