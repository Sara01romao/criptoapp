
import { BsSearch } from 'react-icons/bs';
import styles from './home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';

export interface CoinProps{
  id:string;
  name:string;
  symbol:string;
  priceUsd:string;
  vwap24Hr:string;
  changePercent24Hr:string;
  rank:string;
  supply:string;
  maxSupply:string;
  marketCapUsd:string;
  volumeUsd24Hr:string;
  exploder:string;
  formatedPrice?:string;
  formatedMarket?:string;
  formatedVolume?:string;

}

interface DataProp{
    data:CoinProps[];
}

export function Home(){
   
    const [input, setInput] = useState("");
    const [coins, setCoins] = useState<CoinProps[]>([]);
    const [offset, setOffset]=useState(0);
    
    const navigate = useNavigate();

    useEffect(() =>{
        getData()
    }, [offset])

    async function getData(){
        fetch(`https://api.coincap.io/v2/assets?limit=5&offset=${offset}`)
        .then(response => response.json())
        .then((data: DataProp)=>{
            const coinsData = data.data;


            //form para dolar
            const price= Intl.NumberFormat("en-US",{
                style:"currency",
                currency:"USD"
            })

            //formatação compacta numeros grandes
            const priceCompact = Intl.NumberFormat("en-US",{
                style:"currency",
                currency:"USD",
                notation:"compact"
            })


           
            const formatedResult = coinsData.map((item) =>{
                const formated ={
                    ...item,
                    formatedPrice: price.format(Number(item.priceUsd)),
                    formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
                    formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr)),
                }

                return formated
            })

          

            const listCoins=[...coins, ...formatedResult];

            setCoins(listCoins);
        })
    }


    //submit form
    function handleSubmit(e:FormEvent){

        e.preventDefault();
        
        if(input === "") return;

        navigate(`/detail/${input.toLowerCase()}`);
    }

    function handleGetMore(){
        if(offset === 0){
            setOffset(10)
            return;
        }
          
        setOffset(offset + 10)
            
        
    }


    return(
        <main className={styles.container}>
         <div className={styles.titleContainer}>

         
                <h1 className={styles.tituloPage}>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 19.79V21.875C0 23.5986 4.19922 25 9.375 25C14.5508 25 18.75 23.5986 18.75 21.875V19.79C16.7334 21.2109 13.0469 21.875 9.375 21.875C5.70313 21.875 2.0166 21.2109 0 19.79ZM15.625 6.25C20.8008 6.25 25 4.84863 25 3.125C25 1.40137 20.8008 0 15.625 0C10.4492 0 6.25 1.40137 6.25 3.125C6.25 4.84863 10.4492 6.25 15.625 6.25ZM0 14.668V17.1875C0 18.9111 4.19922 20.3125 9.375 20.3125C14.5508 20.3125 18.75 18.9111 18.75 17.1875V14.668C16.7334 16.3281 13.042 17.1875 9.375 17.1875C5.70801 17.1875 2.0166 16.3281 0 14.668ZM20.3125 15.2051C23.1104 14.6631 25 13.6572 25 12.5V10.415C23.8672 11.2158 22.2021 11.7627 20.3125 12.0996V15.2051ZM9.375 7.8125C4.19922 7.8125 0 9.56055 0 11.7188C0 13.877 4.19922 15.625 9.375 15.625C14.5508 15.625 18.75 13.877 18.75 11.7188C18.75 9.56055 14.5508 7.8125 9.375 7.8125ZM20.083 10.5615C23.0127 10.0342 25 8.99902 25 7.8125V5.72754C23.2666 6.95313 20.2881 7.6123 17.1533 7.76855C18.5937 8.4668 19.6533 9.4043 20.083 10.5615Z" fill="#FCCE14"/>
                    </svg>

                    Criptos
                </h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder='Buscar... '
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    
                    />

                    <button type='submit'>
                        <BsSearch size={20} color='#fff' />
                    </button>
                </form>

            </div>

            <table>
                <thead>
                    <tr>
                        <th scope="col">Moeda</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Valor Mecardo</th>
                        <th scope="col">Volume</th>
                        <th scope="col">Mudança</th>
                    </tr>
                </thead>
                <tbody id='tbody'>
                   
                   {coins.length > 0 && coins.map((item)=>(
                         <tr className={styles.tr} key={item.id}>
                        
                         <td className={styles.tdLabel} data-label="Moeda">
                            <div className={styles.name}>
                                <img className={styles.logo} src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`} alt="Logo cripto" />
                                 <Link to={`/detail/${item.id}`}>
                                     <span> {item.name}</span> | {item.symbol}
                                 </Link>
                            </div>
                            
                         </td>

                         <td className={styles.tdLabel} data-label="Preço">
                            {item.formatedPrice}
                            
                         </td>
 
                         <td className={styles.tdLabel} data-label="Valor Mercado">
                            {item.formatedMarket}
                            
                         </td>
 
                         <td className={styles.tdLabel} data-label="Volume">
                            {item.formatedVolume}
                            
                         </td>
 
                         <td className={Number(item.changePercent24Hr)>0? styles.tdProfit:styles.tdLoss} data-label="Mudança 24h">
                            <span>{Number(item.changePercent24Hr).toFixed(2)}</span>
                            
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