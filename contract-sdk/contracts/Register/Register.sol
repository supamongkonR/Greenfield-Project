// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "@bnb-chain/greenfield-contracts/contracts/interface/IERC721Nontransferable.sol";
import "@bnb-chain/greenfield-contracts/contracts/interface/IERC1155Nontransferable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "../ObjectApp.sol";

interface IERC1155Mintable {
    function mint(address to, uint256 id, uint256 amount, bytes memory data) external;
}

contract Register is AccessControl, ObjectApp {

    // Error code
    string public constant ERROR_INVALID_NAME = "4";
    string public constant ERROR_RESOURCE_EXISTED = "5";
    string public constant ERROR_INVALID_PRICE = "6";

    
    // ERC1155 token for on-sale fike
    address public fileToken;

    address public objectToken;

    // tokenId => file name
    mapping(uint256 => string) public fileName;
    // file name => tokenId
    mapping(string => uint256) public fileId;

    // fileId => price
    mapping(uint256 => uint256) public filePrice;

 /**
     * @dev Register object resource that mirrored from GreenField to BSC.
     */
    function registerFile(
        string calldata _fileName,
        uint256 _fileId
    ) external {
        require(
            IERC721NonTransferable(objectToken).ownerOf(_fileId) == msg.sender,
            string.concat("EbookShop: ", ERROR_INVALID_CALLER)
        );
        require(bytes(_fileName).length > 0, string.concat("EbookShop: ", ERROR_INVALID_NAME));
        require(fileId[_fileName] == 0, string.concat("EbookShop: ", ERROR_RESOURCE_EXISTED));

        fileName[_fileId] = _fileName;
        fileId[_fileName] = _fileId;

    
    }

       /**
     * @dev Provide an ebook's ID to publish it.
     *
     * An ERC1155 token will be minted to the owner.
     * Other users can buy the ebook by calling `file` function with given price.
     */
    function publishFile(uint256 _fileId, uint256 price) external {
        require(
            IERC721NonTransferable(objectToken).ownerOf(_fileId) == msg.sender,
            string.concat("EbookShop: ", ERROR_INVALID_CALLER)
        );
        require(price > 0, string.concat("EbookShop: ", ERROR_INVALID_PRICE));

        filePrice[_fileId] = price;
        IERC1155Mintable(fileToken).mint(msg.sender, _fileId, 1, "");
    }

}