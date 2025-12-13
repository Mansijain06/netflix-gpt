export const checkValidData = (email, password, name = null) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if(name) {
        const isNameValid = /^[a-zA-Z\s'-]+$/.test(name);
        if(!isNameValid) return "Please enter valid name.";
    }

    if(!isEmailValid) return "Please enter valid email.";
    if(!isPasswordValid) return "Please enter valid password.";

    return null;

}


