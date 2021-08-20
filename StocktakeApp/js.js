//onload();

function toggle(){
    $('.ui.sidebar').sidebar('toggle');
};

$('#email,#firstname,#lastname,#password').keypress(function(){clearErr()});

$('#email,#firstname,#lastname,#password').keypress(function(Event){console.log(Event.target.id)});

$('#Logoutbtn').click(function(){
    toggle();
    clearform();
    setSection('LoginSection');
    //fetch('http://localhost/php/Stocktakeapi/api?action=logout');
});

$('#Stockbtn,#Homebtn,#Settingsbtn,#Scanbtn').click(function(Event){
    var target = Event.target.id.replace('btn','');
    target = target.replace('Iele','');
    console.log(target);
    setSection(target);
    toggle();
})


function ApiLogin()
{
    if(document.getElementById('email').value == '' || document.getElementById('password').value == ''){
        newErr('Empty Credentials')
    }
    else{
        clearErr();
        var spinner = document.getElementById('spinner');
        var data = new FormData();
        spinner.style.display = 'block';
        data.append('email', document.getElementById('email').value);
        data.append('password', document.getElementById('password').value);
        setSection('Home');
        spinner.style.display = 'none';
        /*fetch('/php/Stocktakeapi/api?action=login',{method: 'post', body: data})
        .then(function(res){
                    if(res.status === 200){
                        document.getElementById('LoginSection').style.display = 'none';
                        document.getElementById('Home').style.display = 'block';
                        clearform();
                    }
                    else if(res.status === 400){
                        newErr('Invalid Credentials');

                    }
                    else if(res.status === 429){
                        newErr('Request Timed Out');
                        alert('Too many requests sent, connection has been disconnected');
                    }
                    spinner.style.display = 'none';
                });*/
    }
}

function ApiRegister(){
    clearErr()
    console.log("reg start");
    var data = new FormData();
    data.append('password', document.getElementById('password').value);
    data.append('email', document.getElementById('email').value);
    data.append('firstname', document.getElementById('firstname').value);
    data.append('lastname', document.getElementById('lastname').value);
    clearform();
    newErr('Form not implemented');
    /*fetch('http://localhost/php/Stocktakeapi/api?action=register',{method: 'post', body: data})
    .then(function(res){
                console.log('post resp');
                if(res.status === 201){
                    LoginUiSwap('loginui');
                }
                else if(res.status === 400){
                    newErr("Email Taken");
                }
                else if(res.status === 401){
                    newErr('Empty Credentials');
                }
                else if(res.status === 500){
                    newErr('Internal server Error');
                }
                else if(res.status === 429){
                    newErr('Request Timed Out');
                    alert('Too many requests sent, connection has been disconnected');
                }
            });*/
    
}


function LoginUiSwap(ui){
    clearErr();
    clearform();
    document.getElementById('registerui').style.display = 'none';
    document.getElementById('loginui').style.display = 'none';
    document.getElementById(ui).style.display = 'block';

    if(document.getElementById('registerui').style.display == 'block'){
        document.getElementById('firstnameinput').style.display = 'block';
        document.getElementById('lastnameinput').style.display = 'block';
    }
    else{
        document.getElementById('firstnameinput').style.display = 'none';
        document.getElementById('lastnameinput').style.display = 'none';
    }

}

function onload(){
    fetch('http://localhost/php/Stocktakeapi/api?action=isloggedin')
    .then(function(res){
        if(res.status === 200){
            setSection('Home');
        }
        else if(res.status === 429){
            setSection('LoginSection');
            newErr('Request Timed Out');
            alert('Too many requests sent, connection has been disconnected');
        }
    })
}


function clearform(){
    document.getElementById('password').value = '';
    document.getElementById('email').value = '';
    document.getElementById('firstname').value = '';
    document.getElementById('lastname').value = '';
    
}

function clearErr(){
    document.getElementById('login_err').style.display = 'none';
    document.getElementById('loginform').style.border = '';
}

function newErr(response){
    document.getElementById('loginform').style.border = '1.5px solid red';
    document.getElementById('login_err').style.display = 'block';
    document.getElementById('login_err').innerHTML = response;
}

function setSection(open){
    document.getElementById('Home').style.display = 'none';
    document.getElementById('Stock').style.display = 'none';
    document.getElementById('Scan').style.display = 'none';
    document.getElementById('Settings').style.display = 'none';
    document.getElementById('LoginSection').style.display = 'none';
    document.getElementById(open).style.display = 'block';
}

