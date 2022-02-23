// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

contract Decentragram {
    string public name = "Decentragram";

    uint public imageCount = 0; // used to generate image Id

    // Store Images
    mapping(uint => Image) public images;

    struct Image {
        uint id;
        string hash;
        string description;
        uint tipAmount;
        address payable author;
    }

    event ImageCreated(
        uint id,
        string hash,
        string description,
        uint tipAmount,
        address payable author
    );

    event ImageTipped(
        uint id,
        string hash,
        string description,
        uint tipAmount,
        address payable author
    );

    // Create Images
    function uploadImage(string memory _imgHash, string memory _description)public {
        // make sure the image  hash exists
        require(bytes(_imgHash).length > 0);

        // make sure image description exists
        require(bytes(_description).length > 0);

        // make sure uploader image exists
        require(msg.sender != address(0x0));

        //  Increement image id
        imageCount += 1;

        // Add Image to contract
        images[imageCount] = Image(imageCount, _imgHash, _description, 0, payable(msg.sender));

        // Trigger an event
        emit ImageCreated(imageCount, _imgHash, _description, 0, payable(msg.sender));
    }

    // Tip Images
    function tipImageOwner(uint _id)public payable {
        // Make sure the id is valid
        require(_id > 0 && _id <= imageCount);
        
        // Fetch the Image
        Image memory _image = images[_id];

        // Fetch the auther
         address payable _author = _image.author;

        // Pay the author by sending them ether
        payable (address(_author)).transfer(msg.value);

        // Increment the tips amount
        _image.tipAmount = _image.tipAmount + msg.value;

        // upload the image
        images[_id] = _image;

        // Tipped an event
        emit ImageTipped(_id, _image.hash, _image.description, _image.tipAmount, _image.author);
    }

    
}