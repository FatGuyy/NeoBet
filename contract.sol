// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketLottery is Ownable {
    IERC20 public tCoreToken; // tCore token reference

    // Struct to store player information
    struct Player {
        address playerAddress;
        uint256 tickets;
        uint256 startTicketId;
    }

    Player[] public players;
    uint256 public totalTickets;
    bool public isBetOpen;

    event TicketsPurchased(address indexed buyer, uint256 ticketCount);
    event BetClosed(uint256 winnerTicketId, address winner);

    // Constructor to initialize tCore token address and set betting to open
    constructor(address _tCoreToken) Ownable(msg.sender) {  
        tCoreToken = IERC20(_tCoreToken); 
        isBetOpen = true; // Betting is open by default
    }

    // Payable function to buy tickets with Ether
    function buyTickets(uint256 _ticketCount) external payable {
        require(isBetOpen, "Betting is closed");
        require(_ticketCount > 0, "Must buy at least one ticket");
        require(tCoreToken.balanceOf(msg.sender) >= 100 * (10 ** 18), "Insufficient tCore tokens");
        require(msg.value >= 0.01 ether * _ticketCount, "Insufficient Ether sent for tickets");

        // Transfer tCore tokens from the buyer to the contract
        tCoreToken.transferFrom(msg.sender, address(this), 100 * (10 ** 18)); // Transfer 100 tCore tokens per transaction

        // Update player information
        uint256 startTicketId = totalTickets + 1;
        players.push(Player(msg.sender, _ticketCount, startTicketId));
        totalTickets += _ticketCount;

        emit TicketsPurchased(msg.sender, _ticketCount);
    }

    // Function to close betting and select a winner
    function closeBet() external onlyOwner {
        require(isBetOpen, "Betting is already closed");
        require(totalTickets > 0, "No tickets sold");

        isBetOpen = false; // Close betting

        // Generate a random winner
        uint256 winningTicketId = random() % totalTickets + 1; // Random number between 1 and totalTickets

        // Determine the winner based on ticket ID
        address winner;
        uint256 ticketCount = 0;
        for (uint256 i = 0; i < players.length; i++) {
            ticketCount += players[i].tickets;
            if (winningTicketId <= ticketCount) {
                winner = players[i].playerAddress;
                break;
            }
        }

        // Transfer all tCore tokens in the contract to the winner
        uint256 prizeAmount = tCoreToken.balanceOf(address(this));
        tCoreToken.transfer(winner, prizeAmount);

        emit BetClosed(winningTicketId, winner);
    }

    // Function to generate a random number (pseudo-random for demonstration)
    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, totalTickets)));
    }

    // Function to check if betting is open
    function isBettingOpen() external view returns (bool) {
        return isBetOpen;
    }

    // Function to get player details
    function getPlayers() external view returns (Player[] memory) {
        return players;
    }
}
