"use client"
import handleSubmit, { RepoData } from '../app/api/handleSubmit';
import SaerchTable, { RepoData2 } from '@/components/SearchTable';
import React from 'react';
import styles from '../app/styles/styles.module.css'

export default function SearchForm(){
    const [data, setData] = React.useState();

    const handleForm =async (event: any) => {
        // Zastaveni odeslani formulare
        event.preventDefault();
        
        // Ulozeni dat z formulare
        const data = {
            name: event.target.repName.value,
        };
        console.log("data form: ", data)
        // Prohledani github repositaru a ulozeni vysledku
        const result = await handleSubmit(data);
        setData(result);
    }
    return(<div>
        <form onSubmit={handleForm} className={styles.SearchForm}>
            <input type="text" name="repName" required minLength={3} placeholder='Type name of the Repository'></input>
            <button className={styles.GlowingBtn} type="submit">
                  <span className={styles.GlowingTxt}>S<span className={styles.FaultyLetter}>E</span>AR<span className={styles.FaultyLetter}>C</span>H</span>
            </button>
            <div className="test">
                <SaerchTable data={data}/>
            </div>
        </form>
    </div>)
}