pragma solidity ^0.5.2;
pragma experimental ABIEncoderV2;

contract VehicleRegistry  {

    	address owner;
        bytes32[]  vins;
        
        mapping(bytes32 => Vehicle) vehicleList;

        constructor () public{
            owner = msg.sender;
        }

        event NewVehicle(bytes32 _vin,string vowner);

    	struct Vehicle {
    	    address ethadd;
		    bytes32 vin;
		    string dd;
		    string mm;
		    string yyyy;
            string company;
		    string model;
		    string jur;
		    string vehicleOwner;
	    	int8 status;  //  0 not exist, 1 created, 2 transferred, 3 unregister
	    }
	    
        modifier isOwner(address sender) {
            if(owner != sender) {
                revert();
            }else{
                _;
            }
        }
        
        event vehicleRegistered (
            bytes32 vin,
            string company,
            string model
        );
        
        event vehicleUnRegistered (
            bytes32 vin,
            string company,
            string model
        );
        
        event vehicleTransferred (
            bytes32 vin,
            string company,
            string model,
            string oldOwner,
            string newOwner
        );

        function registerVehicle(address _add, bytes32 _vin,string memory _dd,string memory _mm,string memory _yyyy,string memory _company,string memory _model,string memory _jur, string memory _vehicleOwnner) isOwner(msg.sender) public{
            require(!isVehicle(_vin));
            vins.push(_vin);
            vehicleList[_vin] = Vehicle(_add, _vin,_dd,_mm,_yyyy,_company, _model,_jur,_vehicleOwnner, 1);
            emit vehicleRegistered(_vin, _company, _model);
        }

        function isVehicle(bytes32 _id) public view returns(bool) {
		    if (vehicleList[_id].status != 0) {
			    return true;
		    }
	        return false;
	    }

	    function transferVehicle(bytes32 _vin,string memory _voner) public isOwner(msg.sender)  {
	        require(isVehicle(_vin));
	        string storage oldOwner = vehicleList[_vin].vehicleOwner;
            vehicleList[_vin].vehicleOwner = _voner;
            vehicleList[_vin].status = 2;
            emit vehicleTransferred(_vin, vehicleList[_vin].company, vehicleList[_vin].model, oldOwner, _voner);
	    }
	    
	    function unregisterVehicle(bytes32 _id) public returns(bool){
	        require(isVehicle(_id));
	        vehicleList[_id].status = 3;
	        emit vehicleUnRegistered(_id, vehicleList[_id].company, vehicleList[_id].model);
	        return true;
	    }
	    
	    function getVehicleDetails(bytes32 _id) public view returns(Vehicle memory){
	        require(isVehicle(_id));
	        return vehicleList[_id];
	    }
	    function getVehiclesLength() public view returns(uint256){
	        return vins.length;
	    }

}