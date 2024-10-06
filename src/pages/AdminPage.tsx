import { useState } from "react";
// import { ethers } from "ethers";
import abi from '../TicketLotteryAbi.json'; // Importing the contract JSON file
import Web3 from "web3"; 
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    ethereum: any; // or you can specify the correct type if you want
  }
}

const AdminPage = () => {
//   const [players, setPlayers] = useState<any[]>([]);
//   const [ownerAddress, setOwnerAddress] = useState<string>("");

    const [betTickets, setBetTickets] = useState('');

    const [walletAddress, setWalletAddress] = useState<string | null>(null); // State to store the wallet address
    const addr = "0x3E2410Ccea96a78202df38Bc04e92297135079f2"

  const connectMetamask = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      setWalletAddress(account); // Set the wallet address in state
      console.log(account);
    } catch (error: any) {
      console.error('Error connecting to MetaMask', error.message);
    }
  };


  const getOwner = async () => {
    try {
        console.log("get owner Function");
        
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const contract = new web3.eth.Contract(abi, addr); // Initialize the contract
        const owner = await contract.methods.owner(); // Fetch the owner address
        console.log(owner);
        
        console.log(`Owner is ${owner}`);    
    
    } catch (error:any) {
        console.error('Error depositing tokenst', error.message);
    
    }};


    const getPlayers = async () => {
    try {
        console.log("get players Function");
        
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const contract = new web3.eth.Contract(abi, addr); // Initialize the contract
        const players = await contract.methods.getPlayers(); // Fetch the owner address
        console.log(players);
        
        console.log(`players are ${players}`);    
    
    } catch (error:any) {
        console.error('Error depositing tokenst', error.message);
    
    }
        
    }

    const closeBet = () => {
        console.log("Close bet function");
        
    }

    const placeBet = async () => {
        try{
            console.log("Place bet function");
            console.log("Bet amount:", betTickets); 
        }catch{
            console.log("errorrrrrrr");
            
        }
        
    }


  // Close bet function
  return (
    <>
        <h1 className="text-2xl font-bold text-black mb-4">Admin</h1>

        <Button 
              className="bg-black h-[60px] text-white text-xl" 
              size="lg"
              onClick={connectMetamask} // Attach the event to the button
            >
              {walletAddress ? `Wallet address : ${walletAddress.slice(0, 4)}...${walletAddress.slice(38,42)}` : "Connect Wallet"} {/* Display wallet address if connected */}
        </Button>

        <div className="admin-actions space-y-4 mb-6">
            <button onClick={closeBet} className="btn bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                Close Bet
            </button>
            <button onClick={getPlayers} className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Get Players
            </button>
            <button onClick={getOwner} className="btn bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                Get Owner
            </button>

            <input type="number" className="border border-[#121212] bg-slate-400 text-black" value={betTickets}  onChange={(e) => setBetTickets(e.target.value)} />
            <button onClick={placeBet} className="btn bg-green-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                Place Bet
            </button>
            </div>

            {/* Display players */}
            <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Players:</h2>
            {/* <ul className="list-disc pl-6">
                {players.map((player, index) => (
                <li key={index} className="mb-2">
                    <span className="font-medium">Address:</span> {player.playerAddress}, 
                    <span className="font-medium"> Tickets:</span> {player.tickets}, 
                    <span className="font-medium"> Start Ticket ID:</span> {player.startTicketId}
                </li>
                ))}
            </ul> */}
        </div>

        {/* Display owner */}
        <div>
        <h2 className="text-xl font-semibold mb-2">Owner: </h2>
        </div>

    </>
  );
};

export default AdminPage;
