import { ChangeEvent, useEffect, useState } from 'react';
import styles from './exchange.module.css';
import { BsSearch } from 'react-icons/bs';
import { LuSearchX } from 'react-icons/lu';


interface Exchange {
    exchangeId: string;
    name: string;
    exchangeUrl: string;
}

export function Exchange(){

    const [exchange, setExchange] = useState<Exchange[]>([]);
    const [dataExchange, setDataExchange] = useState<Exchange[]>([]);

    const [input, setInput] = useState<string>("");
    const [offset, setOffset]=useState(0);
    const [noResults, setNoResults] = useState<boolean>(false);
  

    useEffect(() =>{

        if (input === "") {
            getData();
        }else {
            getData(input);
        }

        
     
    }, [offset, input])

  
    async function getData(query: string = "") {
        try {

            console.log(query, "query")

            let url = `https://api.coincap.io/v2/exchanges`;
            if (query) {
                url = `https://api.coincap.io/v2/exchanges`;
                
            }else{
                
                url += `?limit=5&offset=${offset}`;
            }

          

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            
            const data = await response.json();
            const exchangeData: Exchange[] = data.data;

            setExchange(exchangeData)
            setDataExchange(exchangeData)

            if(query === ""){
                if (offset === 0) {
                    
                    setExchange(exchangeData);
                    setDataExchange(exchangeData);
                } else {
                    //  incrementar a lista
                    const updatedList = [...exchange, ...exchangeData];
                    setExchange(updatedList);
                    setDataExchange(updatedList);
                }
                return
            }

             if(query !== ""){

                const filterExchange = exchangeData.filter((item) =>
                    item.name.toLowerCase().includes(query.toLowerCase())
                );
    
                setNoResults(filterExchange.length === 0);

                setExchange(filterExchange)

                
            }
            
            

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    function handleGetMore(){
        if(offset === 0){
            setOffset(5)
            return;
        }

        setOffset(offset + 5);
        
    }
    

    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if(inputValue === " "){
            setOffset(0)
            getData();
           
        }else{
            setInput(inputValue)
        
            console.log(inputValue)

            getData(inputValue)
        }

        
        

    };
   



    return(

        <main className={styles.container}>

        <div className={styles.titleContainer}>

        
                <h1 className={styles.tituloPage}>
                    <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.875 1C7.875 0.447715 8.32272 0 8.875 0H13.4375C13.9898 0 14.4375 0.447715 14.4375 1V21H7.875V1Z" fill="#1480FC"/>
                        <path d="M15.75 6.25C15.75 5.69772 16.1977 5.25 16.75 5.25H21.3125C21.8648 5.25 22.3125 5.69772 22.3125 6.25V21H15.75V6.25Z" fill="#1480FC"/>
                        <path d="M0 10.1875C0 9.63521 0.447715 9.1875 1 9.1875H5.5625C6.11478 9.1875 6.5625 9.63522 6.5625 10.1875V21H0V10.1875Z" fill="#1480FC"/>
                    </svg>

                        Exchange
                </h1>


                <form className={styles.form} >
                    <input 
                        type="text"
                        placeholder='Buscar... '
                        
                        value={input}
                        onChange={handleInputChange}
                    
                    />

                    <div className={styles.iconSearch}>
                        <BsSearch size={20} color='grey' />
                    </div>
                </form>

          </div>


         
         {noResults ? <div className={styles.resultadoTxt}><LuSearchX  size={100} color='#1480FC' /><h2>Nenhum resultado foi encontrado.</h2></div> : <div>
        
          <table className={styles.tableExchange}>
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Site</th>
                    </tr>
                </thead>
                <tbody id='tbody'>

                    {exchange.length > 0 && exchange.map((item)=>(  
                        <tr className={styles.tr} key={item.exchangeId}>
                             <td className={styles.tdLabel} >
                                {item.name}
                                
                             </td>
 
                            <td className={styles.tdLabel} >
                                <a href={`${item.exchangeUrl}`} target="_blank" rel="noopener noreferrer">
                                    Acessar
                                </a>
                            </td>

                        </tr>


                    ))}
                   
                   



        
                </tbody>
            </table>

            <button className={styles.buttonMore} onClick={handleGetMore}>
                Carregar mais
            </button>
           

             </div>
            }
        </main>

        
    )
}