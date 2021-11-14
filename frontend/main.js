Moralis.initialize("q7Gl3yXVfabVqt2iEO9t9eX7En4U7jccpRyjYAVq");
Moralis.serverURL = 'https://4u6qe0qwyedr.usemoralis.com:2053/server'

init = async () => {
    hideElement(userinfo);
    window.web3 = await Moralis.Web3.enable();
    initUser();
} 

initUser = async () => {
    if (await Moralis.User.current()){
        hideElement(userConnectButton);
        showElement(userProfileButton);
    }else{
        showElement(userConnectButton);
        hideElement(userProfileButton);
    }
}

login = async () => {
    try {   
        await Moralis.Web3.authenticate();
        initUser();
    } catch (error) {
        alert(error)
    }
}

logout = async () => {
    await Moralis.User.logOut();
    hideElement(userInfo);
    initUser();
}

openUserInfo = async () => {
    user = await Moralis.User.current();
    if (user){    
        showElement(userInfo);
    }else{
        login();
    }
}

hideElement = (element) => element.style.display = "none";
showElement = (element) => element.style.display = "block";

// // Navbar
const userConnectButton = document.getElementById("btnConnect");
userConnectButton.onclick = login;

const userProfileButton = document.getElementById("btnUserInfo");
userProfileButton.onclick = openUserInfo;

// userProfileButton.onclick = openUserInfo;

const userinfo  = document.getElementById("userinfo");
document.getElementById("btnCloseUserInfo").onclick = () => hideElement(userInfo);
document.getElementById("btnLogout").onclick = logout;



init();