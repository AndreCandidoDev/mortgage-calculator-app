import styles from "./styles.module.scss"
import Image from "next/image"

export const ResultComponent: React.FC = () =>
{
    return (
        <div className={styles.resultComponent}>
            <div className={styles.content}>
                <Image
                    priority    
                    src={"svg/illustration-empty.svg"}
                    height={150}
                    width={150}
                    alt=""
                />
                <p className={styles.title}>Results shown here</p>
                <p className={styles.text}>Complete the form and click &quot;Calculate Repayments&quot; to see what your monthly repayments would be.</p>
            </div>
        </div>
    )
}