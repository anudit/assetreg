
# iVault

## Project Details

 - FIS SOLUTIONS(INDIA)
 - Finance
 - Complex

> Registration information of property / vehicle is very crucial to
> identify current and previous ownership. In absence for secure way to
> validate chain of ownership, same property / vehicle can be
> fraudulently sold to multiple person. Similarly, we always want to
> keep records of financial transaction, communication in a way which
> cannot be manipulated and can be referenced in future. Hence there is
> need for system which allow creation of data which cannot be
> manipulated but can be extended

## Contract Information

### VehicleRegistry.sol
**Contract Address :** 
`0x2da6a4a11133644257a87bc02b5b9edeb30e5e3f`

**Testnet Chain :** 
`Ropsten`

**ABI :**

    [ { "constant": false, "inputs": [ { "name": "_vin", "type": "bytes32" }, { "name": "_voner", "type": "string" } ], "name": "transferVehicle", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_id", "type": "bytes32" } ], "name": "getVehicleOwner", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_id", "type": "bytes32" } ], "name": "isVehicle", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_id", "type": "bytes32" } ], "name": "getVehicleDetails", "outputs": [ { "components": [ { "name": "ethadd", "type": "address" }, { "name": "vin", "type": "bytes32" }, { "name": "dd", "type": "string" }, { "name": "mm", "type": "string" }, { "name": "yyyy", "type": "string" }, { "name": "company", "type": "string" }, { "name": "model", "type": "string" }, { "name": "jur", "type": "string" }, { "name": "vehicleOwner", "type": "string" }, { "name": "status", "type": "int8" } ], "name": "", "type": "tuple" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_add", "type": "address" }, { "name": "_vin", "type": "bytes32" }, { "name": "_dd", "type": "string" }, { "name": "_mm", "type": "string" }, { "name": "_yyyy", "type": "string" }, { "name": "_company", "type": "string" }, { "name": "_model", "type": "string" }, { "name": "_jur", "type": "string" }, { "name": "_vehicleOwnner", "type": "string" } ], "name": "registerVehicle", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_vin", "type": "bytes32" }, { "indexed": false, "name": "vowner", "type": "string" } ], "name": "NewVehicle", "type": "event" } ]

**Test Data:**

    "0x707aC3937A9B31C225D8C240F5917Be97cab9F20","0x55503635435730303037","09","09","2009","Bugati","Chiron","DEL","RandomDude"
