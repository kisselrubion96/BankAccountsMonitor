document.addEventListener("deviceready", on_device_ready, false);

var accounts = [];

var indexcount = 0;

function on_device_ready() {

    if (localStorage.accountsRecord) {
        accounts = JSON.parse(localStorage.accountsRecord);
        var sel = document.getElementById('accountsList');

        for (var i = 0; i < accounts.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = accounts[i].accountname;
            opt.value = accounts[i].accountname;
            sel.appendChild(opt);
        }
    }


    document.getElementById("accountTab").setAttribute("style", "display:none");
    document.getElementById("depositTab").setAttribute("style", "display:none");
    document.getElementById("withdrawTab").setAttribute("style", "display:none");

}
function on_select_process() {
    var selectedvalue;
    var selectedProcess = document.getElementById('selectProcess');
    var sel = document.getElementById('accountsList');

    if (selectedProcess.value == 0) {
        for (var index = 0; index < accounts.length; index++) {
            if (sel.value == accounts[index].accountname) {
                document.getElementById('inputAmount').value = accounts[index].amount;
            }
        }
    }
    if (selectedProcess.value == 1) {
        document.getElementById("newTab").setAttribute("style", "display:none")
        document.getElementById("accountTab").setAttribute("style", "display:none")
        document.getElementById("depositTab").setAttribute("style", "display:block");


    }
    if (selectedProcess.value == 2) {
        document.getElementById("newTab").setAttribute("style", "display:none")
        document.getElementById("withdrawTab").setAttribute("style", "display:block");

    }

    // if (selectedProcess.value ==0 && sel.value == 2)
    // {
    //     document.getElementById('inputAmount').value = accounts[2].amount;

    // }

    // if (selectedProcess.value ==0 && sel.value == 3)
    // {
    //     document.getElementById('inputAmount').value = accounts[3].amount;

    // }

}

function on_add_account() {

    document.getElementById("newTab").setAttribute("style", "display:none")
    document.getElementById("accountTab").setAttribute("style", "display:block")
}
function on_save_added_account() {
    var addedaccount = document.getElementById('addAccountInput').value;
    var addedamount = document.getElementById('addAmountInput').value;

    var accountObj = { accountname: addedaccount, amount: addedamount };


    accounts.push(accountObj);
    localStorage.accountsRecord = JSON.stringify(accounts);

    var sel = document.getElementById('accountsList');
    var opt = document.createElement('option');

    opt.innerHTML = accountObj.accountname;
    opt.value = accountObj.accountname;
    sel.appendChild(opt)




    document.getElementById("newTab").setAttribute("style", "display:block")
    document.getElementById("accountTab").setAttribute("style", "display:none")
    document.getElementById('addAccountInput').value = "";
    document.getElementById('addAmountInput').value = "";

}
function on_deposit_amount() {
    var sel = document.getElementById('accountsList');
    var depositAmount = document.getElementById('addDepositInput').value;

    for (var index = 0; index < accounts.length; index++) {
        if (sel.value == accounts[index].accountname) {
            // accounts[index].amount += depositAmount;
            var sum = parseInt(accounts[index].amount) + parseInt(depositAmount);
            accounts[index].amount = sum;
            
        }
    }

    localStorage.accountsRecord = JSON.stringify(accounts);

    document.getElementById('addDepositInput').value = "";
    document.getElementById("newTab").setAttribute("style", "display:block")
    document.getElementById("depositTab").setAttribute("style", "display:none");
    document.getElementById("accountTab").setAttribute("style", "display:none")

    document.getElementById('selectProcess').value = 0;

}

function on_withdraw_amount() {
    var sel = document.getElementById('accountsList');
    var depositAmount = document.getElementById('addWithdrawInput').value;

    for (var index = 0; index < accounts.length; index++) {
        if (sel.value == accounts[index].accountname) {
            var sum = parseInt(accounts[index].amount) - parseInt(depositAmount);
            accounts[index].amount = sum;
        }
    }

    localStorage.accountsRecord = JSON.stringify(accounts);

    document.getElementById('addWithdrawInput').value = "";
    document.getElementById("newTab").setAttribute("style", "display:block")
    document.getElementById("depositTab").setAttribute("style", "display:none");
    document.getElementById("withdrawTab").setAttribute("style", "display:none");
    document.getElementById("accountTab").setAttribute("style", "display:none")

    document.getElementById('selectProcess').value = 0;

}
function on_save_everything()
{
    localStorage.accountsRecord = JSON.stringify(accounts);
    document.location.reload(true);
}