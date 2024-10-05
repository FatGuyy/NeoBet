import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { User, Wallet, Plus, Minus } from "lucide-react"
import { Link } from 'react-router-dom';

type Player = {
  name: string;
  tickets: number;
}

export default function MainBettingPage() {
  const [tickets, setTickets] = useState<number>(0)
  const [players, setPlayers] = useState<Player[]>([
    { name: "Alice", tickets: 3 },
    { name: "Bob", tickets: 5 },
    { name: "Charlie", tickets: 2 },
  ])

  const totalTickets = players.reduce((sum, player) => sum + player.tickets, 0)

  const handleAddTicket = () => {
    if (tickets < 10) {
      setTickets(tickets + 1)
    }
  }

  const handleRemoveTicket = () => {
    if (tickets > 0) {
      setTickets(tickets - 1)
    }
  }

  const handleGetTickets = () => {
    if (tickets > 0) {
      setPlayers([...players, { name: "You", tickets: tickets }])
      setTickets(0)
    }
  }

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
                  <div className="space-y-2">
                    <Label htmlFor="tickets">Your Tickets</Label>
                    <div className="flex items-center space-x-4">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handleRemoveTicket}
                        disabled={tickets === 0}
                      >
                        <Minus className="h-4 w-4 text-[#123412]" />
                      </Button>
                      <span className="text-2xl font-bold">{tickets}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handleAddTicket}
                        disabled={tickets === 10}
                      >
                        <Plus className="h-4 w-4 text-[#123412]" />
                      </Button>
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={handleGetTickets}
                    disabled={tickets === 0}
                  >
                    Get Tickets
                  </Button>
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