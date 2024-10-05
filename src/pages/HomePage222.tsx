import { Link } from 'react-router-dom';
import { GlareCard } from "../components/ui/glare-card";


const HomePage = () => {
    return (
      <>
        <div className="flex flex-col justify-center items-center px-16 py-20 mt-0 w-full text-white min-h-screen bg-slate-900 bg-cover" >
        <div className="w-full flex items-center justify-center">
            <div className='relative w-full items-center justify-center col' >

                <div className="bg-slate-950 flex flex-col h-[300px] items-start justify-start rounded-t-3xl" >
                    <h1 className=' text-[60px] pt-10 pl-10'>
                        Excitement of cricket betting. 
                    </h1>
                </div>
                <div className='bg-slate-800 skew-y-[170deg] h-[100px] w-full absolute flex justify-center items-center'>
                    <h1 className='text-[50px] text-yellow-500 '>
                    <GlareCard className="flex flex-col items-center justify-center">
                    
                    <p className="text-white font-bold text-xl mt-4">Aceternity</p>
                    </GlareCard>
                        
                        <Link to='bet-page'>
                            PLAY NOW 
                        </Link>
                    </h1>
                </div>
                <div className="bg-slate-950 flex flex-col h-[365px] items-end justify-end rounded-b-3xl" >
                    <h1 className=' text-[60px] pb-10 pr-10'>
                        Earn crypto rewards.
                    </h1>
                </div>
            </div>
        </div>

        <div className='bg-[#444444] min-h-40 min-w-40 grid grid-cols-2'>
  <div className='bg-[#662222] min-h-20 min-w-40 col-start-1 row-start-1'> {/* Column 1, Row 1 */} </div>
  <div className='bg-[#664422] min-h-20 min-w-40 col-start-2 row-start-2'> {/* Column 2, Row 2 */} </div>
  <div className='bg-[#664422] min-h-20 min-w-40 col-start-1 row-start-3'> {/* Column 1, Row 3 */} </div>
  <div className='bg-[#662222] min-h-20 min-w-40 col-start-2 row-start-4'> {/* Column 2, Row 3 */} </div>
</div>


        </div>      </>
    )
  }
  
export default HomePage
  