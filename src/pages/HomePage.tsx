import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, Lock, Wallet } from "lucide-react"
import { Link } from 'react-router-dom';
import { Boxes } from "../components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Web3 from "web3"; // Ensure Web3 is imported


declare global {
  interface Window {
    ethereum: any; // or you can specify the correct type if you want
  }
}
export default function HomePage2() {

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
    <div className="flex flex-col z-0 min-h-screen justify-center items-center bg-[#121212] text-gray-100 overflow-visible">
      <main className="flex-1 ">
    

        <section className="w-full py-12 md:py-24 ">{/* Add bg image */}
          <div className="">
          
                
                <div className="h-96 relative w-full overflow-hidden bg-[#121212] flex flex-col items-center justify-center rounded-lg">
                <div className="absolute inset-0 w-full h-full bg-[#121212] z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            
                <Boxes />
                <h1 className={cn("text-6xl font-bold text-white relative z-20")}>
                Welcome to Crypto Bet
                </h1>
                <p className="text-center mt-2 text-neutral-300 relative z-20">
                The future of betting is here. Secure, transparent, and decentralized betting powered by blockchain
                technology.
                </p>
                </div>                  
          
          </div>
        </section>
        
        <section className="w-full pb-[170px] pt-[10px] z-10">
            <Link to='bet-page'>
                <div className='bg-[#81B562] skew-y-[170deg]  w-full  flex justify-center items-center '>
                            <h1 className='text-[50px] text-[#147410] '>
                                    PLAY NOW 
                            </h1>
                        </div>
            </Link>
        </section>
        
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#121212] text-gray-100 rounded-xl">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 items-center">
              <div className="flex flex-col justify-center space-y-8 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Crypto Bet?</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto">
                    Experience the advantages of blockchain-powered betting
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
                <Card className="bg-gray-700 text-gray-100">
                  <CardHeader>
                    <Wallet className="h-10 w-10 mb-2" />
                    <CardTitle>Secure Transactions</CardTitle>
                    <CardDescription>Your funds are protected by blockchain technology</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-gray-700 text-gray-100">
                  <CardHeader>
                    <Lock className="h-10 w-10 mb-2" />
                    <CardTitle>Transparent Betting</CardTitle>
                    <CardDescription>All bets are recorded on the blockchain for full transparency</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-gray-700 text-gray-100">
                  <CardHeader>
                    <Coins className="h-10 w-10 mb-2" />
                    <CardTitle>Instant Payouts</CardTitle>
                    <CardDescription>Receive your winnings instantly in your crypto wallet</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Start Betting?</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of users who are already enjoying secure and transparent betting with Crypto Bet.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
              <Button 
              className="bg-[#441166] h-[60px] text-white text-xl" 
              size="lg"
              onClick={connectMetamask} // Attach the event to the button
            >
              {walletAddress ? `Wallet address : ${walletAddress.slice(0, 4)}...${walletAddress.slice(38,42)}` : "Connect Wallet"} {/* Display wallet address if connected */}
            </Button>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
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
  )
}