
const getSavedAccounts = () =>
{
    const accountsJSON = localStorage.getItem('accounts')
    try
    {
        return accountsJSON ? JSON.parse(accountsJSON) : []
    }
    catch (event)
    {
        return []
    }     
}

let accounts = getSavedAccounts()



function login_SignupForm(){
    const containerForms = document.querySelector("#containerForm")
    containerForms.classList.remove("form--hidden")
}

function setFormMessage(formElement, type, message){
    const messageElement = formElement.querySelector(".form__message")

    messageElement.textContent = message
    messageElement.classList.remove("form__message--success","form__message--error" )
    messageElement.classList.add(`form__message--${type}` )
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error")
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message
}
function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error")
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = ""
}

function clearFormError(formElement, type) {
    const messageElement = formElement.querySelector(".form__message")

    messageElement.textContent = ""
    messageElement.classList.remove("form__message--success","form__message--error" )
    messageElement.classList.add(`form__message--${type}` )
}

function check(){
    let signUpName = document.getElementById("signupUsername")
    let signUpPass = document.getElementById("signUpPassword")
    let confirmPass = document.getElementById("confirmPassword")
    let signUpemail = document.getElementById("signupEmail")
    if(( signUpName.value.length < 7 || checkForExistence(signUpName.value,accounts) )||
        ( signUpPass.value.length < 5) ||
        (confirmPass.value !== signUpPass.value) ||
        (signUpemail.value.includes('@')===false) )
        {
            return false
        }
        else{
            return true
        }
}
function isAccountExist(accounts)
{
    let loginName = document.getElementById("loginUserName")
    let loginPass = document.getElementById("loginPassword")
    let isExist = false
    accounts.forEach(element => {
        if(loginName.value === element.userName && loginPass.value === element.userPass)
        {
            isExist = true
        }
    });
    return isExist
}
function findId(accounts)
{
    let loginName = document.getElementById("loginUserName")
    let loginPass = document.getElementById("loginPassword")
    let idToReturn
    accounts.forEach(element => {
        if(loginName.value === element.userName && loginPass.value === element.userPass)
        {
            idToReturn = element.id
        }
    });
    return idToReturn
    

}
function checkForExistence(nameToCheck, accounts)
{
    let isNameExist = false
    accounts.forEach(element => {
        if(nameToCheck === element.userName )
        {
            isNameExist = true
        }
    });
    return isNameExist
}


const saveAccounts = (accounts) =>
{
    localStorage.setItem('accounts', JSON.stringify(accounts))
}


document.addEventListener("DOMContentLoaded", ()=>{
    const loginForm = document.querySelector("#login")
    const createAccountForm = document.querySelector("#createAccount")
    const containerForms = document.querySelector("#containerForm")

     document.querySelector("#linkCreateAccount").addEventListener("click", e => {
         e.preventDefault()
         loginForm.classList.add("form--hidden")
         createAccountForm.classList.remove("form--hidden")
     })
    document.querySelector("#linkLogin").addEventListener("click",e => {
        e.preventDefault()
        loginForm.classList.remove("form--hidden")
        createAccountForm.classList.add("form--hidden")
    })
    document.querySelector("#linkContinueWithoutAccount").addEventListener("click", e => {
        e.preventDefault()
        loginForm.classList.remove("form--hidden")
        createAccountForm.classList.add("form--hidden")
        containerForms.classList.add("form--hidden")
    })
    document.querySelector("#linkForgetItAndContinueWithoutAccount").addEventListener("click", e => {
        e.preventDefault()
        loginForm.classList.remove("form--hidden")
        createAccountForm.classList.add("form--hidden")
        containerForms.classList.add("form--hidden")
    })
    loginForm.addEventListener("submit", e => {
        e.preventDefault()
        let isInfoValid = isAccountExist(accounts)
        if(isInfoValid === true)
        {
            const id = findId(accounts)
            const user = accounts.find(element => element.id===id)
            if(user.userName==="adminio")
            {
                location.assign(`indexForAdmin.html#${id}`)
            }
            else
            {
            location.assign(`indexForUsers.html#${id}`)
            }
            
        }
        else{
        setFormMessage(loginForm,"error", "Invalid username/password combination")
        }
    })
    
    createAccountForm.addEventListener("submit", e => {
        e.preventDefault()
        let isInfoValid = check()
        if(isInfoValid === true)
        {
            const id = uuidv4()
            
            const timestemp = Date.now()
            let signUpName = document.getElementById("signupUsername")
            let signUpPass = document.getElementById("signUpPassword")
            let signUpemail = document.getElementById("signupEmail")
            accounts.push({
                id: id,
                userName:signUpName.value,
                userPass:signUpPass.value,
                userEmail:signUpemail.value,
                admin:false,
                createdAt:timestemp,
                newCoordinates:[]

            })
            saveAccounts(accounts)
             
            location.assign(`indexForUsers.html#${id}`)
        }
        else{
        setFormMessage(createAccountForm,"error", "One or more of the data is incorrect")
        }
    })
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            clearFormError(createAccountForm,"error")
            if (e.target.id === "signupUsername" && (e.target.value.length < 7 || checkForExistence(e.target.value, accounts)===true)) {
                if(e.target.value.length < 7)
                {setInputError(inputElement, "Username must be at least 7 characters in length")}
                else{
                    setInputError(inputElement, "Username already exist please change your username")
                }
                
            }
        })

        inputElement.addEventListener("blur", e => {
            clearFormError(createAccountForm,"error")
            if (e.target.id === "signUpPassword" && e.target.value.length < 5) {
                setInputError(inputElement, "Password must be at least 5 characters in length")
            }
        })
        inputElement.addEventListener("blur", e => {
            clearFormError(createAccountForm,"error")
            if (e.target.id === "confirmPassword" && e.target.value !== signUpPassword.value) {
                setInputError(inputElement, "Must be exactly the same as the password")
            }  
        })

        inputElement.addEventListener("blur", e => {
            clearFormError(createAccountForm,"error")
            if (e.target.id === "signupEmail" && e.target.value.includes('@')===false ) {
                setInputError(inputElement, "There must be a valid email")
            } 
        })

        inputElement.addEventListener("blur", e => {
            clearFormError(createAccountForm,"error")
            if (e.target.id === "loginUserName" && e.target.value.length < 7 ) {
                setInputError(inputElement, "Username must be at least 7 characters in length")
            } 
        })
        inputElement.addEventListener("blur", e => {
            clearFormError(createAccountForm,"error")
            if (e.target.id === "loginPassword" && e.target.value.length < 5 ) {
                setInputError(inputElement, "Password must be at least 5 characters in length")
            } 
        })


        inputElement.addEventListener("input", e =>{
            clearInputError(inputElement)
        })
        
    })
})



