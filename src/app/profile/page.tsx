import Image from 'next/image';
import styles from './page.module.css';

const BILLING_HISTORY = [
  { id: 1, amount: '€96.00', credits: '12,000', date: 'October 20, 2025', status: 'Paid' },
  { id: 2, amount: '€18.00', credits: '1,900', date: 'October 5, 2025', status: 'Paid' },
  { id: 3, amount: '€6.00', credits: '600', date: 'September 28, 2025', status: 'Paid' },
  { id: 4, amount: '€18.00', credits: '1,900', date: 'September 10, 2025', status: 'Paid' },
];

export default function ProfilePage() {
  return (
    <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-neon)', textShadow: '0 0 30px var(--shadow-cyan)', marginBottom: '20px' }}>
            Operator Control Interface
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '800px', margin: '0 auto' }}>
            Manage your account, view your payments, and track your AI journey
          </p>
        </div>
        <div className={styles.profileCardsGrid}>
          <div className={styles.profileCard}>
            <div className={styles.profileCardHeader}>
              <h3 className={styles.profileCardTitle}>Profile Information</h3>
            </div>
            <div className={styles.profileCardBody}>
              <div className={styles.profileAvatarSection}>
                <div className={styles.profileAvatarLarge}>
                  <Image src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNjAiIGN5PSI2MCIgcj0iNjAiIGZpbGw9InVybCgjZ3JhZGllbnQwKSIvPjxwYXRoIGQ9Ik02MCAzMEM1MC4wNTg4IDMwIDQyIDM4LjA1ODggNDIgNDhDNDIgNTcuOTQxMiA1MC4wNTg4IDY2IDYwIDY2QzY5Ljk0MTIgNjYgNzggNTcuOTQxMiA3OCA0OEM3OCAzOC4wNTg4IDY5Ljk0MTIgMzAgNjAgMzBaIiBmaWxsPSIjMDBmZmZmIi8+PHBhdGggZD0iTTYwIDcyQzQzLjQzMTQgNzIgMzAgODUuNDMxNCAzMCAxMDJIOTBDOTAgODUuNDMxNCA3Ni41Njg2IDcyIDYwIDcyWiIgZmlsbD0iIzAwZmZmZiIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQwIiB4MT0iMCIgeTE9IjAiIHgyPSIxMjAiIHkyPSIxMjAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjMDBmZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmYwMGZmIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+" alt="Profile Avatar" width={120} height={120} unoptimized />
                </div>
              </div>
              <div className={styles.profileInfoDetails}>
                <div className={styles.profileInfoItem}><span className={styles.profileInfoLabel}>Name</span><span className={styles.profileInfoValue}>John Matrix</span></div>
                <div className={styles.profileInfoItem}><span className={styles.profileInfoLabel}>Email</span><span className={styles.profileInfoValue}>john.matrix@neonlights.ai</span></div>
                <div className={styles.profileInfoItem}><span className={styles.profileInfoLabel}>Joined</span><span className={styles.profileInfoValue}>January 15, 2025</span></div>
              </div>
            </div>
          </div>
          <div className={styles.profileCard}>
            <div className={styles.profileCardHeader}><h3 className={styles.profileCardTitle}>Billing History</h3></div>
            <div className={styles.profileCardBody}>
              <div className={styles.billingList}>
                {BILLING_HISTORY.map((item) => (<div key={item.id} className={styles.billingItem}><div className={styles.billingItemIcon}></div><div className={styles.billingItemDetails}><div className={styles.billingItemAmount}>{item.amount}</div><div className={styles.billingItemCredits}>{item.credits} Credits</div><div className={styles.billingItemDate}>{item.date}</div></div><div className={styles.billingItemStatus}>{item.status}</div></div>))}
              </div>
              <div className={styles.billingTotal}><span className={styles.billingTotalLabel}>Total Spent</span><span className={styles.billingTotalValue}>€138.00</span></div>
            </div>
          </div>
          <div className={styles.profileCard}>
            <div className={styles.profileCardHeader}><h3 className={styles.profileCardTitle}>Usage Summary</h3></div>
            <div className={styles.profileCardBody}>
              <div className={styles.usageCreditsOverview}>
                <div className={`${styles.usageStatBox} ${styles.usageStatPrimary}`}><div className={styles.usageStatContent}><div className={styles.usageStatValue}>16,400</div><div className={styles.usageStatLabel}>Credits Bought</div></div></div>
                <div className={`${styles.usageStatBox} ${styles.usageStatWarning}`}><div className={styles.usageStatContent}><div className={styles.usageStatValue}>8,750</div><div className={styles.usageStatLabel}>Credits Used</div></div></div>
                <div className={`${styles.usageStatBox} ${styles.usageStatSuccess}`}><div className={styles.usageStatContent}><div className={styles.usageStatValue}>7,650</div><div className={styles.usageStatLabel}>Credits Remaining</div></div></div>
              </div>
              <div className={styles.usageDivider}></div>
              <div className={styles.usageGenerationStats}>
                <div className={styles.usageGenItem}><span className={styles.usageGenIcon}></span><span className={styles.usageGenLabel}>Images Generated</span><span className={styles.usageGenValue}>342</span></div>
                <div className={styles.usageGenItem}><span className={styles.usageGenIcon}></span><span className={styles.usageGenLabel}>Videos Generated</span><span className={styles.usageGenValue}>48</span></div>
                <div className={`${styles.usageGenItem} ${styles.usageGenTotal}`}><span className={styles.usageGenIcon}></span><span className={styles.usageGenLabel}>Total Generated</span><span className={styles.usageGenValue}>390</span></div>
              </div>
            </div>
          </div>
          <div className={`${styles.profileCard} ${styles.dangerCard}`}>
            <div className={`${styles.profileCardHeader} ${styles.dangerHeader}`}><h3 className={styles.profileCardTitle}> Danger Zone</h3></div>
            <div className={styles.profileCardBody}>
              <div className={styles.dangerContent}>
                <div className={styles.dangerWarning}><div className={styles.dangerWarningIcon}></div><div className={styles.dangerWarningText}><h4 className={styles.dangerWarningTitle}>Delete Account</h4><p className={styles.dangerWarningDescription}>This action is <strong>irreversible</strong> and will permanently delete your account, all your media files, generation history, and remaining credits from our servers. This cannot be undone.</p></div></div>
                <ul className={styles.dangerConsequences}><li> All generated images and videos will be deleted</li><li> Your remaining credits will be forfeited</li><li> Billing history will be removed</li><li> Account recovery will not be possible</li></ul>
                <button className={styles.dangerButton}><span className={styles.dangerButtonIcon}></span>Delete My Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}