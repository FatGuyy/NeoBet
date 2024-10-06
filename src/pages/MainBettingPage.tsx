import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { User, Wallet } from "lucide-react"
import { Link } from 'react-router-dom';
import abi from '../TicketLotteryAbi.json'; // Importing the contract JSON file
import Web3 from "web3"; 

declare global {
  interface Window {
    ethereum: any; // or you can specify the correct type if you want
  }
}
type Player = {
  name: string;
  tickets: number;
}

  export default function MainBettingPage() {
    const [players, setPlayers] = useState<Player[]>([
      { name: "Alice", tickets: 3 },
      { name: "Bob", tickets: 5 },
      { name: "Charlie", tickets: 2 },
    ])

    const totalTickets = players.reduce((sum, player) => sum + player.tickets, 0)

    const [betTickets, setBetTickets] = useState('');

    const [walletAddress, setWalletAddress] = useState<string | null>(null); // State to store the wallet address
    const addr ="0x6e30A9601D66f6ae8828253a3014190cF53e1e0F"

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
  const placeBet = async () => {
    try {
        if (!walletAddress) {
            console.error('No wallet address connected');
            return;
        }

        console.log("Place bet function");
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        
        // Initialize the contract with ABI and address
        const contract = new web3.eth.Contract(abi, addr);

        // Convert tickets from input to integer
        const ticketCount = parseInt(betTickets);
        if (isNaN(ticketCount) || ticketCount < 1 || ticketCount > 10) { // Ensure it's within min and max
            console.error("Invalid ticket count");
            return;
        }

        // Get the current gas price
        const gasPrice = await web3.eth.getGasPrice();
        
        // Call the buyTickets method on the contract
        const transaction = await contract.methods.buyTickets(ticketCount).send({
            from: walletAddress, 
            gasPrice: gasPrice.toString(), 
        });

        console.log(`Bet placed with ${ticketCount} tickets`, transaction);

        // Add the user to the players list
        setPlayers((prevPlayers) => [
            ...prevPlayers,
            { name: "You", tickets: ticketCount } // Add the current user
        ]);

        // Reset betTickets to empty string after placing the bet
        setBetTickets('');
        
    } catch (error: any) {
        console.error('Error placing bet', error.message);
    }
};



  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-gray-100">
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="bg-[#121212] text-gray-100">
                <CardHeader>
                  <CardTitle>User Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <User className="h-6 w-6" />
                    <span>John Doe</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Wallet className="h-6 w-6" />
                    <span className="text-sm">0x1234...5678</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#121212] text-gray-100">
                <CardHeader>
                  <CardTitle>Betting History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Wins:</span>
                    <span className="font-bold text-green-400">6</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Losses:</span>
                    <span className="font-bold text-red-400">4</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-4">
                    <span>Total Earnings:</span>
                    <span className="font-bold">$1,200</span>
                  </div>
                </CardContent>
              </Card>
              <Button 
              className="bg-black h-[60px] text-white text-xl" 
              size="lg"
              onClick={connectMetamask} // Attach the event to the button
            >
              {walletAddress ? `Wallet address : ${walletAddress.slice(0, 4)}...${walletAddress.slice(38,42)}` : "Connect Wallet"} {/* Display wallet address if connected */}
        </Button>
            </div>
            <div className="space-y-6">
              <Card className="bg-[#121212] text-gray-100">
                <CardHeader>
                  <CardTitle>Current Bet</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="players">Current Players</Label>
                    <div className="bg-gray-700 p-4 rounded-md space-y-2">
                      {players.map((player, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{player.name}</span>
                          <span>{player.tickets} tickets</span>
                        </div>
                      ))}
                      <div className="flex justify-between border-t border-gray-600 pt-2 mt-2">
                        <span>Total Tickets:</span>
                        <span>{totalTickets}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="tickets">Your Tickets</Label>
                    <div className="flex justify-between admin-actions mt-[40px] mb-6 ">
                        <input type="number" className="border rounded cursor-auto flex items-center justify-center border-white bg-slate-800 text-white text-xl text-center" value={betTickets} onChange={(e) => setBetTickets(e.target.value)} />
                        <button onClick={placeBet} className="btn bg-green-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                            Place Bet
                        </button>
                    </div>
                    </div>

                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#121212]">
        <p className="text-xs text-gray-400">© 2024 Crypto Bet. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-gray-300" to="/">
            Terms of Service
          </Link>
          <Link className="text-xs hover:text-gray-300" to="/">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}