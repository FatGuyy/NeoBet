import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Link } from 'react-router-dom';
import Globe from "../components/ui/globe";
import { useState } from "react";
import Web3 from "web3"; // Ensure Web3 is imported


declare global {
  interface Window {
    ethereum: any; // or you can specify the correct type if you want
  }
}

export default function BetPage() {
      
  const [walletAddress, setWalletAddress] = useState<string | null>(null); // State to store the wallet address

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



  return (
    <div className="flex flex-col min-h-screen  bg-[#121212] text-gray-100">
      <main className="flex-1 py-12">
        <div className="px-10">
          <div className="flex justify-between px-10 items-stretch">

          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-8 text-center">
            Choose Your Bet
          </h1>
            <Button 
              className="bg-black h-[60px] text-white text-xl" 
              size="lg"
              onClick={connectMetamask} // Attach the event to the button
            >
              {walletAddress ? `Wallet address : ${walletAddress.slice(0, 4)}...${walletAddress.slice(38,42)}` : "Connect Wallet"} {/* Display wallet address if connected */}
            </Button>
          </div>
          <div className="grid md:grid-cols-3 lg:gap-12 items-start">
            {[100, 500, 1000].map((amount) => (
              <Card key={amount} className="w-full bg-[#121212] text-gray-100 pt-5">
                <CardContent>
                  <p className="text-2xl font-bold">${amount}</p>
                  <p className="text-sm text-gray-500">Potential winnings: ${amount * 2}</p>
                </CardContent>
                <CardFooter>
                  <Link to="mainBetting">
                  
                    <Button className="w-full">
                      Place ${amount} Bet
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className=" pt-10 ">
              <Card className=" grid grid-cols-2 divide-x items-center justify-center w-full bg-[#121212] text-gray-100">
                    <Globe/>
                  <div>
                  <p className="flex flex-col items-center justify-center text-2xl font-bold p-6"> Description </p>
                  <hr className="w-full" />
                <CardContent>
                  <p className=" flex flex-col items-center justify-center text-center text-lg pt-6 text-white">
                    Here you can buy up to 10 tickets of the amounts ranging from 100 , 500 and 1000.
                    <br />
                    <br />
                    If you buy 6 tickets ans ttal tickets pool is 30 , your chance at winning the lottery is 6/30 which will be much higher then if you buy only one ticjet , which will make the chances only 1/30.
                    <br />
                    <br />
                    If the ticket pool is 30 tickets then the total winning pool is uptoo 30 times the ticket amount.
                    <br />
                    <br />
                    
                    <h1 className=" text-3xl font-bold ">
                      Max Potential winnings: $100,000
                    </h1>
                    
                  </p>
                </CardContent>
                  </div>
              </Card>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Crypto Bet. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="/">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="/">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
    // <div>
    //                       <Globe/>

    // </div>
  )
}