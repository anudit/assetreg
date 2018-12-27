function structFactory(names) {
    var names = names.split(' ');
    var count = names.length;
    function constructor() {
        for (var i = 0; i < count; i++) {
            this[names[i]] = arguments[i];
        }
    }
    return constructor;
}

window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
                await ethereum.enable();
        } catch (error) {
                console.log(error);
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/8f68025ea6a8425cb75ae44591a8b1b3"));
    }
});

web3.eth.defaultAccount = web3.eth.accounts[0];
var VehicleRegistryContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_vin","type":"bytes32"},{"name":"_voner","type":"string"}],"name":"transferVehicle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getVehiclesLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"bytes32"}],"name":"isVehicle","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"bytes32"}],"name":"getVehicleDetails","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_add","type":"address"},{"name":"_vin","type":"bytes32"},{"name":"_dd","type":"string"},{"name":"_mm","type":"string"},{"name":"_yyyy","type":"string"},{"name":"_company","type":"string"},{"name":"_model","type":"string"},{"name":"_jur","type":"string"},{"name":"_vehicleOwnner","type":"string"}],"name":"registerVehicle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"bytes32"}],"name":"unregisterVehicle","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_vin","type":"bytes32"},{"indexed":false,"name":"vowner","type":"string"}],"name":"NewVehicle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"vin","type":"bytes32"},{"indexed":false,"name":"company","type":"string"},{"indexed":false,"name":"model","type":"string"}],"name":"vehicleRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"vin","type":"bytes32"},{"indexed":false,"name":"company","type":"string"},{"indexed":false,"name":"model","type":"string"}],"name":"vehicleUnRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"vin","type":"bytes32"},{"indexed":false,"name":"company","type":"string"},{"indexed":false,"name":"model","type":"string"},{"indexed":false,"name":"oldOwner","type":"string"},{"indexed":false,"name":"newOwner","type":"string"}],"name":"vehicleTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"vin","type":"bytes32"},{"indexed":false,"name":"dd","type":"string"},{"indexed":false,"name":"mm","type":"string"},{"indexed":false,"name":"yyyy","type":"string"},{"indexed":false,"name":"company","type":"string"},{"indexed":false,"name":"model","type":"string"},{"indexed":false,"name":"jur","type":"string"},{"indexed":false,"name":"vehicleOwner","type":"string"},{"indexed":false,"name":"status","type":"int8"}],"name":"vehicleDetails","type":"event"}]);
var VehicleRegistry = VehicleRegistryContract.at('0x3da35f41959c1dd062cdef1297115e76dc15e55d');
var Vehicle = structFactory("vin dd mm yyyy company model jur vehicleOwner status");

function showDetails(v){
    $('#address').text(web3.eth.defaultAccount);
    $('#ownerName').text(v.vehicleOwner);
    $('#vin').text(v.vin);
    $('#dor').text(v.dd+v.mm+v.yyyy);
    $('#carCompany').text(v.company);
    $('#carModel').text(v.model);
    $('#jurisdiction').text(v.jur);
    $('#vehicleStatus').text(v.status);
}

$("#btnGetVehicleDetails").click(function(){
    getVehicleDetails($("#getDetailsVin").val());
});

$("#getVinLength").click(function(){
    getVehiclesLength();
});

$("#formUnRegisterVehicleSubmit").click(function(){
    unregisterVehicle($("#formVin").val());
});


$("#formTransferVehicleSubmit").click(function(){
    transferVehicle($("#formTransferVin").val(), $("#formTransferNO").val());
});


var vehicleRegistered = VehicleRegistry.vehicleRegistered();
vehicleRegistered.watch(function(error, result){
    if (!error)
        {
            console.log(result);
        } else {
            console.log(error);
        }
});

var vehicleUnRegistered = VehicleRegistry.vehicleUnRegistered();
vehicleUnRegistered.watch(function(error, result){
    if (!error)
        {
            console.log(result);
        } else {
            console.log(error);
        }
});

var vehicleTransferred = VehicleRegistry.vehicleTransferred();
vehicleTransferred.watch(function(error, result){
    if (!error)
        {
            console.log(result);
        } else {
            console.log(error);
        }
});

var vehicleDetails = VehicleRegistry.vehicleDetails();
vehicleDetails.watch(function(error, result){
    if (!error)
        {
            var v1 = new Vehicle(result.args.vin, result.args.vin.dd, result.args.mm, result.args.yyyy, result.args.company, result.args.model, result.args.jur, result.args.vehicleOwner, result.args.status.s);
            showDetails(v1);
        } else {
            console.log(error);
        }
});

function getVehicleDetails(vin){
    VehicleRegistry.getVehicleDetails(vin,function(error, result) {
        if (!error) {
                //console.log(result);
        } else
                console.log(error);
    });
}

function getVehiclesLength(){
    VehicleRegistry.getVehiclesLength(function(error, result) {
        if (!error) {
                alert(result.s);
        } else
                console.log(error);
    });
}

function isVehicle(vin){
    VehicleRegistry.isVehicle(vin,function(error, result) {
        if (!error) {
                console.log(result);
        } else
                console.log(error);
    });
}

function unregisterVehicle(vin){
    VehicleRegistry.unregisterVehicle(vin,function(error, result) {
        if (!error) {
                console.log(result);
        } else
                console.log(error);
    });
}

function transferVehicle(vin, no){
    VehicleRegistry.transferVehicle(vin,no, function(error, result) {
        if (!error) {
                console.log(result);
        } else
                console.log(error);
    });
}