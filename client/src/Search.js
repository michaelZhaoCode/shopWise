import amazon from "./assets/amazon_logo.svg"
import searchicon from "./assets/search_icon.svg"
import Lottie from "lottie-react"
import cartAnimation from "./assets/cart-animation.json"

const Search = () => {
    return (
        <div className="text-white h-screen flex items-center justify-center bg-zinc-900 p-12">
        <div className="h-full w-full items-center justify-center bg-[#D5A13D] rounded-3xl flex flex-col">
          <div className="w-[250px] h-[250px]">
            <Lottie animationData={cartAnimation} className="w-fit h-fit -translate-y-48"/>
          </div>
          <h1 className="text-7xl font-semibold">ShopWise</h1>
          <h2 className="whitespace-normal max-w-lg mt-12 text-lg">Start your search by querying a product name below</h2>
          
          <div className="bg-white rounded-full min-w-96 mt-12 flex flex-row">
            <img src={amazon} className="pl-3"/>
            <input className="rounded-full p-2 w-96 text-black outline-none" placeholder="Enter a product" />
            <button className="hover:scale-125 duration-500"><img src={searchicon} className="pr-2"/></button>
          </div>
        </div>
      </div>
    )
}

export default Search;