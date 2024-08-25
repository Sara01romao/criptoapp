import React, { FormEvent, useEffect, useState } from 'react';
import styles from './exchange.module.css';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';


interface Exchange {
    exchangeId: string;
    name: string;
    exchangeUrl: string;
}

export function Exchange(){

    const [exchange, setExchange] = useState<Exchange[]>([]);
    const [input, setInput] = useState("");
    const [offset, setOffset]=useState(0);

    useEffect(() =>{

        getData()
     
    }, [offset])

  
    async function getData() {
        try {
            const response = await fetch(`https://api.coincap.io/v2/exchanges?limit=5&offset=${offset}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const exchangeData: Exchange[] = data.data;
            console.log(exchangeData);

            const formatedResult = exchangeData.map((item) =>{
                const formated ={
                    ...item,
                }

                return formated
            })


            const listExchange=[...exchange, ...formatedResult];
            setExchange(listExchange);

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    function handleGetMore(){
        if(offset === 0){
            setOffset(10)
            return;
        }

        setOffset(offset + 10)

        
            
        
    }


    function handleSubmit(e:FormEvent){

        e.preventDefault();

        if(input === "") return;

        const filtered = exchange.filter((item) =>
            item.name.toLowerCase().includes(input.toLowerCase())
        );

        setExchange(filtered);
        
       

        console.log(input);
    }



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


                <form className={styles.form} onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder='Buscar... '
                        
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    
                    />

                    <button type='submit'>
                        <BsSearch size={20} color='grey' />
                    </button>
                </form>

          </div>




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

        </main>

        
    )
}