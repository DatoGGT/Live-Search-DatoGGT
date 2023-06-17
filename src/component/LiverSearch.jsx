import '../App.css'
import {  useState } from "react";

const App = () => {
	const [user, setUser] = useState({
		write:"",
		result:[]
	});
	
	const [selectedDrink, setSelectedDrink] = useState(null);
	const handleInputChange  = async (event) => {
		const { name, value } = event.target;

		setUser((prevState) => ({
			...prevState,
			[name]: value,
			

		}));
		if(value===""){
			setUser({
				write: "",
				result: [],
			  });
			  return <div></div>
		}
		const wordfetch = await fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
		const data = await wordfetch.json()
		setUser({ 
			result:data.drinks
	})
		
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		
	};
	const showInstruction = (drink) => {
		
		if (selectedDrink === drink) {
			setSelectedDrink(null);
		} else {
		setSelectedDrink(drink);
		}
	};
    
	return (
		<div>
		<form onSubmit={handleSubmit}>
			<legend>LIVE SEARCH</legend>
			<input
				placeholder="Go  search"
				name="first_name"
				value={user.first_name}
				onChange={handleInputChange}
			/>
			
			
		</form>
		{
			user.write ==="" || user.result === null ? <div className='notfound'> Not Found</div>:
			user.result?.map(ele =>{
				const {strDrink,strDrinkThumb,strCategory,strInstructions}=ele
				return (
					<section  key={strDrink}>
						<div className='maindiv'>
							<div>
            <ul><li>Name : {strDrink}</li></ul> 
			
            <h2>{"Drink Category:"+" "+strCategory}</h2>
			 </div>
            <img className='images' src={strDrinkThumb}/>
			</div>
			<button onClick={() => showInstruction(strDrink)}>See Instruction</button>
            {selectedDrink === strDrink && <p>{strInstructions}</p>}
            </section>
            )
		} )
	}
		</div>
	);
};

export default App;