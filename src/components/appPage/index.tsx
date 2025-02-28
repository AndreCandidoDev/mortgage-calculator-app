import { MortgageForm } from "../mortgageForm"
import { ResultComponent } from "../resultComponent"
import styles from "./styles.module.scss"

export const AppPage = () =>
{
    return (
        <div className={styles.appPage}>
            <div className={styles.content}>
                <MortgageForm/>
                <ResultComponent/>
            </div>
        </div>
    )
}