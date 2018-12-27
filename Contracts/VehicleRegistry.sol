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
	    	int8 status;  //  0 not exist, 1 created, 2 transferred
	    }
	    
        modifier isOwner(address sender) {
            if(owner != sender) {
                revert();
            }else{
                _;
            }
        }

        function registerVehicle(address _add, bytes32 _vin,string memory _dd,string memory _mm,string memory _yyyy,string memory _company,string memory _model,string memory _jur, string memory _vehicleOwnner) isOwner(msg.sender) public{
            require(!isVehicle(_vin));
            vins.push(_vin);
            vehicleList[_vin] = Vehicle(_add, _vin,_dd,_mm,_yyyy,_company, _model,_jur,_vehicleOwnner, 1);
        }

        function isVehicle(bytes32 _id) public view returns(bool) {
		if (vehicleList[_id].status != 0) {
			return true;
		    }

	        return false;
	    }

	    function transferVehicle(bytes32 _vin,string memory _voner) public isOwner(msg.sender)  {
	        require(isVehicle(_vin));
            vehicleList[_vin].vehicleOwner = _voner;
            vehicleList[_vin].status = 2;
	    }
	    
	    function getVehicleOwner(bytes32 _id) public view returns(string memory){
	        require(isVehicle(_id));
	        string memory  name= vehicleList[_id].vehicleOwner;
	        return name;
	    }
	    
	    function getVehicleDetails(bytes32 _id) public view returns(Vehicle memory){
	        require(isVehicle(_id));
	        return vehicleList[_id];
	    }

}