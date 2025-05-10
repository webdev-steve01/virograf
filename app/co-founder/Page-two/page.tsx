import styles from "./page.module.css"

const page = () => {
    return (
        <div className={styles.head}> 
            <div className={styles.formContainer}>
            <h1 className={styles.h1}>Co-founder Preferences</h1>

            <label className={styles.label} htmlFor="cofounder-type">Are you looking for a technical or business-oriented co-founder?</label>
            <select className={styles.select} id="cofounder-type">
                <option value="">Select one</option>
                <option value="technical">Technical (e.g., Developer, Engineer)</option>
                <option value="business">Business/Operations (e.g., CEO, Project Manager)</option>
                <option value="creative">Creative (e.g., UI/UX Designer, Marketing)</option>
            </select>

            <label className={styles.label} htmlFor="responsibilities">What areas would you like your co-founder to take responsibility for?</label>
            <select className={styles.select} id="responsibilities" >
                <option value="">Select one</option>
                <option value="product">Product development</option>
                <option value="marketing">Marketing & sales</option>
                <option value="fundraising">Fundraising & investor relations</option>
                <option value="strategy">Strategy & business development</option>
                <option value="other">Other</option>
            </select>

            <label className={styles.label} htmlFor="industry">What industry is your startup in?</label>
            <select className={styles.select} id="industry">
                <option value="">Select one</option>
                <option value="ai">Artificial Intelligence (AI)</option>
                <option value="biotech">Biotech</option>
                <option value="edtech">Ed-Tech</option>
                <option value="fintech">Fintech</option>
                <option value="other">Other</option>
            </select>

            <label className={styles.label} htmlFor="work-arrangement">What is your preferred working arrangement?</label>
            <select className={styles.select} id="work-arrangement">
                <option value="">Select one</option>
                <option value="hybrid">Hybrid (mix of remote and physical)</option>
                <option value="virtual">Fully virtual</option>
                <option value="physical">Fully physical</option>
            </select>

            <label className={styles.label} htmlFor="commitment-level">What is your commitment level?</label>
            <select className={styles.select} id="commitment-level">
                <option value="">Select one</option>
                <option value="full-time">Available full-time (24/7 commitment)</option>
                <option value="part-time">Available for a certain number of days per week</option>
                <option value="dedicated">Fully committed, no other job</option>
            </select>

            <label className={styles.label} htmlFor="tech-skills">What tech skills (if any) do you require from your co-founder?</label>
            <select className={styles.select} id="tech-skills">
                <option value="">Select one</option>
                <option value="ai">Artificial Intelligence (AI)</option>
                <option value="cloud">Cloud computing</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="data">Data Analysis</option>
                <option value="other">Other</option>
            </select>

            <label className={styles.label} htmlFor="idea-status">Do you prefer a co-founder who already has an idea, or are you open to brainstorming together?</label>
            <select className={styles.select} id="idea-status">
                <option value="">Select one</option>
                <option value="has-idea">I want a co-founder who already has an idea</option>
                <option value="brainstorm">I prefer brainstorming an idea together</option>
                <option value="my-idea">I already have an idea</option>
            </select>

            <label className={styles.label} htmlFor="financial-status">What is your current financial situation and level of financial commitment to the startup?</label>
            <select className={styles.select} id="financial-status">
                <option value="">Select one</option>
                <option value="can-invest">I can financially invest in the startup</option>
                <option value="no-invest">I cannot invest financially but can contribute skills and time</option>
                <option value="expect-invest">I expect my co-founder to invest financially</option>
                <option value="open">I am open to discussing financial contributions</option>
            </select>

            <label className={styles.label} htmlFor="equity-plan">How do you plan to share equity with your co-founder?</label>
            <select className={styles.select} id="equity-plan">
                <option value="">Select one</option>
                <option value="equal">Equal split (50/50)</option>
                <option value="based-on-contribution">Based on contributions (time, skills, investment, etc.)</option>
                <option value="undecided">Undecided, open to discussion</option>
            </select>
            <button className={styles.greenbutton}>Next</button>
        </div>
        </div>
    )
}

export default page