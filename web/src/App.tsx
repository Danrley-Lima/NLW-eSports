import { MagnifyingGlassPlus } from "phosphor-react"
import logo from "./assets/logo.svg"
import CreateAdBanner from "./components/CreateAdBanner"
import { GameBanner } from "./components/GameBanner"
import "./styles/main.css"

function App() {
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="logo" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        <GameBanner bannerUrl="./image 1.png" title="League of Legends" adsCount={8} />
        <GameBanner bannerUrl="./image 2.png" title="Dota 2" adsCount={4} />
        <GameBanner bannerUrl="./image 3.png" title="CS:GO" adsCount={5} />
        <GameBanner bannerUrl="./image 4.png" title="World of Warcraft" adsCount={3} />
        <GameBanner bannerUrl="./image 5.png" title="Apex Legends" adsCount={2} />
        <GameBanner bannerUrl="./image 6.png" title="Fortnite" adsCount={5} />
      </div>

      <CreateAdBanner />

    </div>
  )
}


export default App
