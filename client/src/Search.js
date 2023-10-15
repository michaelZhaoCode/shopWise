import amazon from "./assets/amazon_logo.svg"
import searchicon from "./assets/search_icon.svg"
import Lottie from "lottie-react"
import cartAnimation from "./assets/cart-animation.json"
import { useAppContext } from "./Context"
import { useNavigate } from "react-router-dom"

const Search = () => {
  const { searchPrompt, setSearchPrompt } = useAppContext();
  const navigate = useNavigate();
  // {“product”: “frying pan”}
  const callAPI = async () => {
    try {
        const body = { "product": searchPrompt }; // convert to JSON since body needs to be in JSON format
        // const responses = [];
        const response = await fetch('http://127.0.0.1:5000/analyze/', {
            method: "POST",
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": '*',
                "Access-Control-Allow-Headers": '*',
                "Access-Control-Allow-Methods": 'GET, POST, PUT, DELETE'
            },
            body: JSON.stringify(body)
        });
        // console.log(await response.json())
        let resp = "";
        await response.json().then((data) => {
            console.log(data)
            // resp = data.response;
        })
        // setResponses((prevResponses) => [...prevResponses, resp]);


    } catch (error) {
        console.log(error);
    }

  };
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
            <input className="rounded-full p-2 w-96 text-black outline-none" placeholder="Enter a product" 
            onChange={(e) => {
              setSearchPrompt(e.target.value);
              console.log(searchPrompt);
            }}
            />
            <button className="hover:scale-125 duration-500" 
            onClick={() => {
              navigate('/summary')}
            }
            ><img src={searchicon} 
            onClick={callAPI}
            className="pr-2"/></button>
          </div>
        </div>
      </div>
    )
}

export default Search;