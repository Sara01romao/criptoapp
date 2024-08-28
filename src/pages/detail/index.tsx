
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from './detail.module.css';

//importa tipagem da moeda na home
import {CoinProps} from '../home';
import { BsArrowLeftCircleFill } from 'react-icons/bs';

interface ResponseData{
   data:CoinProps;
}

interface ErrorData{
   error:string;
}

type DataProp = ResponseData | ErrorData;

export function Detail(){
   const {cripto} = useParams();
   const navigate = useNavigate();

   const [coin, setCoin] = useState<CoinProps>();
   const [loading, setLoading] = useState(true);


   // useEffect(() => {
      
   // },[])

   useEffect(() => {
      async function getCoin() {
         try {
            fetch(`https://api.coincap.io/v2/assets/${cripto}`)
            .then(response => response.json())
            .then((data:DataProp)=>{
               
               if("error" in data){
                  navigate("/");
                  return;
               }
               
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

               const resultData = {
                  ...data.data,
                  formatedPrice: price.format(Number(data.data.priceUsd)),
                  formatedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
                  formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr)),
               }

               setCoin(resultData)
               setLoading(false)

            })
           
            
         } catch (error) {
            console.log(error)
            navigate("/")
         }
      }

      getCoin()
   },[])


   if(loading || !coin){
      return(
         <div className={styles.container}>
            <h4 className={styles.center}>Carregando Detalhes...</h4>
         </div>
      )
   }

   return(
     
      <div className={styles.container}>
          <Link to="/" className={styles.linkBack}><BsArrowLeftCircleFill size={30} color='#1480FC' />  Voltar</Link>
         <section className={styles.content}>

           
            <div className={styles.headerDetail}>
               <img 
                  src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`}
                  alt="Cripto Logo" 
                  className={styles.logo}
               />
              
              <h1>{coin?.name} | {coin?.symbol}</h1>

            </div>
           

            
            <p><strong>Preço: </strong>{coin?.formatedPrice}</p>

            <a href="">
               <strong>Mercado: </strong>{coin?.formatedMarket}
            </a>


            <a href="">
               <strong>Volume: </strong>{coin?.formatedVolume}
            </a>

            <a href="">
               <strong>Mudança 24h: </strong><span className={Number(coin?.changePercent24Hr) > 0 ? styles.profit:styles.loss}>{Number(coin?.changePercent24Hr).toFixed(3)}</span>
            </a>
         </section>
      </div>
      
     
   )


}