async function validateWord(word:string){
	try{
		const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`);
		const data = await response.json();
		return Array.isArray(data);
	} catch (error){
		return false;
	}
}

export {
	validateWord
}