Moralis.initialize("q7Gl3yXVfabVqt2iEO9t9eX7En4U7jccpRyjYAVq");
Moralis.serverURL = 'https://4u6qe0qwyedr.usemoralis.com:2053/server'

init = async () => {
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
        console.log("ok!")
        initUser();
    } catch (error) {
        console.log("ne ok!")

        alert(error)
    }
}


hideElement = (element) => element.style.display = "none";
showElement = (element) => element.style.display = "block";

// // Navbar
const userConnectButton = document.getElementById("btnConnect");
userConnectButton.onclick = login;

const userProfileButton = document.getElementById("btnUserInfo");
// userProfileButton.onclick = openUserInfo;

init();