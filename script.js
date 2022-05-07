// Introduzindo Firebase

const firebaseConfig = {
    apiKey: "AIzaSyDYVdS7js3AlHc6kP_00gJHDJteNa3bmPI",
    authDomain: "flushee.firebaseapp.com",
    projectId: "flushee",
    storageBucket: "flushee.appspot.com",
    messagingSenderId: "630267593187",
    appId: "1:630267593187:web:6a8d013a07a37e305960d6",
    measurementId: "G-2GTV7VPG1K"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
let auth = firebase.auth();

// Mecanismo da animação

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");


sign_up_btn.addEventListener('click', ()=>{         //Testando 1maneira de 
    container.classList.add("sign-up-mode");        //adicionar um evento
});

sign_in_btn.addEventListener('click', ()=>{
    container.classList.remove("sign-up-mode");
});

// Mecanismo ocultar/mostrar senha cadastro

let password = document.querySelector('.password');
let eye = document.querySelector(".eye");

eye.addEventListener('click', ()=>{
    if (password.type === 'password'){
        
        password.type = 'text'
        eye.src = './assets/ocultar.png'
    }else{

        password.type = 'password'
        eye.src = './assets/mostrar.png'
    }
});

// Mecanismo registro/login email e senha

let signInForm = document.querySelector(".sign-in-form");
let signUpForm = document.querySelector(".sign-up-form");
let googleLogin = document.querySelector("#google-login");
let facebookLogin = document.querySelector("#facebook-login");

signUpForm.onsubmit = event =>{           //Testando 2maneira de
    event.preventDefault();               //adicionar um evento

    let email = signUpForm.querySelector("#emailCadastro").value;
    let senha = signUpForm.querySelector("#senhaCadastro").value;

    auth.createUserWithEmailAndPassword(email, senha)
    .then(() =>{
        Swal.fire({
            title: 'O usuário foi cadastrado com sucesso!',
            timer: 10000
        });
        signInForm.reset();
        signUpForm.reset();
    }).catch((error) =>{
        console.log(error);
    });


};

//Login com email e senha
signInForm.onsubmit = event =>{
    event.preventDefault();

    let email = signInForm.querySelector("#emailLogin").value;
    let senha = signInForm.querySelector("#senhaLogin").value;

    auth.signInWithEmailAndPassword(email, senha)
    .then(() =>{
        Swal.fire({
            title: 'O usuário foi logado com sucesso!',
            timer: 10000
        });
        signInForm.reset();
        signUpForm.reset();
    }).catch((error) =>{
        if (error.code == 'auth/wrong-password' || error.code == 'auth/user-not-found'){
            Swal.fire({
                icon: 'error',
                title: 'Email ou senha incorretos',
                text: 'Tente novamente ou recupere sua senha!',
                timer: 15000
              });
        };
    });
};

//Login com google
googleLogin.onclick = event =>{
    let providerG = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(providerG).then(() =>{
        Swal.fire({
            title: 'O usuário foi logado com sucesso!',
            timer: 10000
        });
    })
    .catch((error) =>{
        console.log(error);
    });
};

//Login com facebook
facebookLogin.onclick = event =>{
    let providerF = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(providerF).then(() =>{
        Swal.fire({
            title: 'O usuário foi logado com sucesso!',
            timer: 10000
        });
    })
    .catch((error) =>{
        console.log(error);
    });
    
};








