'use client';
import styles from '../app/styles/styles.module.css'

export interface RepoData2 {
    data: Array<{
        name: string,
        url: string,
        description: string,
        owner: { 
            login: string, url: string
        },
        primaryLanguage: {
          name: string
        }
        stargazerCount: number
    }> | undefined,
};

export default function SaerchTable(props: RepoData2){
    
    return (
        <div className={styles.repWrap}>
                    {props.data?.map(post=>(
                        <article key={post.name}  className={styles.repDisplay}>
                            <div>
                                <h2>
                                    <a href={post.url}>
                                        {post.name}
                                    </a>
                                </h2>
                            </div>
                            <div>
                                <p>
                                    {post.description.substring(0, 250)} ...
                                </p>
                            </div>
                            <div><a href={post.owner.url} target="_blank"><strong>Uzivatel:</strong> <span>{post.owner.login}</span></a></div>
                            <div><strong>Pocet hvezd:</strong> {post.stargazerCount}</div>
                            <div><strong>Programovací jazyk:</strong> {post.primaryLanguage?.name}</div>
                        </article>
                    ))}
                </div>
    );
}