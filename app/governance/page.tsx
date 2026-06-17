import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TimelineAccordion from './TimelineAccordion'
import styles from './governance.module.css'

export default function GovernancePage() {
  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroCard}>
          <Navbar activePath="/governance" />
          <div className={styles.heroInner}>
            <h1>Corporate Governance & Disclosure</h1>
          </div>
        </div>
      </section>

      <section className={styles.disclosuresSection}>
        <div className={styles.contentContainer}>
          <div className={styles.tabWrapper}>
            <div className={styles.tab}>Disclosures</div>
          </div>
          
          <div className={styles.disclosureItem}>
            <div className={styles.itemTitle}>Legal Disclosure</div>
            <div className={styles.itemContent}>
              <p>
                SvaNiti Policy Research Centre is incorporated under the Companies Act, 2013, with the Corporate Identification Number (CIN): U80902GJ2021NPL125321. SvaNiti's registered office is located at:<br />
                Sindhi Market Road, Opp. Munse Plot, Old Telephone Exchange, Upleta, Rajkot - 360490, Gujarat, India
              </p>
              <p>
                We are a not-for-profit think tank engaged in public policy research, transformative education, and nation-building initiatives. All our work aligns with the objectives outlined in our Memorandum of Association (MoA) and complies with applicable legal frameworks.
              </p>
              <p>
                SvaNiti complies with all applicable Indian laws, including the Companies Act, 2013. As a Section 8 company, it operates on a not-for-profit basis—any surplus funds are reinvested into furthering the organisation's charitable objectives, with no distribution to members.
              </p>
              <p>
                We respect the privacy of all our participants, partners, and donors. Personal data is handled with confidentiality and used only for program-related purposes. We do not sell or share personal information with third parties, except when legally required. Mentions of external organizations, individuals, or partners do not indicate endorsement unless explicitly stated.
              </p>
            </div>
          </div>

          <div className={styles.disclosureItem}>
            <div className={styles.itemTitle}>Organization Administration Disclosure</div>
            <div className={styles.itemContent}>
              <p>
                SvaNiti Policy Research Centre is governed by a Board of Directors in compliance with the Companies Act, 2013 (Section 8).
              </p>
              <p>
                All activities, programs, and initiatives undertaken by SvaNiti strictly align with the objectives stated in its Memorandum of Association (MoA) and follow the governance principles outlined in the Articles of Association (AoA). This alignment ensures that the organization remains faithful to its founding purpose while operating transparently and legally.
              </p>
              <p>
                The day-to-day operations of SvaNiti are guided by the Founder's Office, which is an integral part of the Board. The Founder's Office works closely with program managers, researchers, and coordinators to ensure that execution is closely aligned with the Board's vision, allowing for nimble decision-making and smooth implementation of programs.
              </p>
              <p>
                SvaNiti maintains robust administrative systems to ensure accountability, transparency, and efficiency. All statutory filings, including annual returns, financial statements, and CSR reports, are submitted to the Registrar of Companies in compliance with legal requirements. Financial accounts are prepared in accordance with Indian Accounting Standards (Ind AS) and independently audited by Chartered Accountants. All funds are fully reinvested into programmatic work, research, and outreach activities, in strict adherence to the MoA and AoA, with no profit distribution. Program outcomes are regularly monitored and reviewed by the Board, and impact assessments are conducted to inform future strategies.
              </p>
            </div>
          </div>

          <div className={styles.disclosureItem}>
            <div className={styles.itemTitle}>Funds Disclosure</div>
            <div className={styles.itemContent}>
              <p>SvaNiti Policy Research Centre is a fully compliant not-for-profit entity. We are registered under:</p>
              <ul>
                <li>Section 12A of the Income Tax Act – enabling tax exemption on organizational income.</li>
                <li>Section 80G of the Income Tax Act – enabling donors to claim tax deductions on contributions.</li>
                <li>CSR-1 Registration – making SvaNiti eligible to receive CSR funds from corporates under Schedule VII of the Companies Act, 2013.</li>
              </ul>
              <p>
                At present, SvaNiti has not received funding from any external institution, corporate, or donor organization. All operational and programmatic expenses have been supported entirely by contributions from the promoters. Specifically, our founder has transferred personal funds earned through Idume LifeSite and personal investments to sustain and operate the company. As of 2024, Idume LifeSite is recognized as one of SvaNiti's core projects, formally brought under the organization's portfolio to ensure alignment with our mission and governance framework.
              </p>
              <p>
                SvaNiti is committed to full financial transparency. As we grow and receive funding support from donors, CSR partners, and institutions, their names and contributions will be acknowledged here and in our annual reports. We believe that sharing our funding sources openly strengthens trust and accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.timelineSection}>
        <div className={styles.tabWrapper}>
          <div className={`${styles.tab} ${styles.reportsTab}`}>Reports</div>
        </div>
        <div className={styles.timelineInner}>
          <TimelineAccordion />
        </div>
      </section>

      <Footer />
    </main>
  )
}
